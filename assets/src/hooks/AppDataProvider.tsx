import React, {useContext, useEffect} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import * as API from '../api/api';
import {
  useSchedules,
  useSchedulingLinks,
  useUserProfile,
  useUserSettings,
} from './api-hooks';
import {useHistory} from 'react-router-dom';
import {nanoid} from 'nanoid';

/**
 * App data
 *  availability presets
 *
 */
export const AppDataContext = React.createContext<{
  profile: any;
  settings: any;

  createSchedule: () => Promise<any>;
  updateDisplayName: (value: string) => Promise<any>;
  updateSlug: (value: string) => Promise<any>;
}>({
  profile: {},
  settings: {},

  createSchedule: () => Promise.resolve(),
  updateDisplayName: (value: string) => Promise.resolve(),
  updateSlug: (value: string) => Promise.resolve(),
});

export const useAppData = () => useContext(AppDataContext);

type Props = React.PropsWithChildren<{}>;

/**
 * App Data Provider
 *
 * app data context
 *  user info
 *  links
 *  events
 *  ...
 *
 *
 *
 * @param props
 * @constructor
 */
const AppDataProvider = (props: Props) => {
  let history = useHistory();
  const {data: profile} = useUserProfile();
  const {data: settings} = useUserSettings();
  const {data: schedules} = useSchedules();

  const _updateProfile = (newValue: any) => {
    return mutate(`/api/profile/`, {data: {...profile, ...newValue}}, false);
  };

  const _revalidateProfile = () => {
    mutate(`/api/profile/`);
  };
  const _updateUserSettings = (newValue: any) => {
    return mutate(
      `/api/user_settings/`,
      {data: {...settings, ...newValue}},
      false
    );
  };

  const _revalidateUserSettings = () => {
    mutate(`/api/user_settings/`);
  };

  const updateDisplayName = async (value: string) => {
    _updateProfile({display_name: value});
    await API.updateUserProfile({display_name: value});
    _revalidateProfile();
    return Promise.resolve();
  };

  const updateSlug = async (value: string) => {
    _updateProfile({slug: value});
    await API.updateUserProfile({slug: value});
    _revalidateProfile();
    return Promise.resolve();
  };

  const createSchedule = async () => {
    const schedule = {
      name: '未命名',
      timezone: 'Asia / Shanghai',
      rules: [
        {
          id: nanoid(),
          byday: ['mo', 'tu', 'we', 'th', 'fr'],
          endTime: 1020,
          startTime: 540,
        },
      ],
    };
    schedules.push(schedule);
    mutate(`/api/schedules/`, {data: schedules}, false);
    await API.createSchedule(schedule);
    mutate(`/api/schedules/`);
  };

  return (
    <AppDataContext.Provider
      value={{
        profile,
        settings,

        createSchedule,
        updateDisplayName,
        updateSlug,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

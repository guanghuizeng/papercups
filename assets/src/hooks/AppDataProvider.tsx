import React, {useContext, useEffect} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import * as API from '../api';
import {
  useSchedules,
  useSchedulingLinks,
  useUserProfile,
  useUserSettings,
} from '../api-hooks';
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
  schedulingLinks: any[];
  availabilityPresets: any[];

  createSchedulingLinkAndRedirect: () => Promise<any>;
  createSchedule: () => Promise<any>;
  updateDisplayName: (value: string) => Promise<any>;
  updateSlug: (value: string) => Promise<any>;
  updateAvailabilityPreset: (id: string, update: any) => Promise<any>;
  getAvailabilityPresetsById: (presets: string[]) => any[];
}>({
  profile: {},
  settings: {},
  schedulingLinks: [],
  availabilityPresets: [],

  createSchedulingLinkAndRedirect: () => Promise.resolve(),
  createSchedule: () => Promise.resolve(),
  updateDisplayName: (value: string) => Promise.resolve(),
  updateSlug: (value: string) => Promise.resolve(),
  updateAvailabilityPreset: (value: string, update: any) => Promise.resolve(),
  getAvailabilityPresetsById: (presets) => [],
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
  const {data: schedulingLinks} = useSchedulingLinks();
  const {data: schedules} = useSchedules();

  const getAvailabilityPresetsById = (presets: string[]) => {
    if (schedules && presets) {
      return _.flatten(
        schedules
          .filter((schedule: any) => presets.includes(schedule.id))
          .map((schedule: any) => schedule.rules)
      );
    }
    return [];
  };

  const createSchedulingLinkAndRedirect = async () => {
    return API.createSchedulingLink({
      name: '未命名',
      description: '',
      durations: [30],
      location: 'loc1',
      url: nanoid(7),
      color: 'red',
      fields: [],
      email_reminders: [
        {
          quantity: 1,
          units: 'hours',
        },
      ],
      organizer: {
        availability: {
          mode: 'ranked',
          overrides: [],
          presets: ['39f52432cfa64661', 'ed0eb79a82ba137e', 'ff9e7d4dd2f506c5'],
          recurringIntervals: [],
        },
        avatarUrl:
          'https://secure.gravatar.com/avatar/fcb9bbfe7fa822090dce8a194ed9730d?s=256&d=404',
        calendarId: null,
        displayName: 'Yuanyuan Zhang',
      },
    }).then((r) => {
      console.log('Resp', r);
      mutate(`/api/scheduling_links/`);
      history.push(`/links/${r.id}`);
      return r;
    });
  };

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

  const updateAvailabilityPreset = async (id: string, updates: any) => {
    const clone = _.cloneDeep(schedules);
    const targetIndex = clone.findIndex((schedule: any) => schedule.id === id);
    clone[targetIndex] = {
      ...clone[targetIndex],
      ...updates,
    };
    mutate(`/api/schedules/`, {data: clone}, false);
    await API.updateSchedule(id, updates);
    mutate(`/api/schedules/`);
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

  const removeSchedule = async () => {};

  return (
    <AppDataContext.Provider
      value={{
        profile,
        settings,
        schedulingLinks,

        availabilityPresets: schedules,
        updateAvailabilityPreset,

        createSchedulingLinkAndRedirect,
        createSchedule,
        getAvailabilityPresetsById,
        updateDisplayName,
        updateSlug,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

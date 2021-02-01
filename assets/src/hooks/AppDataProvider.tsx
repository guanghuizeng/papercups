import React, {useContext, useEffect} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import * as API from '../api';
import {getAccessToken} from '../api';
import {fetchWithToken} from './utils';
import {useAuth} from '../components/auth/AuthProvider';
import {
  useSchedules,
  useSchedulingLinks,
  useUserProfile,
  useUserSettings,
} from '../api-hooks';
import {useSchedulingLink} from './SchedulingLinkProvider';
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
      name: '新类型',
      description: '描述',
      durations: [30],
      location: 'loc1',
      url: nanoid(7),
      color: 'red',
      fields: [
        {
          id: 'q1',
          label: '你的电话号码是多少？',
          required: true,
          type: 'long_text',
        },
        {
          id: 'q2',
          label: '你的工作是什么？',
          required: false,
          type: 'long_text',
        },
      ],
      email_reminders: [
        {
          quantity: 1,
          units: 'hours',
        },
      ],
      organizer: {
        availability: {
          mode: 'ranked',
          overrides: [
            {
              endAt: '2021-01-19T07:30:00Z',
              startAt: '2021-01-19T02:15:00Z',
              type: 'block',
            },
            {
              endAt: '2021-01-18T08:45:00Z',
              startAt: '2021-01-18T02:30:00Z',
              type: 'block',
            },
          ],
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
    _updateUserSettings({slug: value});
    await API.updateUserSettings({slug: value});
    _revalidateUserSettings();
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

  return (
    <AppDataContext.Provider
      value={{
        profile,
        settings,
        schedulingLinks,

        availabilityPresets: schedules,
        updateAvailabilityPreset,

        createSchedulingLinkAndRedirect,
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

import React, {useContext, useEffect} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import * as API from '../api';
import {getAccessToken} from '../api';
import {fetchWithToken} from './utils';
import {useAuth} from '../components/auth/AuthProvider';
import {useSchedules, useSchedulingLinks, useUserSettings} from '../api-hooks';
import {useSchedulingLink} from './SchedulingLinkProvider';
import {useHistory} from 'react-router-dom';

/**
 * App data
 *  availability presets
 *
 */
export const AppDataContext = React.createContext<{
  settings: any;
  schedulingLinks: any[];
  availabilityPresets: any[];

  createSchedulingLinkAndRedirect: () => Promise<any>;
  getAvailabilityPresetsById: (presets: string[]) => any[];
}>({
  settings: {},
  schedulingLinks: [],
  availabilityPresets: [],

  createSchedulingLinkAndRedirect: () => Promise.resolve(),
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
  const {data: settings} = useUserSettings();
  const {data: schedulingLinks} = useSchedulingLinks();
  const {data: schedules} = useSchedules();

  const getAvailabilityPresetsById = (presets: string[]) => {
    if (settings) {
      return [
        {
          byday: ['一', '二', '三', '四', '五'],
          endTime: 1020,
          startTime: 540,
        },
        {
          byday: ['一', '二'],
          endTime: 1080,
          startTime: 720,
        },
        {
          byday: ['一', '二', '三', '四', '五'],
          endTime: 1380,
          startTime: 1200,
        },
      ];
    }
    return [];
  };

  const createSchedulingLinkAndRedirect = async () => {
    return API.createSchedulingLink({
      name: '新类型',
      description: '描述',
      durations: [30],
      location: 'loc1',
      url: '15min',
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

  return (
    <AppDataContext.Provider
      value={{
        settings,
        schedulingLinks,
        availabilityPresets: schedules,
        createSchedulingLinkAndRedirect,

        getAvailabilityPresetsById,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

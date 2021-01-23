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
  getAvailabilityPresets: (id: string) => any[];
}>({
  settings: {},
  schedulingLinks: [],
  availabilityPresets: [],

  createSchedulingLinkAndRedirect: () => Promise.resolve(),
  getAvailabilityPresets: (id) => [],
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

  const getAvailabilityPresets = (id: string) => {
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

        getAvailabilityPresets,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

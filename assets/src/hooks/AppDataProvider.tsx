import React, {useContext, useEffect} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import * as API from '../api';
import {getAccessToken} from '../api';
import {fetchWithToken} from './utils';
import {useAuth} from '../components/auth/AuthProvider';
import {useSchedulingLinks, useUserSettings} from '../api-hooks';
import {useSchedulingLink} from './SchedulingLinkProvider';

/**
 * App data
 *  availability presets
 *
 */
export const AppDataContext = React.createContext<{
  settings: any;
  schedulingLinks: any[];

  getAvailabilityPresets: (id: string) => any[];
}>({
  settings: {},
  schedulingLinks: [],

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
  const {data: settings} = useUserSettings();
  const {data: schedulingLinks} = useSchedulingLinks();

  console.log('user settings', settings);

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

  return (
    <AppDataContext.Provider
      value={{
        settings,
        schedulingLinks,

        getAvailabilityPresets,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

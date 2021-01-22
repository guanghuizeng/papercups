import React, {useContext, useEffect} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import * as API from '../api';
import {getAccessToken} from '../api';
import {fetchWithToken} from './utils';
import {useAuth} from '../components/auth/AuthProvider';

/**
 * App data
 *  availability presets
 *
 */
export const AppDataContext = React.createContext<{
  settings: any;

  getAvailabilityPresets: (id: string) => any[];
}>({
  settings: {},

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
  const {settings} = useUserSettings();

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
        getAvailabilityPresets,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

function useUserSettings(token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/user_settings`, (url) =>
    fetchWithToken(url, token)
  );

  return {
    settings: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default AppDataProvider;

import React, {useContext} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';

/**
 * App data
 *  availability presets
 *
 */
export const AppDataContext = React.createContext<{
  getAvailabilityPresets: (id: string) => any[];
}>({
  getAvailabilityPresets: (id) => [],
});

export const useAppData = () => useContext(AppDataContext);

type Props = React.PropsWithChildren<{
  userId: string;
}>;

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
  const getAvailabilityPresets = (id: string) => {
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
  };

  return (
    <AppDataContext.Provider
      value={{
        getAvailabilityPresets,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

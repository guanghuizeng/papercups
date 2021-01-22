import React, {useContext} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';

/**
 * App data
 *  availability presets
 *
 */
export const AppDataContext = React.createContext<{
  getAvailabilityPreset: (id: string) => any;
}>({
  getAvailabilityPreset: (id) => {},
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
  const getAvailabilityPreset = (id: string) => {
    return {};
  };

  return (
    <AppDataContext.Provider
      value={{
        getAvailabilityPreset,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

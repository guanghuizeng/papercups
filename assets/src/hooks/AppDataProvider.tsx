import React, {useContext} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';

export const AppDataContext = React.createContext<{}>({});

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
  return (
    <AppDataContext.Provider value={{}}>
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

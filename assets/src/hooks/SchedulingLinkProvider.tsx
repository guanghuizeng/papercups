import React, {useContext} from 'react';
import _ from 'lodash';

export const SchedulingLinkContext = React.createContext<{}>({});

export const useSchedulingLink = () => useContext(SchedulingLinkContext);

type Props = React.PropsWithChildren<{}>;

const SchedulingLinkProvider = (props: Props) => {
  return (
    <SchedulingLinkContext.Provider value={{}}>
      {props.children}
    </SchedulingLinkContext.Provider>
  );
};

export default SchedulingLinkProvider;

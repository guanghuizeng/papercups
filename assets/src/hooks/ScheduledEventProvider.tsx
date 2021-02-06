import React, {useContext} from 'react';

export const ScheduledEventContext = React.createContext<{}>({});

export const useScheduledEvent = () => useContext(ScheduledEventContext);

type Props = React.PropsWithChildren<{
  scheduledEventId: string;
}>;

const ScheduledEventProvider = (props: Props) => {
  return (
    <ScheduledEventContext.Provider value={{}}>
      {props.children}
    </ScheduledEventContext.Provider>
  );
};

export default ScheduledEventProvider;

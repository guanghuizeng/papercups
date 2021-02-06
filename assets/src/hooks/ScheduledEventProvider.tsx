import React, {useContext} from 'react';

export const ScheduledEventContext = React.createContext<{}>({});

export const useScheduledEvent = () => useContext(ScheduledEventContext);

type Props = React.PropsWithChildren<{
  scheduledEventId: string;
}>;

const ScheduledEventProvider = (props: Props) => {
  const {scheduledEventId} = props;

  // TODO read event info by scheduledEventId

  return (
    <ScheduledEventContext.Provider value={{}}>
      {props.children}
    </ScheduledEventContext.Provider>
  );
};

export default ScheduledEventProvider;

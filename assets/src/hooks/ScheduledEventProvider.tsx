import React, {useContext} from 'react';

export const ScheduledEventContext = React.createContext<{
  scheduledEventId: string;
}>({
  scheduledEventId: '',
});

export const useScheduledEvent = () => useContext(ScheduledEventContext);

type Props = React.PropsWithChildren<{
  scheduledEventId: string;
}>;

const ScheduledEventProvider = (props: Props) => {
  const {scheduledEventId} = props;

  // TODO read event info by scheduledEventId

  return (
    <ScheduledEventContext.Provider
      value={{
        scheduledEventId,
      }}
    >
      {props.children}
    </ScheduledEventContext.Provider>
  );
};

export default ScheduledEventProvider;

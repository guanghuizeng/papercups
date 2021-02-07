import React, {useContext} from 'react';
import {useScheduledEvent as _useScheduledEvent} from '../api-hooks';

export const ScheduledEventContext = React.createContext<{
  scheduledEventId: string;
  scheduledEvent: any;
}>({
  scheduledEventId: '',
  scheduledEvent: {},
});

export const useScheduledEvent = () => useContext(ScheduledEventContext);

type Props = React.PropsWithChildren<{
  scheduledEventId: string;
}>;

const ScheduledEventProvider = (props: Props) => {
  const {scheduledEventId} = props;

  // TODO read event info by scheduledEventId

  const {data: scheduledEvent} = _useScheduledEvent(scheduledEventId);

  console.log('scheduledEvent', scheduledEvent);

  return (
    <ScheduledEventContext.Provider
      value={{
        scheduledEventId,
        scheduledEvent,
      }}
    >
      {props.children}
    </ScheduledEventContext.Provider>
  );
};

export default ScheduledEventProvider;

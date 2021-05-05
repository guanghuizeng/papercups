import React, {useContext} from 'react';
import {useScheduledEvents as _useScheduledEvents} from './api-hooks';

export const ScheduledEventsContext = React.createContext<{
  scheduledEvents: any[];
}>({
  scheduledEvents: [],
});

export const useScheduledEvents = () => useContext(ScheduledEventsContext);

type Props = React.PropsWithChildren<{}>;

export default function ScheduledEventsProvider(props: Props) {
  const {data: scheduledEvents} = _useScheduledEvents();

  return (
    <ScheduledEventsContext.Provider
      value={{
        scheduledEvents,
      }}
    >
      {props.children}
    </ScheduledEventsContext.Provider>
  );
}

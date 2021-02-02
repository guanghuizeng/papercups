import React, {useContext, useEffect, useState} from 'react';
import {useAuth} from '../../components/auth/AuthProvider';
import {
  useIntervals,
  useLink,
  useSchedulingLinkBySlug,
  useUserProfileBySlug,
} from '../../api-hooks';
import {useSchedulingLink} from '../../hooks/SchedulingLinkProvider';
import {Dayjs} from 'dayjs';

interface EventTime {
  start: Date;
  end: Date;
}

const BookingContext = React.createContext<{
  userSlug: string;
  schedulingLinkSlug: string;
  intervals: any[];
  user: any;
  schedulingLink: any;

  timeSelected: EventTime | null;
  eventId: string | null;
  eventDuration: number;
  eventStartTime: Date | null;

  setEventId: (id: string | null) => void;
  setEventStartTime: (start: Date) => void;
  setEventDuration: (value: number) => void;
  setEventTime: (start: Date, end: Date) => void;

  submitScheduledEvent: () => Promise<any>;
}>({
  userSlug: '',
  schedulingLinkSlug: '',
  timeSelected: null,
  eventStartTime: null,
  eventDuration: 30,
  intervals: [],
  eventId: null,

  user: {},
  schedulingLink: {},
  submitScheduledEvent: () => Promise.resolve(),
  setEventTime: (start: Date, end: Date) => {},
  setEventStartTime: (start: Date) => {},
  setEventDuration: (value: number) => {},
  setEventId: (id: string | null) => {},
});

export const useBooking = () => useContext(BookingContext);

interface BookingProviderProps {
  userSlug: string;
  schedulingLinkSlug: string;
}

type Props = React.PropsWithChildren<BookingProviderProps>;

function BookingProvider(props: Props) {
  const {userSlug, schedulingLinkSlug} = props;
  const {data: user} = useUserProfileBySlug(userSlug);
  const {data: schedulingLink} = useSchedulingLinkBySlug(
    userSlug,
    schedulingLinkSlug
  );
  const {data: intervals} = useIntervals(
    userSlug,
    schedulingLinkSlug,
    '2021-01-31T00:00:00+08:00',
    '2021-02-06T00:00:00+08:00'
  );
  const [timeSelected, setTimeSelected] = useState<EventTime | null>(null);
  const [eventStartTime, setEventStartTime] = useState<Date | null>(null);
  const [eventDuration, setEventDuration] = useState<number>(30);
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    if (schedulingLink) {
      setEventDuration(schedulingLink.durations[0]);
    }
  }, [schedulingLink]);

  const createScheduledEvent = async () => {
    return Promise.resolve();
  };

  const setEventTime = (start: Date, end: Date) => {
    setTimeSelected({start, end});
  };

  return (
    <BookingContext.Provider
      value={{
        userSlug,
        schedulingLinkSlug,
        timeSelected,
        eventStartTime,
        eventDuration,
        intervals,

        user,
        schedulingLink,
        submitScheduledEvent: createScheduledEvent,

        eventId,
        setEventId,

        setEventTime,
        setEventStartTime,
        setEventDuration,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;

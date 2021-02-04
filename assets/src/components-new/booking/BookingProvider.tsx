import React, {useContext, useEffect, useState} from 'react';
import {useAuth} from '../../components/auth/AuthProvider';
import {
  useIntervals,
  useLink,
  useSchedulingLinkBySlug,
  useUserProfileBySlug,
} from '../../api-hooks';
import {useSchedulingLink} from '../../hooks/SchedulingLinkProvider';
import dayjs, {Dayjs} from 'dayjs';

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

  eventDrafted: boolean;
  draftEvent: () => void;
  calendarRef: any;

  eventStartTime: Date | null;
  setEventStartTime: (start: Date) => void;

  timeSelected: EventTime | null;
  eventId: string | null;
  eventDuration: number;

  setEventId: (id: string | null) => void;
  setEventDuration: (value: number) => void;
  setEventTime: (start: Date, end: Date) => void;

  submitScheduledEvent: () => Promise<any>;
  cancelEventDrafted: () => Promise<any>;
}>({
  userSlug: '',
  schedulingLinkSlug: '',
  intervals: [],
  user: {},
  schedulingLink: {},

  eventDrafted: false,
  draftEvent: () => {},
  calendarRef: {},

  eventStartTime: null,
  setEventStartTime: (start: Date) => {},
  timeSelected: null,
  eventId: null,

  eventDuration: 30,
  setEventId: (id: string | null) => {},
  setEventDuration: (value: number) => {},
  setEventTime: (start: Date, end: Date) => {},

  submitScheduledEvent: () => Promise.resolve(),
  cancelEventDrafted: () => Promise.resolve(),
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
    dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
    dayjs().add(14, 'day').format('YYYY-MM-DDTHH:mm:ssZ')
  );
  const [timeSelected, setTimeSelected] = useState<EventTime | null>(null);
  const [eventStartTime, setEventStartTime] = useState<Date | null>(null);
  const [eventDuration, setEventDuration] = useState<number>(30);
  const [eventId, setEventId] = useState<string | null>(null);

  const [eventDrafted, setEventDrafted] = useState<boolean>(false);
  const calendarRef = React.createRef<any>();

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

  const cancelEventDrafted = () => {
    setEventDrafted(false);
    if (calendarRef.current) {
      calendarRef.current.getApi().removeAllEvents();
    }
    return Promise.resolve();
  };

  const draftEvent = () => {
    setEventDrafted(true);
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

        eventDrafted,
        draftEvent,
        cancelEventDrafted,
        calendarRef,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;

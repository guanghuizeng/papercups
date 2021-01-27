import React, {useContext, useEffect, useState} from 'react';
import {useAuth} from '../../components/auth/AuthProvider';
import {
  useLink,
  useSchedulingLinkBySlug,
  useUserProfileBySlug,
} from '../../api-hooks';
import {useSchedulingLink} from '../../hooks/SchedulingLinkProvider';
import {Dayjs} from 'dayjs';

interface EventTime {
  start: string;
  end: string;
}

const BookingContext = React.createContext<{
  userSlug: string;
  schedulingLinkSlug: string;
  timeSelected: EventTime | null;

  user: any;
  schedulingLink: any;
  createScheduledEvent: () => Promise<any>;
  setEventTime: (start: string, end: string) => void;
}>({
  userSlug: '',
  schedulingLinkSlug: '',
  timeSelected: null,

  user: {},
  schedulingLink: {},
  createScheduledEvent: () => Promise.resolve(),
  setEventTime: (start: string, end: string) => {},
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
  const [timeSelected, setTimeSelected] = useState<EventTime | null>(null);

  const createScheduledEvent = async () => {
    return Promise.resolve();
  };

  const setEventTime = (start: string, end: string) => {
    setTimeSelected({start, end});
  };

  return (
    <BookingContext.Provider
      value={{
        userSlug,
        schedulingLinkSlug,
        timeSelected,

        user,
        schedulingLink,
        createScheduledEvent,

        setEventTime,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;

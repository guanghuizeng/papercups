import React, {useContext, useEffect} from 'react';
import {useAuth} from '../../components/auth/AuthProvider';
import {
  useLink,
  useSchedulingLinkBySlug,
  useUserProfileBySlug,
} from '../../api-hooks';
import {useSchedulingLink} from '../../hooks/SchedulingLinkProvider';

const BookingContext = React.createContext<{
  userSlug: string;
  schedulingLinkSlug: string;
}>({
  userSlug: '',
  schedulingLinkSlug: '',
});

export const useBooking = () => useContext(BookingContext);

interface BookingProviderProps {
  userSlug: string;
  schedulingLinkSlug: string;
}

type Props = React.PropsWithChildren<BookingProviderProps>;

function BookingProvider(props: Props) {
  const {userSlug, schedulingLinkSlug} = props;

  // userSlug, schedulingLinkSlug
  // => scheduling link information

  const {data: profile} = useUserProfileBySlug(userSlug);
  const {data: schedulingLink} = useSchedulingLinkBySlug(
    userSlug,
    schedulingLinkSlug
  );

  return (
    <BookingContext.Provider
      value={{
        userSlug: userSlug,
        schedulingLinkSlug: schedulingLinkSlug,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;

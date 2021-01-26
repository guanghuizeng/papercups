import React, {useContext, useEffect} from 'react';

const BookingContext = React.createContext<{
  userSlug: string;
  schedulingLinkId: string;
}>({
  userSlug: '',
  schedulingLinkId: '',
});

export const useBooking = () => useContext(BookingContext);

interface BookingProviderProps {
  userSlug: string;
  schedulingLinkId: string;
}

type Props = React.PropsWithChildren<BookingProviderProps>;

function BookingProvider(props: Props) {
  const {userSlug, schedulingLinkId} = props;
  return (
    <BookingContext.Provider
      value={{
        userSlug: userSlug,
        schedulingLinkId: schedulingLinkId,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingProvider;

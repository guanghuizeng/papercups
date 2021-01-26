import React, {useContext, useEffect} from 'react';

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

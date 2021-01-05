import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

export const BookContext = React.createContext<{
  userProfile: any;
  eventTypes: any | null;
  eventType: any;
}>({
  userProfile: {},
  eventTypes: null,
  eventType: {},
});

export const useBook = () => useContext(BookContext);

type Props = React.PropsWithChildren<{}>;

const BookProvider = (props: Props) => {
  const {pathname} = useLocation();
  const [_blank, user, eventTypeId] = pathname.split('/');
  console.log('path 2', pathname, pathname.split('/'), user, eventTypeId);

  const [userProfile, setUserProfile] = useState<any>(user);
  const [eventTypes, setEventTypes] = useState<any | null>(null);
  const [eventType, setEventType] = useState<any>(eventTypeId);

  useEffect(() => {}, []);

  return (
    <BookContext.Provider
      value={{
        userProfile,
        eventTypes,
        eventType,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookProvider;

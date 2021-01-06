import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
  fetchUserProfileBySlug,
  fetchEventTypeByUrl as _fetchEventTypeByUrl,
} from '../../api';

export const BookContext = React.createContext<{
  eventTypes: {[key: string]: any};
  fetchEventTypeByUrl: (user: string, url: string) => Promise<any>;

  userProfileBySlug: {[key: string]: any};
  fetchUserProfile: (slug: string) => Promise<any>;
}>({
  eventTypes: {},
  fetchEventTypeByUrl: (user: string, url: string) => Promise.resolve({}),

  userProfileBySlug: {},
  fetchUserProfile: (slug: string) => Promise.resolve([]),
});

export const useBook = () => useContext(BookContext);

type Props = React.PropsWithChildren<{}>;

const BookProvider = (props: Props) => {
  const [eventTypes, setEventTypes] = useState<{
    [key: string]: any;
  }>({});

  const [userProfileBySlug, setUserProfileBySlug] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {}, []);

  const fetchUserProfile = (slug: string) => {
    return fetchUserProfileBySlug(slug).then((r) => {
      setUserProfileBySlug({
        ...userProfileBySlug,
        [slug]: r,
      });
    });
  };

  const fetchEventTypeByUrl = (user: string, url: string) => {
    return _fetchEventTypeByUrl(user, url).then((r) => {
      setEventTypes({
        ...eventTypes,
        [user]: {
          ...eventTypes[user],
          [url]: r,
        },
      });
    });
  };

  return (
    <BookContext.Provider
      value={{
        eventTypes,
        fetchEventTypeByUrl,

        userProfileBySlug,
        fetchUserProfile,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookProvider;

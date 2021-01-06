import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {
  fetchUserProfileBySlug,
  fetchEventTypeByUrl as _fetchEventTypeByUrl,
  fetchScheduleById,
} from '../../api';

export const BookContext = React.createContext<{
  eventTypes: {[key: string]: any};
  fetchEventTypeByUrl: (user: string, url: string) => Promise<any>;

  userProfileBySlug: {[key: string]: any};
  fetchUserProfile: (slug: string) => Promise<any>;

  schedules: {[key: string]: any};
  fetchSchedule: (user: string, schedule_id: string) => Promise<any>;
}>({
  eventTypes: {},
  fetchEventTypeByUrl: (user: string, url: string) => Promise.resolve({}),

  userProfileBySlug: {},
  fetchUserProfile: (slug: string) => Promise.resolve([]),

  schedules: {},
  fetchSchedule: (user: string, schedule_id: string) => Promise.resolve({}),
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

  const [schedules, setSchedules] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {}, []);

  const fetchUserProfile = (slug: string) => {
    return fetchUserProfileBySlug(slug).then((r) => {
      setUserProfileBySlug({
        ...userProfileBySlug,
        [slug]: r,
      });
      return r;
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
      return r;
    });
  };

  const fetchSchedule = (user: string, schedule_id: string) => {
    return fetchScheduleById(user, schedule_id).then((r) => {
      setSchedules({
        ...schedules,
        [schedule_id]: r,
      });

      return r;
    });
  };

  return (
    <BookContext.Provider
      value={{
        eventTypes,
        fetchEventTypeByUrl,

        userProfileBySlug,
        fetchUserProfile,

        schedules,
        fetchSchedule,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookProvider;

import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  fetchUserProfileBySlug,
  fetchEventTypeByUrl as _fetchEventTypeByUrl,
  fetchScheduleById,
} from '../../api';
import moment from 'moment';

export const BookContext = React.createContext<{
  selectedMonth: moment.Moment | null;
  selectedDate: moment.Moment | null;
  selectedTime: string | null;
  updateSelectedMonth: (month: moment.Moment) => void;
  updateSelectedDate: (date: moment.Moment) => void;
  updateSelectedTime: (time: string) => void;

  eventTypes: {[key: string]: any};
  fetchEventTypeByUrl: (user: string, url: string) => Promise<any>;

  userProfileBySlug: {[key: string]: any};
  fetchUserProfile: (slug: string) => Promise<any>;

  schedules: {[key: string]: any};
  fetchSchedule: (user: string, schedule_id: string) => Promise<any>;
}>({
  selectedMonth: null,
  selectedDate: null,
  selectedTime: null,
  updateSelectedMonth: (month: moment.Moment) => {},
  updateSelectedDate: (date: moment.Moment) => {},
  updateSelectedTime: (time: string) => {},

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
  const [selectedMonth, setSelectedMonth] = useState<moment.Moment | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const updateSelectedMonth = (date: moment.Moment) => {
    setSelectedMonth(date);
  };

  const updateSelectedDate = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  const updateSelectedTime = (time: string) => {
    setSelectedTime(time);
  };

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
        selectedMonth,
        selectedDate,
        selectedTime,
        updateSelectedMonth,
        updateSelectedDate,
        updateSelectedTime,

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

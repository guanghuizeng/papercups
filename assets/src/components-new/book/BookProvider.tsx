import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
  fetchUserProfileBySlug,
  fetchEventTypeByUrl as _fetchEventTypeByUrl,
  fetchScheduleById,
  createEvent as _createEvent,
  fetchEventTypesBrief,
  fetchDatetimeSpotsByRange as fetchDatetimeSpotsByRange,
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
  fetchEventTypes: (user: string) => Promise<any>;
  fetchEventTypeByUrl: (user: string, url: string) => Promise<any>;

  userProfileBySlug: {[key: string]: any};
  fetchUserProfile: (slug: string) => Promise<any>;

  schedules: {[key: string]: any};
  fetchSchedule: (user: string, schedule_id: string) => Promise<any>;

  datetimeSpotsByMonth: {[key: string]: any};
  fetchDatetimeSpotsByMonth: (
    event_type_id: string,
    month: string
  ) => Promise<any>;

  createEvent: () => Promise<any>;
}>({
  selectedMonth: null,
  selectedDate: null,
  selectedTime: null,
  updateSelectedMonth: (month: moment.Moment) => {},
  updateSelectedDate: (date: moment.Moment) => {},
  updateSelectedTime: (time: string) => {},

  eventTypes: {},
  fetchEventTypes: (user: string) => Promise.resolve([]),
  fetchEventTypeByUrl: (user: string, url: string) => Promise.resolve({}),

  userProfileBySlug: {},
  fetchUserProfile: (slug: string) => Promise.resolve([]),

  schedules: {},
  fetchSchedule: (user: string, schedule_id: string) => Promise.resolve({}),

  datetimeSpotsByMonth: {},
  fetchDatetimeSpotsByMonth: (event_type_id: string, month: string) =>
    Promise.resolve({}),

  createEvent: () => Promise.resolve({}),
});

export const useBook = () => useContext(BookContext);

type Props = React.PropsWithChildren<{}>;

const BookProvider = (props: Props) => {
  const [selectedMonth, setSelectedMonth] = useState<moment.Moment | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [datetimeSpotsByMonth, setDatetimeSpotsByMonth] = useState<any>({});

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

  const fetchEventTypes = (user: string) => {
    return fetchEventTypesBrief(user).then((r) => {
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

  const fetchDatetimeSpotsByMonth = (event_type_id: string, month: string) => {
    return fetchDatetimeSpotsByRange(event_type_id, month, month).then((r) => {
      setDatetimeSpotsByMonth({
        ...datetimeSpotsByMonth,
        [month]: r,
      });
      return r;
    });
  };

  const createEvent = () => {
    return _createEvent();
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
        fetchEventTypes,
        fetchEventTypeByUrl,

        userProfileBySlug,
        fetchUserProfile,

        schedules,
        fetchSchedule,

        datetimeSpotsByMonth,
        fetchDatetimeSpotsByMonth,

        createEvent,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookProvider;

import {Redirect, useHistory, useLocation, useParams} from 'react-router-dom';
import {useBook} from './BookProvider';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import {
  PERIOD_TYPE_AVAILABLE_MOVING,
  PERIOD_TYPE_FIXED,
  PERIOD_TYPE_MOVING,
  PERIOD_TYPE_UNLIMITED,
} from '../constants';
import {
  DayPickerSingleDateController,
  isInclusivelyAfterDay,
  isSameDay,
} from 'react-dates';
import {colourOptions} from '../events/data';
import ReactList from 'react-list';
import TimeOption from './TimeOption';
import 'react-dates/lib/css/_datepicker.css';
import './day-picker.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TimeOptionList = ({sliceOfTime}: any) => {
  const {pathname} = useLocation();
  const {selectedMonth, selectedDate, updateSelectedTime} = useBook();

  const [checkedValue, setCheckedValue] = useState<string>('');
  let history = useHistory();

  const handleConfirm = () => {
    updateSelectedTime(checkedValue);
    console.log(
      checkedValue,
      `${pathname}/${moment(
        checkedValue
      ).format()}?month=${selectedMonth?.format(
        'YYYY-MM'
      )}&date=${selectedDate?.format('YYYY-MM-DD')}`
    );
    history.push(
      `${pathname}/${moment(
        checkedValue
      ).format()}?month=${selectedMonth?.format(
        'YYYY-MM'
      )}&date=${selectedDate?.format('YYYY-MM-DD')}`
    );
  };

  return (
    <ReactList
      itemRenderer={(index: number, key: any) => {
        return (
          <div key={key}>
            <TimeOption
              value={sliceOfTime[index]}
              checked={sliceOfTime[index] === checkedValue}
              onCheck={setCheckedValue}
              onConfirm={handleConfirm}
            />
          </div>
        );
      }}
      length={sliceOfTime.length}
      type="uniform"
    />
  );
};

const BookingInfo = ({profile, eventType}: any) => {
  return (
    <div
      className="w-96 bg-white border-primary border-r border-solid"
      style={{
        paddingTop: '25px',
        paddingBottom: '25px',
      }}
    >
      <div className="flex flex-col">
        <h4
          className=""
          style={{
            fontSize: '16px',
            paddingLeft: '30px',
            paddingRight: '10px',
            color: 'rgba(77, 80, 85, 0.6)',
            marginBottom: '0 0 3px',
          }}
        >
          {profile?.full_name}
        </h4>
        <h1
          className="font-bold"
          style={{
            marginBottom: '24px',
            fontSize: '28px',
            lineHeight: '32px',
            paddingLeft: '30px',
            paddingRight: '10px',
            color: '#4d5055',
          }}
        >
          {eventType?.name}
        </h1>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            paddingLeft: '30px',
            paddingRight: '10px',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-clock mr-2 w-5 text-center" />
          {eventType?.duration} 分钟
        </div>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            paddingLeft: '30px',
            paddingRight: '10px',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-handshake mr-2 w-5 text-center" />
          {
            colourOptions.find((opt) => opt.value === eventType?.location)
              ?.label
          }
        </div>
      </div>
    </div>
  );
};

const BookTypePage = () => {
  const {user, type} = useParams();
  const query = useQuery();
  const month = query.get('month');
  const date = query.get('date');
  const {pathname} = useLocation();
  const history = useHistory();
  const {
    selectedMonth,
    selectedDate,
    updateSelectedMonth,
    updateSelectedDate,

    userProfileBySlug,
    fetchUserProfile,
    eventTypes,
    fetchEventTypeByUrl,
    fetchSchedule,
    schedules,

    datetimeSpotsByMonth,
    fetchDatetimeSpotsByMonth,
  } = useBook();

  const [datetimeSpots, setDatetimeSpots] = useState<any>([]);

  const profile = userProfileBySlug[user];
  const eventType = eventTypes[user] && eventTypes[user][type];
  const today = moment();
  const schedule_id = eventType && eventType['schedule_id'];
  const schedule = schedules && schedules[schedule_id];
  const rules = schedule && JSON.parse(schedule.rules);

  const sliceOfTime = datetimeSpots
    ? datetimeSpots
        .find((day: any) => day.date === selectedDate?.format('YYYY-MM-DD'))
        ?.spots?.map((s: any) => s.start_time)
    : [];

  useEffect(() => {
    fetchUserProfile(user);
    fetchEventTypeByUrl(user, type).then((r) => {
      if (r) {
        fetchSchedule(user, r['schedule_id']).then((r) => {});
      }
    });

    if (month) {
      updateSelectedMonth(moment(month, 'YYYY-MM'));
    }
    if (date) {
      updateSelectedDate(moment(date, 'YYYY-MM-DD'));
    }
  }, []);

  useEffect(() => {
    if (eventType && selectedMonth) {
      handleDatetimeSpotsFetch(eventType.id, selectedMonth);
    }
  }, [eventType, selectedMonth]);

  useEffect(() => {
    if (selectedMonth && datetimeSpotsByMonth) {
      setDatetimeSpots(datetimeSpotsByMonth[selectedMonth.format('YYYY-MM')]);
    }
  }, [selectedMonth, datetimeSpotsByMonth]);

  const isDayAvailable = (date: moment.Moment) => {
    if (!eventType) {
      return false;
    }
    const {max_booking_time} = eventType;
    switch (eventType.period_type) {
      case PERIOD_TYPE_MOVING:
        const rule =
          rules &&
          rules.find(
            (rule: any) =>
              rule.wday ===
              dayjs(date.toISOString()).format('dddd').toLowerCase()
          );
        return (
          (isSameDay(date, today) || isInclusivelyAfterDay(date, today)) &&
          rule &&
          date.diff(today) < max_booking_time * 60000
        );
      case PERIOD_TYPE_AVAILABLE_MOVING:
      case PERIOD_TYPE_FIXED:
      case PERIOD_TYPE_UNLIMITED:
    }
    return false;
  };

  const isDayHighlighted = (date: moment.Moment) => {
    return isDayAvailable(date);
  };

  const isOutsideRange = (date: moment.Moment) => {
    return !isDayAvailable(date);
  };

  const handleDatetimeSpotsFetch = (
    event_type_id: string,
    month: moment.Moment
  ) => {
    return fetchDatetimeSpotsByMonth(event_type_id, month.format('YYYY-MM'));
  };

  const handleMonthNavigate = (newCurrentMonth: moment.Moment) => {
    if (newCurrentMonth) {
      updateSelectedMonth(newCurrentMonth);
      history.push(
        `${pathname}?month=${newCurrentMonth.format('YYYY-MM')}${
          selectedDate ? `&date=${selectedDate.format('YYYY-MM-DD')}` : ''
        }`
      );
    }
  };

  return (
    <div className="h-full flex flex-row bg-gray-200">
      <BookingInfo profile={profile} eventType={eventType} />
      <div className="bg-white" style={{paddingTop: '28px'}}>
        <div
          className="text-20px"
          style={{
            color: '#4d5055',
            fontSize: '20px',
            marginBottom: '20px',
            textAlign: 'left',
            paddingLeft: '32px',
            paddingRight: '32px',
          }}
        >
          选择日期和时间
        </div>

        <div className="flex flex-row justify-between bg-white">
          <div className="w-96">
            <DayPickerSingleDateController
              date={selectedDate}
              focused={true}
              onFocusChange={(date) => {
                console.log('onFocusChange', date);
              }}
              onPrevMonthClick={handleMonthNavigate}
              onNextMonthClick={handleMonthNavigate}
              onDateChange={(date) => {
                if (date) {
                  updateSelectedDate(date);
                  history.push(
                    `${pathname}?month=${(selectedMonth
                      ? selectedMonth
                      : date
                    ).format('YYYY-MM')}&date=${date.format('YYYY-MM-DD')}`
                  );
                }
              }}
              initialVisibleMonth={() => {
                return month ? moment(month, 'YYYY-MM') : moment();
              }}
              monthFormat="YYYY [年] M [月]"
              weekDayFormat="dd"
              isOutsideRange={isOutsideRange}
              isDayBlocked={() => false}
              isDayHighlighted={isDayHighlighted}
              hideKeyboardShortcutsPanel
            />
          </div>
          {selectedDate && (
            <div className="w-64 flex flex-col h-full">
              <div
                className=""
                style={{
                  height: '38px',
                  marginBottom: '10px',
                  fontSize: '16px',
                  lineHeight: '38px',
                  color: '#4d5055',
                }}
              >
                {selectedDate?.format('MMM D[日] dddd')}
              </div>
              <div
                className="p-1 h-full"
                style={{overflow: 'scroll', height: '500px'}}
              >
                <TimeOptionList sliceOfTime={sliceOfTime ? sliceOfTime : []} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BookTypePageWrapper = () => {
  const query = useQuery();
  const {pathname} = useLocation();
  if (query.get('month')) {
    return <BookTypePage />;
  } else {
    return <Redirect to={`${pathname}?month=${moment().format('YYYY-MM')}`} />;
  }
};

export default BookTypePageWrapper;

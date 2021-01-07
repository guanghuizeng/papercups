import React, {useEffect, useState} from 'react';
import BookCalendar from '../common/BookCalendar';
import ReactList from 'react-list';
// import dayjs from "dayjs";
import {listOfTime} from '../constants';
import {
  useLocation,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
  useHistory,
} from 'react-router-dom';
import BookProvider, {useBook} from './BookProvider';
import * as API from '../../api';
import {colourOptions} from '../events/data';
import {
  DayPickerSingleDateController,
  isInclusivelyAfterDay,
  isInclusivelyBeforeDay,
  isSameDay,
} from 'react-dates';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {fetchScheduleById} from '../../api';
import dayjs from 'dayjs';
import {
  ITextFieldStyles,
  Label,
  PrimaryButton,
  TextField,
} from '@fluentui/react';

moment.locale('zh-cn');

const sliceOfTime = listOfTime.slice(4 * 9 + 2, 4 * 17 + 3);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TimeOption({value, checked, onCheck, onConfirm}: any) {
  return (
    <>
      {!checked ? (
        <div
          onClick={() => onCheck(value)}
          style={{width: 230, height: 52}}
          className="cursor-pointer mb-3 px-2 py-2 bg-white text-lightblue-500 font-bold border hover:shadow-blue-outline border-lightblue-500 rounded text-center"
        >
          {value}
        </div>
      ) : (
        <div
          style={{width: 230, height: 52}}
          className="grid grid-cols-2 gap-2"
        >
          <div className="cursor-pointer mb-3 px-2 py-2 bg-gray-600 text-white font-bold  rounded text-center">
            {value}
          </div>
          <div
            className="cursor-pointer mb-3 px-2 py-2 bg-lightblue-500 text-white font-bold border border-lightblue-500 rounded text-center"
            onClick={onConfirm}
          >
            {/*<Redirect to="/@ycy">*/}
            Confirm
            {/*</Redirect>*/}
          </div>
        </div>
      )}
    </>
  );
}

function BookRecord() {}

export function Book() {
  const [checkedValue, setCheckedValue] = useState();

  return (
    <div className="lg:pt-32 ">
      <section className="container lg:w-1060 mx-auto my-auto text-gray-700 body-font rounded-lg bg-white overflow-y-hidden border-primary border-2 border-solid">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-book-2">
            <div className="lg:px-8 lg:py-25px border-r border-gray-300">
              <div className="lg:h-700">
                <div>{''}</div>
                <div className="text-28 font-bold">15 Minute Meeting</div>
                <div>{''}</div>
                <div>9:30am - 9:45am, Friday, November 27, 2020</div>
              </div>
            </div>
            <div className="lg:h-700 lg:py-25px ">
              <div className="text-20px mb-20px">Select a Date & Time</div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 h-full">
                <div>
                  <BookCalendar />
                </div>
                <div className="h-full flex flex-col">
                  <div className="pb-3">Thursday, November 26</div>
                  <div
                    className="p-1 h-full"
                    style={{overflow: 'auto', maxHeight: '650px'}}
                  >
                    <ReactList
                      itemRenderer={(index: number, key: any) => {
                        return (
                          <div key={key}>
                            <TimeOption
                              value={sliceOfTime[index]}
                              checked={sliceOfTime[index] === checkedValue}
                              onCheck={setCheckedValue}
                            />
                          </div>
                        );
                      }}
                      length={sliceOfTime.length}
                      type="uniform"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const BookUserPage = () => {
  const {user} = useParams();

  const {userProfileBySlug, fetchUserProfile} = useBook();

  useEffect(() => {
    if (!userProfileBySlug[user]) {
      fetchUserProfile(user).then((r) => {});
    }
  }, []);

  return (
    <div className="mx-auto p-8">
      <div className="h-56">
        <div className="h-24 gentle-flex text-xl font-normal opacity-75">
          {userProfileBySlug[user]?.full_name}
        </div>
        <div className="text-center">
          欢迎来到我的预约页面。
          <br />
          请按照指导添加预约时间到我的日历。
        </div>
      </div>
      <div className="flex flex-row flex-wrap border-t-2 border-primary border-solid pt-5">
        {['15min', '30min', '45min', '50min'].map((type) => {
          return (
            <Link to={`/@${user}/${type}`}>
              <div
                key={type}
                className="mt-2 ml-2 h-32 w-64 bg-gray-200 cursor-pointer gentle-flex hover:bg-gray-300 rounded"
              >
                {type}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

function isBeforeDay(a: any, b: any) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

  const aYear = a.year();
  const aMonth = a.month();

  const bYear = b.year();
  const bMonth = b.month();

  const isSameYear = aYear === bYear;
  const isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return a.date() < b.date();
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}

function minsToDays(mins: number) {
  return mins / 60 / 24;
}

const TimeOptionList = ({sliceOfTime, handleSelectDateAndTime}: any) => {
  const {pathname} = useLocation();
  const {selectedMonth, selectedDate, updateSelectedTime} = useBook();

  const [checkedValue, setCheckedValue] = useState<string>('');
  let history = useHistory();

  const handleConfirm = () => {
    updateSelectedTime(checkedValue);
    console.log(
      'confirm1',
      checkedValue,
      selectedDate,
      moment.duration(checkedValue)
    );
    history.push(
      `${pathname}/${selectedDate
        ?.clone()
        .add(moment.duration(checkedValue))
        ?.format()}?month=${selectedMonth?.format(
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

const BookTypePage = () => {
  const {user, type} = useParams();
  const query = useQuery();
  const month = query.get('month');
  const date = query.get('date');

  console.log('book type', user, type, month, date);

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
  } = useBook();

  useEffect(() => {
    fetchUserProfile(user).then((r) => {});
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

  const profile = userProfileBySlug[user];
  const eventType = eventTypes[user] && eventTypes[user][type];
  const nextDays = minsToDays(eventType?.max_booking_time);
  const today = moment();

  const schedule_id = eventType && eventType['schedule_id'];
  const schedule = schedules && schedules[schedule_id];
  const rules = schedule && JSON.parse(schedule.rules);

  const rule =
    rules &&
    rules.find(
      (rule: any) =>
        rule.wday ===
        dayjs(selectedDate?.toISOString()).format('dddd').toLowerCase()
    );
  const interval: any = rule && rule.intervals[0];

  let sliceOfTime: any[] = [];

  if (interval) {
    const startIndex = listOfTime.findIndex((t) => t === interval.from);
    const endIndex = listOfTime.findIndex((t) => t === interval.to);

    // const sliceOfTime = listOfTime.slice(4 * 9 + 2, 4 * 17 + 3);
    sliceOfTime = listOfTime.slice(startIndex, endIndex + 1);
  }

  // console.log('Rule', rules);
  const isDayBlocked = (date: any) => {
    return date.weekday() === 5 || date.weekday() === 6;
  };

  const isDayHighlighted = (date: moment.Moment) => {
    return isSameDay(date, today) || isInclusivelyAfterDay(date, today);
  };

  const isOutsideRange = (date: any) => {
    return (
      isBeforeDay(date, today) ||
      isInclusivelyAfterDay(date, moment().add(nextDays, 'day'))
    );
  };

  const handleSelectDateAndTime = (time: string) => {
    console.log('handleSelectDateAndTime', selectedDate, time);
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
              isDayBlocked={isDayBlocked}
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
                <TimeOptionList
                  sliceOfTime={sliceOfTime}
                  handleSelectDateAndTime={handleSelectDateAndTime}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuestionForm = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
    setError(null);
    setLoading(null);
  };

  const textFieldStyles: Partial<ITextFieldStyles> = {
    field: {height: 50, fontSize: '1rem', color: 'black', padding: '12px 16px'},
    fieldGroup: {height: 52, border: '1px black solid'},
    revealButton: {height: 50},
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={() => console.log('submit')}
    >
      <div className="flex flex-col">
        <div style={{paddingBottom: '24px'}}>
          <Label required>姓名</Label>
          <TextField
            type="text"
            styles={textFieldStyles}
            onChange={handleChangeEmail}
            value={email}
            id={'name'}
          />
        </div>
        <div style={{paddingBottom: '24px'}}>
          <Label required>Email</Label>
          <TextField
            type="email"
            styles={textFieldStyles}
            onChange={handleChangeEmail}
            value={email}
            id={'email'}
          />
        </div>
      </div>
      <PrimaryButton className="submit-button" text="提交" type="submit" />
    </form>
  );
};

const BookContactsPage = () => {
  const {user, type, datetime} = useParams();
  const query = useQuery();
  const month = query.get('month');
  const date = query.get('date');

  const {
    selectedDate,
    updateSelectedDate,
    updateSelectedMonth,
    selectedTime,
    updateSelectedTime,

    userProfileBySlug,
    fetchUserProfile,
    eventTypes,
    fetchEventTypeByUrl,
    fetchSchedule,
    schedules,
  } = useBook();
  const profile = userProfileBySlug[user];
  const eventType = eventTypes[user] && eventTypes[user][type];

  useEffect(() => {
    fetchUserProfile(user).then((r) => {});
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
    if (datetime) {
      updateSelectedMonth(moment(datetime, 'YYYY-MM'));
      updateSelectedDate(moment(datetime, 'YYYY-MM-DD'));
      updateSelectedTime(moment(datetime, 'YYYY-MM-DDTHH:mm').format('HH:mm'));
    }
  }, []);

  return (
    <div className="h-full flex flex-row bg-gray-200">
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
            <i className="fas fa-calendar-day mr-2 w-5 text-center" />
            {selectedTime}, {selectedDate?.format('YYYY-MM-DD')}
          </div>
        </div>
      </div>
      <div className="bg-white h-full" style={{paddingTop: '28px'}}>
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
          联系信息
        </div>
        <div
          className=""
          style={{
            width: '600px',
            paddingLeft: '32px',
            paddingRight: '32px',
            height: 'calc(100% - 60px)',
          }}
        >
          <QuestionForm />
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

const Book2 = () => {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div
        className="w-full flex flex-row justify-center"
        style={{
          paddingTop: '66px',
          paddingBottom: '30px',
        }}
      >
        <div
          className="bg-white border-primary border-2 border-solid rounded shadow"
          style={{
            // width: '1024px',
            minHeight: '700px',
          }}
        >
          <Switch>
            <Route exact path="/@:user" component={BookUserPage} />
            <Route exact path="/@:user/:type" component={BookTypePageWrapper} />
            <Route
              exact
              path="/@:user/:type/:datetime"
              component={BookContactsPage}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const BookWrapper = (props: any) => {
  return (
    <BookProvider>
      <Book2 {...props} />
    </BookProvider>
  );
};

export default BookWrapper;

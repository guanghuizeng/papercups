import React, {useEffect, useState} from 'react';
import BookCalendar from '../common/BookCalendar';
import ReactList from 'react-list';
// import dayjs from "dayjs";
import {listOfTime} from '../constants';
import {useLocation, Switch, Route, Link, useParams} from 'react-router-dom';
import BookProvider, {useBook} from './BookProvider';
import * as API from '../../api';
import {colourOptions} from '../events/data';
import {DayPickerSingleDateController} from 'react-dates';
import moment from 'moment';

const sliceOfTime = listOfTime.slice(4 * 9 + 2, 4 * 17 + 3);

function TimeOption({value, checked, onCheck}: any) {
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
          <div className="cursor-pointer mb-3 px-2 py-2 bg-lightblue-500 text-white font-bold border border-lightblue-500 rounded text-center">
            Confirm
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

const BookTypePage = () => {
  const {user, type} = useParams();
  const {
    userProfileBySlug,
    fetchUserProfile,
    eventTypes,
    fetchEventTypeByUrl,
  } = useBook();

  const [checkedValue, setCheckedValue] = useState();

  useEffect(() => {
    fetchUserProfile(user).then((r) => {});
    fetchEventTypeByUrl(user, type).then((r) => {});
  }, []);

  const profile = userProfileBySlug[user];
  const eventType = eventTypes[user] && eventTypes[user][type];

  moment.locale('zh-cn');

  console.log('Date', moment().date());

  return (
    <div className="h-full grid grid-cols-2 gap-1 bg-gray-200">
      <div className="p-8 bg-white">
        <div className="flex flex-col">
          <div>{profile?.full_name}</div>
          <div>{eventType?.name}</div>
          <div>{eventType?.duration} min</div>
          <div>
            {
              colourOptions.find((opt) => opt.value === eventType?.location)
                ?.label
            }
          </div>
        </div>
      </div>
      <div className="p-8 bg-white">
        <div className="text-20px mb-20px">Select a Date & Time</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 h-full">
          <div>
            <DayPickerSingleDateController
              date={moment()}
              focused={false}
              onFocusChange={() => {}}
              onDateChange={() => {}}
              initialVisibleMonth={() => moment()}
              monthFormat="YYYY [年] M [月]"
              isOutsideRange={(date) => {
                return date.isBefore(moment());
              }}
              isDayBlocked={(date) =>
                date.weekday() === 0 || date.weekday() === 6
              }
              isDayHighlighted={(date) => date.isAfter(moment())}
            />
          </div>
          {/*<div className="h-full flex flex-col">*/}
          {/*    <div className="pb-3">Thursday, November 26</div>*/}
          {/*    <div*/}
          {/*        className="p-1 h-full"*/}
          {/*        style={{overflow: 'auto', maxHeight: '650px'}}*/}
          {/*    >*/}
          {/*        <ReactList*/}
          {/*            itemRenderer={(index: number, key: any) => {*/}
          {/*                return (*/}
          {/*                    <div key={key}>*/}
          {/*                        <TimeOption*/}
          {/*                            value={sliceOfTime[index]}*/}
          {/*                            checked={sliceOfTime[index] === checkedValue}*/}
          {/*                            onCheck={setCheckedValue}*/}
          {/*                        />*/}
          {/*                    </div>*/}
          {/*                );*/}
          {/*            }}*/}
          {/*            length={sliceOfTime.length}*/}
          {/*            type="uniform"*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

const Book2 = () => {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <div
        className="text-2xl bg-pink-400 cursor-pointer"
        onClick={() => {
          API.fetchUserProfileBySlug('ycy').then((r) => {
            console.log('Profile', r);
          });
        }}
      >
        Get profile
      </div>
      <div
        className="text-2xl bg-pink-400 cursor-pointer"
        onClick={() => {
          API.fetchEventTypeByUrl('ycy', '15min').then((r) => {
            console.log('Event type', r);
          });
        }}
      >
        Get event type
      </div>

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
            width: '1024px',
            height: '768px',
          }}
        >
          <Switch>
            <Route exact path="/@:user" component={BookUserPage} />
            <Route exact path="/@:user/:type" component={BookTypePage} />
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

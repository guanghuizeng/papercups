import React, {useState} from 'react';
import BookCalendar from '../common/BookCalendar';
import ReactList from 'react-list';
// import dayjs from "dayjs";
import {listOfTime} from '../constants';
import {useLocation, Switch, Route, Link, useParams} from 'react-router-dom';
import BookProvider, {useBook} from './BookProvider';

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
  const {userProfile, eventType} = useBook();
  const [checkedValue, setCheckedValue] = useState();

  return (
    <div className="lg:pt-32 ">
      <section className="container lg:w-1060 mx-auto my-auto text-gray-700 body-font rounded-lg bg-white overflow-y-hidden border-primary border-2 border-solid">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-book-2">
            <div className="lg:px-8 lg:py-25px border-r border-gray-300">
              <div className="lg:h-700">
                <div>{userProfile}</div>
                <div className="text-28 font-bold">15 Minute Meeting</div>
                <div>{eventType}</div>
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
  const {pathname} = useLocation();
  const {user} = useParams();
  return (
    <div className="mx-auto p-8">
      <div className="h-56">
        <div className="h-24 gentle-flex text-xl font-normal opacity-75">
          {user}
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
            <Link to={`${pathname}${type}`}>
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
  return (
    <div>
      {user}, {type}
    </div>
  );
};

const Book2 = () => {
  const {userProfile, eventTypes} = useBook();

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

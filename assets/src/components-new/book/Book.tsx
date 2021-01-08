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
import dayjs from 'dayjs';
import {
  ITextFieldStyles,
  Label,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import BookTypePage from './BookTypePage';
import TimeOption from './TimeOption';
import BookUserPage from './BookUserPage';
import BookTypePageWrapper from './BookTypePage';
import BookContactsPage from './BookContactsPage';

moment.locale('zh-cn');

const sliceOfTime = listOfTime.slice(4 * 9 + 2, 4 * 17 + 3);

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

const BookInviteePage = () => {
  const {pathname} = useLocation();
  console.log('invitee page', pathname);

  return <div>{pathname}</div>;
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
              path="/@:user/:type/invitees/:invitee"
              component={BookInviteePage}
            />
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

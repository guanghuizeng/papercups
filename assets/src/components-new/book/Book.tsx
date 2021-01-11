import React, {useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import BookProvider, {useBook} from './BookProvider';
import moment from 'moment';
import 'moment/locale/zh-cn';
import BookUserPage from './BookUserPage';
import BookTypePageWrapper from './BookTypePage';
import BookContactsPage from './BookContactsPage';
import BookInviteePage from './BookInviteePage';

moment.locale('zh-cn');

const Book = () => {
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
      <Book {...props} />
    </BookProvider>
  );
};

export default BookWrapper;

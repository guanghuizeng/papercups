import React, {useEffect} from 'react';
import {Switch, Redirect, Route, RouteComponentProps} from 'react-router-dom';
import ScheduledEvents from './ScheduledEvents';
import SchedulingLink from './SchedulingLink';
import AppDataProvider from '../hooks/AppDataProvider';
import {SchedulingLinksBoard} from './SchedulingLinksBoard';
import {AppSettings} from './AppSettings';
import {Availability} from './Availability';
import BookingPage from './booking/BookingPage';

function Dashboard(props: RouteComponentProps) {
  return (
    <div
      className="flex flex-col md:flex-row h-full w-screen"
      style={{
        minHeight: '100vh',
      }}
    >
      <div className="flex flex-row w-full">
        <Switch>
          <Route exact path="/" component={() => <Redirect to={'/links'} />} />
          <Route exact path="/links" component={SchedulingLinksBoard} />
          <Route
            path="/links/:id"
            component={() => (
              <div className="w-full border-l border-gray-200 border-solid">
                <SchedulingLink />
              </div>
            )}
          />
          <Route path="/events" component={ScheduledEvents} />
          <Route path="/settings" component={AppSettings} />
          <Route path="/availabilities/:id/edit" component={Availability} />
          {/*<Route path="/apps" component={() => <div>apps</div>} />*/}
          <Route
            path="/:userSlug/:schedulingLinkSlug"
            component={BookingPage}
          />
        </Switch>
      </div>
    </div>
  );
}

const DashboardWrapper = (props: RouteComponentProps) => {
  return (
    <AppDataProvider>
      <Dashboard {...props} />
    </AppDataProvider>
  );
};

export default DashboardWrapper;

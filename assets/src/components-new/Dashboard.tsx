import React, {useEffect} from 'react';
import Header from './Header';
import {
  useLocation,
  Switch,
  Redirect,
  Route,
  Link,
  RouteComponentProps,
} from 'react-router-dom';
import _ from 'lodash';
import EventType from './EventType';
import {useAuth} from '../components/auth/AuthProvider';
import {EventTypes} from './EventTypes';
import {ConversationsProvider} from '../components/conversations/ConversationsProvider';
import {EventsProvider, useEvents} from './EventsProvider';
import NewEventType from './events/NewEventType';
import NavSection from './NavSection';
import ScheduledEvents from './events/ScheduledEvents';

function Dashboard(props: RouteComponentProps) {
  const auth = useAuth();
  const {pathname} = useLocation();

  return (
    <div
      className="flex flex-row h-full w-screen"
      style={{
        minHeight: '100vh',
      }}
    >
      {/*<Header />*/}

      {/*<NavSection />*/}

      <div
        className="border-r-4 border-solid border-gray-100 pt-5"
        style={{width: '200px', backgroundColor: '#f2f2f2'}}
      >
        <div className="flex flex-col">
          <div className="pt-4 pb-4 pl-4">
            <div>杨超越</div>
            <div className="text-sm text-blue-500">letsmeet.com/ycy</div>
          </div>
          <div>
            {[
              {url: '/events', name: '预约'},
              {url: '/event_types', name: '预约类型'},
              {url: '/availability', name: '时间管理'},
              {url: '/workflows', name: '工作流'},
            ].map(({url, name}) => {
              return (
                <Link to={url} key={url}>
                  <div
                    className={`${
                      pathname === url || pathname.startsWith(url)
                        ? 'bg-gray-200 text-black'
                        : 'opacity-75'
                    } pl-4 py-2`}
                  >
                    {name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row" style={{width: 'calc(100% - 200px)'}}>
        <Switch>
          <Route exact path="/event_types" component={EventTypes} />
          <Route exact path="/event_types/add" component={NewEventType} />
          <Route
            path="/event_types/:id"
            component={() => (
              <div className="w-0 lg:w-1/5 invisible lg:visible">
                <EventTypes />
              </div>
            )}
          />
          <Route path="/events" component={ScheduledEvents} />
          <Route path="/workflows" component={() => <div>workflows</div>} />
        </Switch>
        <Switch>
          <Route
            path="/event_types/:id"
            component={() => (
              <div className="w-full lg:w-4/5 border-l border-gray-200 border-solid">
                <EventType />
              </div>
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

const DashboardWrapper = (props: RouteComponentProps) => {
  return (
    <EventsProvider>
      <Dashboard {...props} />
    </EventsProvider>
  );
};

export default DashboardWrapper;

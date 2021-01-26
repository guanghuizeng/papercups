import React, {useEffect} from 'react';
import Header from './Header';
import {
  useLocation,
  Switch,
  Redirect,
  Route,
  Link,
  RouteComponentProps,
  BrowserRouter as Router,
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
import SchedulingLink from './SchedulingLink';
import AppDataProvider from '../hooks/AppDataProvider';
import {SchedulingLinksBoard} from './SchedulingLinksBoard';
import SchedulingLinkNew from './SchedulingLinkNew';
import * as API from '../api';
import {AppSettings} from './AppSettings';
import {Availability} from './Availability';
import BookingPage from './BookingPage';

function Dashboard(props: RouteComponentProps) {
  const auth = useAuth();
  const {pathname} = useLocation();

  return (
    <div
      className="flex flex-col md:flex-row h-full w-screen"
      style={{
        minHeight: '100vh',
      }}
    >
      <div
        className="w-full md:w-64 border-r-2 border-solid border-gray-100 pt-5"
        style={{backgroundColor: '#f2f2f2'}}
      >
        <div className="flex flex-col">
          <div className="pt-4 pb-4 pl-4">
            <div>杨超越</div>
            <div className="text-sm text-blue-500">letsmeet.com/ycy</div>
          </div>
          <div>
            {[
              {
                icon: () => <i className="fas fa-link mr-2" />,
                url: '/links',
                name: '链接',
              },
              {
                icon: () => <i className="fas fa-calendar-check mr-2" />,
                url: '/events',
                name: '日程',
              },
              {
                icon: () => <i className="fas fa-code mr-2" />,
                url: '/apps',
                name: '应用',
              },
              {
                icon: () => <i className="fas fa-cog mr-2" />,
                url: '/settings',
                name: '设置',
              },
              {
                icon: () => <i className="fas fa-cog mr-2" />,
                url: '/ycy/chat',
                name: 'Booking Page Preview',
              },
              // {url: '/availability', name: '时间管理'},
              // {url: '/workflows', name: '工作流'},
            ].map(({icon, url, name}) => {
              return (
                <Link to={url} key={url}>
                  <div
                    className={`${
                      pathname === url ||
                      pathname.startsWith(url) ||
                      (pathname === '/' && url === '/links')
                        ? 'bg-gray-200 text-black'
                        : 'opacity-75'
                    } pl-4 py-2`}
                  >
                    {icon && icon()}
                    {name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div
          className="cursor-pointer hover:bg-gray-200 mt-20"
          onClick={() => {
            API.createSchedule().then((r) => {
              console.log('createSchedule', r);
            });
          }}
        >
          Create schedule
        </div>

        <div
          className="cursor-pointer hover:bg-gray-200 mt-20"
          onClick={() => {
            auth.logout();
          }}
        >
          Logout
        </div>
      </div>

      <div className="flex flex-row" style={{width: 'calc(100% - 200px)'}}>
        <Switch>
          <Route exact path="/" component={SchedulingLinksBoard} />
          <Route exact path="/links" component={SchedulingLinksBoard} />
          <Route exact path="/links_new" component={SchedulingLinkNew} />
          <Route
            path="/links/:id"
            component={() => (
              <div className="w-0 lg:w-1/5 invisible lg:visible">
                <SchedulingLinksBoard />
              </div>
            )}
          />
          <Route path="/events" component={ScheduledEvents} />
          <Route path="/settings" component={AppSettings} />
          <Route path="/availabilities/:id/edit" component={Availability} />
          <Route path="/apps" component={() => <div>apps</div>} />
          <Route path="/:user/:slug" component={BookingPage} />
        </Switch>
        <Switch>
          <Route
            path="/links/:id"
            component={() => (
              <div className="w-full lg:w-4/5 border-l border-gray-200 border-solid">
                <SchedulingLink />
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
    <AppDataProvider>
      <Dashboard {...props} />
    </AppDataProvider>
  );
};

export default DashboardWrapper;

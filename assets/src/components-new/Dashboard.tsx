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
import EventType from './EventType';
import {useAuth} from '../components/auth/AuthProvider';
import {Home} from './Home';
import {ConversationsProvider} from '../components/conversations/ConversationsProvider';
import {EventsProvider, useEvents} from './EventsProvider';
import NewEventType from './events/NewEventType';
import NavSection from './NavSection';
import ScheduledEvents from './events/ScheduledEvents';

function Dashboard(props: RouteComponentProps) {
  const auth = useAuth();
  const {pathname} = useLocation();

  return (
    <div className="flex flex-row h-screen w-screen" style={{}}>
      {/*<Header />*/}

      {/*<NavSection />*/}

      <div
        className="border-r border-solid border-primary pt-5"
        style={{width: '200px'}}
      >
        <div className="flex flex-col">
          <div className="pt-4 pb-4 pl-4">
            <div>Yuanyuan Zhang</div>
            <div className="text-sm text-blue-500">calendly.com/ycy</div>
          </div>
          <div className="pl-4">
            <div>Events</div>
            <div>Event Types</div>
            <div>Availability</div>
            <div>Workflows</div>
          </div>
        </div>
      </div>

      <div className="pt-5" style={{width: 'calc(100% - 200px)'}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/event_type/add" component={NewEventType} />
          <Route path="/event_type/:id" component={EventType} />
          <Route path="/scheduled_events" component={ScheduledEvents} />
          <Route path="/workflows" component={() => <div>workflows</div>} />
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

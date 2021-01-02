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
    <div>
      <Header />

      <NavSection />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/event_type/add" component={NewEventType} />
        <Route path="/event_type/:id" component={EventType} />
        <Route path="/scheduled_events" component={ScheduledEvents} />
        <Route path="/workflows" component={() => <div>workflows</div>} />
      </Switch>
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

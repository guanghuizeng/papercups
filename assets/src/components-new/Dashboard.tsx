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

function Dashboard(props: RouteComponentProps) {
  const auth = useAuth();
  const {pathname} = useLocation();

  return (
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/event_type/:id" component={EventType} />
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

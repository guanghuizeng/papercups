import React from 'react';
import {
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {useAuth} from './components-new/auth/AuthProvider';
import Login from './components-new/auth/Login';
import Register from './components-new/auth/Register';
import EmailVerification from './components-new/auth/EmailVerification';
import PasswordReset from './components-new/auth/PasswordReset';
import RequestPasswordReset from './components-new/auth/RequestPasswordReset';
import PasswordResetRequested from './components-new/auth/PasswordResetRequested';
import Dashboard from './components-new/Dashboard';
import './App.css';
import './tailwind.css';
import LandingPage from './components-new/landing/LandingPage';
import {initializeIcons} from '@fluentui/react';
import BookingPage from './components-new/booking/BookingPage';
import ScheduledEvent from './components-new/ScheduledEvent';

initializeIcons();

const App = () => {
  const auth = useAuth();

  if (auth.loading) {
    return null; // FIXME: show loading icon
  }

  if (!auth.isAuthenticated) {
    // Public routes
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register/:invite" component={Register} />
          <Route path="/register" component={Register} />
          <Route path="/verify" component={EmailVerification} />
          <Route path="/reset-password" component={RequestPasswordReset} />
          <Route path="/reset" component={PasswordReset} />
          <Route
            path="/reset-password-requested"
            component={PasswordResetRequested}
          />
          <Route path="/event/:id" component={ScheduledEvent} />
          {/*<Route path="/@:user" component={Book} />*/}
          <Route
            path="*"
            render={(props: RouteComponentProps<{}>) => (
              <Redirect to={`/login?redirect=${props.location.pathname}`} />
            )}
          />
        </Switch>
      </Router>
    );
  }

  // Private routes
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register/:invite" component={Register} />
        <Route path="/register" component={Register} />
        <Route path="/verify" component={EmailVerification} />
        <Route path="/reset-password" component={RequestPasswordReset} />
        <Route path="/reset" component={PasswordReset} />
        <Route
          path="/reset-password-requested"
          component={PasswordResetRequested}
        />
        <Route path="/@:userSlug/:schedulingLinkSlug" component={BookingPage} />
        <Route path="/event/:id" component={ScheduledEvent} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;

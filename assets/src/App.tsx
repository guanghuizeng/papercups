import React from 'react';
import {
  RouteComponentProps,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {useAuth} from './components/auth/AuthProvider';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EmailVerification from './components/auth/EmailVerification';
import PasswordReset from './components/auth/PasswordReset';
import RequestPasswordReset from './components/auth/RequestPasswordReset';
import PasswordResetRequested from './components/auth/PasswordResetRequested';
import './styles/tailwind.css';
import LandingPage from './components/landing/LandingPage';
import {initializeIcons} from '@fluentui/react';
import BookingPage from './components/booking/BookingPage';
import ScheduledEvent from './components/events/ScheduledEvent';
import AppDataProvider from './hooks/AppDataProvider';
import {SchedulingLinksBoard} from './components/links/SchedulingLinksBoard';
import SchedulingLink from './components/links/SchedulingLink';
import ScheduledEvents from './components/events/ScheduledEvents';
import {AppSettings} from './components/settings/AppSettings';
import {Availability} from './components/availability/Availability';

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
          <Route
            path="/:userSlug/:schedulingLinkSlug"
            component={BookingPage}
          />
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
        <AppDataProvider>
          <div
            className="flex flex-col md:flex-row h-full w-screen"
            style={{
              minHeight: '100vh',
            }}
          >
            <div className="flex flex-row w-full">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => <Redirect to={'/links'} />}
                />
                <Route exact path="/links" component={SchedulingLinksBoard} />
                <Route
                  path="/links/:id/edit"
                  component={() => (
                    <div className="w-full border-l border-gray-200 border-solid">
                      <SchedulingLink />
                    </div>
                  )}
                />
                <Route path="/events" component={ScheduledEvents} />
                <Route path="/event/:id" component={ScheduledEvent} />
                <Route path="/settings" component={AppSettings} />
                <Route
                  path="/availabilities/:id/edit"
                  component={Availability}
                />
                {/*<Route path="/apps" component={() => <div>apps</div>} />*/}
                <Route
                  path="/:userSlug/:schedulingLinkSlug"
                  component={BookingPage}
                />
              </Switch>
            </div>
          </div>
        </AppDataProvider>
      </Switch>
    </Router>
  );
};

export default App;

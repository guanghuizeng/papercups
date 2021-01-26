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
import Demo from './components/demo/Demo';
import BotDemo from './components/demo/BotDemo';
import Dashboard from './components-new/Dashboard';
import Pricing from './components/billing/PricingOverview';
import Sandbox from './components/Sandbox';
import SharedConversation from './components/conversations/SharedConversation';
import './App.css';
import './tailwind.css';
import LadingPage from './components/landing/LadingPage';
import Live from './components-new/book/Live';
import {initializeIcons} from '@fluentui/react';
import Book from './components-new/book/Book';
import BookingPage from './components-new/booking/BookingPage';

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
          <Route exact={true} path="/" component={LadingPage} />
          <Route path="/demo" component={Demo} />
          <Route path="/bot/demo" component={BotDemo} />
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
          <Route path="/pricing" component={Pricing} />
          <Route path="/sandbox" component={Sandbox} />
          <Route path="/share" component={SharedConversation} />
          <Route path="/live" component={Live} />
          <Route path="/@:user" component={Book} />
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
        <Route path="/demo" component={Demo} />
        <Route path="/bot/demo" component={BotDemo} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/sandbox" component={Sandbox} />
        <Route path="/share" component={SharedConversation} />
        <Route path="/live" component={Live} />
        <Route path="/@:userSlug/:schedulingLinkSlug" component={BookingPage} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;

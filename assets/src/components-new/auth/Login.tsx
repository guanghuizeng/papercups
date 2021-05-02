import React, {useEffect, useState} from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';
import {
  TextField,
  Label,
  ITextFieldStyles,
  PrimaryButton,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import {useAuth} from './AuthProvider';
import logger from '../../logger';

const Login2 = (props: any) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState('/');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {}, []);

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
    setError(null);
    setLoading(null);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
    setError(null);
    setLoading(null);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setError(null);
    setLoading(null);

    // TODO: handle login through API
    props
      .onSubmit({email, password})
      .then(() => props.history.push(redirect))
      .catch((err: any) => {
        logger.error('Error!', err);
        const error =
          err.response?.body?.error?.message || 'Invalid credentials';
        setError(error);
        setLoading(false);
      });
  };

  const textFieldStyles: Partial<ITextFieldStyles> = {
    field: {height: 50, fontSize: '1rem', color: 'black', padding: '12px 16px'},
    fieldGroup: {height: 52, border: '1px black solid'},
    revealButton: {height: 50},
  };

  return (
    <div className="h-screen gentle-flex">
      <div
        className="border-true-gray-200 border-2 border-solid flex flex-col rounded"
        style={{
          width: '464px',
          // height: '554px',
        }}
      >
        <div
          className="w-full"
          style={{
            padding: '64px',
          }}
        >
          <div
            className="font-medium"
            style={{fontSize: '36px', marginBottom: '24px'}}
          >
            Sign in
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{paddingBottom: '24px'}}>
              <Label>Email</Label>
              <TextField
                type="email"
                styles={textFieldStyles}
                onChange={handleChangeEmail}
                value={email}
                id={'email'}
              />
            </div>
            <div style={{paddingBottom: '24px'}}>
              <Label>Password</Label>
              <TextField
                id="password"
                type="password"
                styles={textFieldStyles}
                onChange={handleChangePassword}
                value={password}
                canRevealPassword
              />
            </div>
            <PrimaryButton
              className="login-button"
              text="Submit"
              type="submit"
            />

            {error && (
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={false}
                // onDismiss={p.resetChoice}
                dismissButtonAriaLabel="Close"
                className="mt-5"
              >
                {error}
              </MessageBar>
            )}
          </form>

          {/*<DefaultButton text="使用微信登录"/>*/}
          {/*<DefaultButton text="使用飞书登录"/>*/}
        </div>
        <div
          className=""
          style={{
            paddingRight: '64px',
            paddingLeft: '64px',
            paddingBottom: '64px',
          }}
        >
          <Link to="/register">
            <span
              className="border-b-2 border-solid"
              style={{
                color: '#2251ff',
                borderColor: '#2251ff',
              }}
            >
              注册账号
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const LoginPage = (props: RouteComponentProps) => {
  const auth = useAuth();

  return <Login2 {...props} onSubmit={auth.login} />;
};

export default LoginPage;

import React, {useEffect, useState} from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';
import {useAuth} from './AuthProvider';
import logger from '../../logger';
import {
  ITextFieldStyles,
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';

const Register2 = (props: any) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [redirect, setRedirect] = useState('/');
  const [error, setError] = useState<any>(null);
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

  const handleChangePasswordConfirmation = (e: any) => {
    setPasswordConfirmation(e.target.value);
  };

  const getValidationError = () => {
    if (!email) {
      return 'Email is required';
    } else if (!password) {
      return 'Password is required';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters';
    } else if (password !== passwordConfirmation) {
      return 'Password confirmation does not match';
    } else {
      return null;
    }
  };
  const handleInputBlur = () => {
    if (!submitted) {
      return;
    }

    setError(getValidationError());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const error = getValidationError();

    if (error) {
      setError(error);
      setSubmitted(false);
      return;
    }

    setLoading(true);
    setSubmitted(true);
    setError(null);

    props
      .onSubmit({
        companyName: 'x',
        // inviteToken: '',
        email,
        password,
        passwordConfirmation,
      })
      .then(() => props.history.push(redirect))
      .catch((err: any) => {
        logger.error('Error!', err);
        // TODO: provide more granular error messages?
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
            Sign up
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
                onBlur={handleInputBlur}
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
                onBlur={handleInputBlur}
              />
            </div>
            <div style={{paddingBottom: '24px'}}>
              <Label>Confirm Password</Label>
              <TextField
                id="confirm_password"
                type="password"
                styles={textFieldStyles}
                onChange={handleChangePasswordConfirmation}
                value={passwordConfirmation}
                canRevealPassword
                onBlur={handleInputBlur}
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
          <Link to="/login">
            <span
              className="border-b-2 border-solid"
              style={{
                color: '#2251ff',
                borderColor: '#2251ff',
              }}
            >
              登录已有账号
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = (props: RouteComponentProps) => {
  const auth = useAuth();

  return <Register2 {...props} onSubmit={auth.register} />;
};

export default RegisterPage;

import React, {useEffect, useState} from 'react';
import {RouteComponentProps, Link} from 'react-router-dom';
import {Box, Flex} from 'theme-ui';
import qs from 'query-string';
import {
  TextField,
  Label,
  ITextFieldStyles,
  PrimaryButton,
  MessageBar,
  MessageBarType,
  DefaultButton,
} from '@fluentui/react';
import {Button, Input, Text, Title} from '../common';
import {useAuth} from './AuthProvider';
import logger from '../../logger';

type Props = RouteComponentProps & {
  onSubmit: (params: any) => Promise<void>;
};
type State = {
  loading: boolean;
  email: string;
  password: string;
  error: any;
  redirect: string;
};

class Login extends React.Component<Props, State> {
  state: State = {
    loading: false,
    email: '',
    password: '',
    error: null,
    redirect: '/',
  };

  componentDidMount() {
    const {redirect = '/'} = qs.parse(this.props.location.search);

    this.setState({redirect: String(redirect)});
  }

  handleChangeEmail = (e: any) => {
    this.setState({email: e.target.value});
  };

  handleChangePassword = (e: any) => {
    this.setState({password: e.target.value});
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.setState({loading: true, error: null});
    const {email, password, redirect} = this.state;

    // TODO: handle login through API
    this.props
      .onSubmit({email, password})
      .then(() => this.props.history.push(redirect))
      .catch((err) => {
        logger.error('Error!', err);
        const error =
          err.response?.body?.error?.message || 'Invalid credentials';

        this.setState({error, loading: false});
      });
  };

  render() {
    const {location} = this.props;
    const {loading, email, password, error} = this.state;

    return (
      <Flex
        px={[2, 5]}
        py={5}
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{width: '100%', maxWidth: 320}}>
          <Title level={1}>Welcome back</Title>

          <form onSubmit={this.handleSubmit}>
            <Box mb={2}>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                size="large"
                type="email"
                autoComplete="username"
                value={email}
                onChange={this.handleChangeEmail}
              />
            </Box>

            <Box mb={2}>
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                size="large"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={this.handleChangePassword}
              />
            </Box>

            <Box mt={3}>
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Log in
              </Button>
            </Box>

            {error && (
              <Box mt={2}>
                <Text type="danger">{error}</Text>
              </Box>
            )}

            <Box mt={error ? 3 : 4}>
              Don't have an account?{' '}
              <Link to={`/register${location.search}`}>Sign up!</Link>
            </Box>
            <Box my={3}>
              <Link to="/reset-password">Forgot your password?</Link>
            </Box>
          </form>
        </Box>
      </Flex>
    );
  }
}

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

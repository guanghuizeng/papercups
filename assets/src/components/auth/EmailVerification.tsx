import React from 'react';
import {useLocation} from 'react-router-dom';
import qs from 'query-string';
import {Flex} from 'theme-ui';
import * as API from '../../api/api';

// Currently unused, but would like to introduce email verification for our users soon
export const EmailVerification = () => {
  const {search} = useLocation();
  const [isLoading, setLoading] = React.useState(true);
  const [isVerified, setVerified] = React.useState(false);
  const {token = ''} = qs.parse(search);

  React.useEffect(() => {
    if (!token || typeof token !== 'string') {
      setLoading(false);

      return;
    }

    API.verifyUserEmail(token)
      .then(() => setVerified(true))
      .catch(() => setVerified(false))
      .then(() => setLoading(false));
  }, [token]);

  if (isLoading) {
    return null;
  }

  return (
    <Flex my={5} sx={{justifyContent: 'center'}}>
      Email verification TODO
    </Flex>
  );
};

export default EmailVerification;

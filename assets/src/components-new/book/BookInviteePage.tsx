import React from 'react';
import {useLocation} from 'react-router-dom';

const BookInviteePage = () => {
  const {pathname} = useLocation();
  console.log('invitee page', pathname);

  return <div>{pathname}</div>;
};

export default BookInviteePage;

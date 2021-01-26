import React from 'react';
import {useParams} from 'react-router-dom';

export default function BookingPage() {
  const {user, slug} = useParams();

  // read scheduling link
  // - name
  // - description
  // - ...

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-72">
        <div>Name</div>
        <div>Description</div>
      </div>

      <div>Calendar</div>
    </div>
  );
}

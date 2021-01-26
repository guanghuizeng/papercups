import React from 'react';
import {useParams} from 'react-router-dom';
import BookingProvider, {useBooking} from './BookingProvider';

function GeneralSection() {
  const {userSlug, schedulingLinkId} = useBooking();
  return (
    <div>
      <div>{userSlug}</div>
      <div>{schedulingLinkId}</div>
      <div>Description</div>
    </div>
  );
}

function CalendarSection() {
  const {userSlug, schedulingLinkId} = useBooking();

  return <div>Calendar for {schedulingLinkId}</div>;
}

export default function BookingPage() {
  const {userSlug, schedulingLinkId} = useParams();

  // read scheduling link
  // - name
  // - description
  // - ...

  return (
    <BookingProvider userSlug={userSlug} schedulingLinkId={schedulingLinkId}>
      <div className="flex flex-row">
        <div className="flex flex-col w-72">
          <GeneralSection />
        </div>
        <div>
          <CalendarSection />
        </div>
      </div>
    </BookingProvider>
  );
}

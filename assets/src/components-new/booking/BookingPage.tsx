import React from 'react';
import {useParams} from 'react-router-dom';
import BookingProvider, {useBooking} from './BookingProvider';

function GeneralSection() {
  const {userSlug, schedulingLinkSlug} = useBooking();

  return (
    <div>
      <div>{userSlug}</div>
      <div>{schedulingLinkSlug}</div>
      <div>Description</div>
      <div>Organizer</div>
      <div>Durations</div>
      <div>Location</div>
      <div>Signed in as Yuanyuan Zhang</div>
    </div>
  );
}

function CalendarSection() {
  const {userSlug, schedulingLinkSlug} = useBooking();

  return <div>Calendar for {schedulingLinkSlug}</div>;
}

export default function BookingPage() {
  const {userSlug, schedulingLinkSlug} = useParams();

  // read scheduling link
  // - name
  // - description
  // - ...

  return (
    <BookingProvider
      userSlug={userSlug}
      schedulingLinkSlug={schedulingLinkSlug}
    >
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

import React from 'react';
import {useParams} from 'react-router-dom';
import BookingProvider, {useBooking} from './BookingProvider';

function GeneralSection() {
  const {user, schedulingLink} = useBooking();

  console.log('user', user, schedulingLink);

  return (
    <div>
      <div>{user?.display_name}</div>
      <div>{schedulingLink?.name}</div>
      <div>{schedulingLink?.description}</div>

      <div>{schedulingLink?.organizer.displayName}</div>
      <div>
        {schedulingLink?.durations.map((d: number) => {
          return <div key={d}>{d}</div>;
        })}
      </div>
      <div>{schedulingLink?.location}</div>
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

  console.log('userSlug', userSlug);

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

import React from 'react';
import {useParams} from 'react-router-dom';
import BookingProvider, {useBooking} from './BookingProvider';

function GeneralSection() {
  const {user, schedulingLink} = useBooking();

  console.log('user', user, schedulingLink);

  return (
    <div>
      <div>{schedulingLink?.organizer.displayName}</div>
      <div>{schedulingLink?.name}</div>
      <div>{schedulingLink?.name}</div>
      <div>{schedulingLink?.description}</div>

      <div>
        {schedulingLink?.durations.map((d: number) => {
          return <div key={d}>{d}</div>;
        })}
      </div>
      <div>{schedulingLink?.location}</div>

      <div>Signed in as {user?.display_name}</div>
    </div>
  );
}

function EventSection() {
  const {user, timeSelected, schedulingLink, setEventTime} = useBooking();

  return (
    <div className="pt-2">
      <div>
        <div>{schedulingLink?.organizer.displayName}</div>
        <div>{schedulingLink?.name}</div>
        <div>{schedulingLink?.name}</div>
        <div>{schedulingLink?.description}</div>

        <div>
          {schedulingLink?.durations.map((d: number) => {
            return <div key={d}>{d}</div>;
          })}
        </div>
        <div>{schedulingLink?.location}</div>

        <div>Start: {timeSelected?.start}</div>
        <div>End: {timeSelected?.end}</div>
      </div>

      <div className="pt-2">
        <div>联系人</div>
        <input
          className="border-primary border-solid border"
          placeholder=""
          type="text"
          id={'name'}
        />
      </div>
      <div className="pt-2">
        <div>Email</div>
        <input
          className="border-primary border-solid border"
          placeholder=""
          type="email"
          id={'email'}
        />
      </div>
      {schedulingLink?.fields && (
        <div>
          {schedulingLink.fields.map((field: any) => {
            return (
              <div key={field.id} className="pt-2">
                <label>{field.label}</label>
                <input
                  className="border-primary border-solid border"
                  placeholder=""
                  type="text"
                  id={field.id}
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-row pt-2">
        <div className="btn-draft">确定</div>
        <div className="btn-draft" onClick={() => {}}>
          取消
        </div>
      </div>
    </div>
  );
}

function CalendarMonthView() {
  return <div>Month view</div>;
}

function ControlSection() {
  const {timeSelected} = useBooking();
  return (
    <div className="flex flex-col w-72">
      <GeneralSection />
      <div className={'border-primary border-2 border-solid'} />
      <EventSection />
      <div className={'border-primary border-2 border-solid'} />
      <CalendarMonthView />
    </div>
  );
}

function CalendarSection() {
  const {setEventTime} = useBooking();

  return (
    <div>
      <div
        onClick={() => {
          setEventTime('2021-01-28T09:00:00', '2021-01-28T10:00:00');
        }}
      >
        Set time
      </div>
    </div>
  );
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
        <ControlSection />
        <div>
          <CalendarSection />
        </div>
      </div>
    </BookingProvider>
  );
}

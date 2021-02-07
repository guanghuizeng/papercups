import React from 'react';
import {useParams} from 'react-router-dom';
import ScheduledEventProvider, {
  useScheduledEvent,
} from '../hooks/ScheduledEventProvider';

export function ScheduledEventCard() {
  const {scheduledEvent} = useScheduledEvent();
  if (!scheduledEvent) {
    return <div>Loading</div>;
  }

  const title = '预约成功';
  const event = '产品咨询';
  const time = '时间';
  const attendee = '参与者';
  const location = '方式';

  return (
    <div>
      <div className="bg-white sm:rounded-xl border-b sm:border px-6 py-10 sm:p-12">
        <div className="flex items-center justify-center text-green-400">
          <svg width={76} height={76} xmlns="http://www.w3.org/2000/svg">
            <g
              transform="translate(2 2)"
              stroke="currentColor"
              strokeWidth={3}
              fill="none"
              fillRule="evenodd"
            >
              <circle cx={36} cy={36} r={36} />
              <path
                d="M52.982 24l-22.4 24.64L20.4 37.44"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
        <h1 className="pt-5 pb-4 text-center text-3xl text-gray-900 font-medium leading-10">
          {title}
        </h1>
        <p className="pb-8 border-b text-gray-600 text-center">
          {/*If you use Google Calendar, this event is already on your*/}
          {/*calendar! Otherwise, you can{' '}*/}
          {/*<a*/}
          {/*  className="underline hover:text-gray-800"*/}
          {/*  href="/events/48a01466-fd78-4c1d-966e-8edc7fb803c1/event.ics"*/}
          {/*>*/}
          {/*  download the invite*/}
          {/*</a>{' '}*/}
          {/*to manually add it to your calendar.*/}
        </p>
        <p></p>
        <dl className="grid grid-cols-4">
          <dt className="pt-6 font-bold text-gray-800"></dt>
          <dd className="pt-6 col-span-3 text-gray-700">{event}</dd>
          <dt className="pt-6 font-bold text-gray-800">{time}</dt>
          <dd
            className="pt-6 col-span-3 text-gray-700"
            x-data="{ startAt: '2021-02-06T08:00:00Z', endAt: '2021-02-06T08:30:00Z', timeZone: SavvyCal.guessTimeZone() }"
          >
            <span x-text="SavvyCal.formatTimeInZone(startAt, timeZone, 'dddd, MMMM D, YYYY')">
              Saturday, February 6, 2021
            </span>
            <br />
            <span x-text="SavvyCal.formatTimeInZone(startAt, timeZone, 'h:mm a')">
              4:00 pm
            </span>
            <span> – </span>
            <span x-text="SavvyCal.formatTimeInZone(endAt, timeZone, 'h:mm a (z)')">
              4:30 pm (CST)
            </span>
          </dd>
          <dt className="pt-6 font-bold text-gray-800">{attendee}</dt>
          <dd className="pt-6 col-span-3 text-gray-700">
            <ul className="space-y-3">
              <li>
                <div>Yuanyuan Zhang</div>
                <div className="text-gray-500 text-sm">gzwsed@gmail.com</div>
              </li>
              <li>
                <div>Yuanyuan Zhang</div>
                <div className="text-gray-500 text-sm">gzwsed@gmail.com</div>
              </li>
            </ul>
          </dd>
          <dt className="pt-6 font-bold text-gray-800">{location}</dt>
          <dd className="pt-6 col-span-3 text-gray-700">Google Meet </dd>
        </dl>
        <div x-data="{ open: false }" className="border-t mt-6 pt-6">
          <div className="text-gray-600 text-center" x-show="!open">
            This time no longer good?{' '}
            <button type="button" className="underline">
              Cancel
            </button>
          </div>
          <form
            action="/events/48a01466-fd78-4c1d-966e-8edc7fb803c1/cancel"
            style={{display: 'none'}}
          >
            <input
              name="_csrf_token"
              type="hidden"
              defaultValue="BRI_Y2xFPhIPSwFWJXgKPjNeUj1UA0MXrKeQ8-dvU-R9m1yaZjjn0F-_"
            />{' '}
            <div className="pb-3">
              <textarea
                className="form-input w-full"
                id="cancel_reason"
                name="cancel_reason"
                placeholder="Leave an optional note for the attendees."
                rows={3}
                x-ref="cancelReason"
                defaultValue={''}
              />{' '}
            </div>
            <div className="flex justify-start flex-row-reverse">
              <button className="btn btn-red ml-2" type="submit">
                Cancel the meeting
              </button>
              <button type="button" className="btn btn-gray">
                Nevermind
              </button>
            </div>
          </form>
        </div>
      </div>
      {/*<div className="py-8 flex justify-center">*/}
      {/*  <div className="h-10 flex flex-col justify-center items-start">*/}
      {/*    <a*/}
      {/*      href="/"*/}
      {/*      className="flex items-center text-gray-500"*/}
      {/*      target="_blank"*/}
      {/*    >*/}
      {/*      <div className="mr-2 p-px">*/}
      {/*        <svg*/}
      {/*          width={34}*/}
      {/*          height={34}*/}
      {/*          xmlns="http://www.w3.org/2000/svg"*/}
      {/*        >*/}
      {/*          <path*/}
      {/*            d="M13.85 1.31l.748-.132.73-.122c11.633-1.868 15.175.736 17.362 12.79l.067.376c2.227 12.628.006 16.182-12.594 18.466l-1.15.2c-12.182 2.025-15.498-.553-17.702-12.73l-.134-.76C-.933 7.074 1.652 3.521 13.849 1.31zm1.828 5.568c-2.42.427-4.17 1.539-5.178 3.154-.79 1.268-1.043 2.754-.814 3.958.497 2.621 2.641 4.283 6.97 4.648l.51.038c1.938.142 3.134.43 3.757.815.364.225.51.47.616 1.065.199 1.13-.682 2.153-2.998 2.56-1.531.27-3.165-.054-4.954-1.029a1.934 1.934 0 00-1.85 3.397c2.521 1.374 5.031 1.873 7.476 1.442 4.27-.753 6.738-3.62 6.135-7.042-.567-3.213-2.815-4.666-7.754-5.055l-.5-.036c-1.628-.125-2.648-.44-3.185-.844-.267-.2-.365-.376-.423-.68-.051-.27.033-.768.297-1.19.404-.649 1.191-1.15 2.567-1.392 1.22-.215 2.398-.008 3.606.649a1.934 1.934 0 101.847-3.399c-1.962-1.067-4.027-1.429-6.125-1.059z"*/}
      {/*            fill="currentColor"*/}
      {/*            fillRule="evenodd"*/}
      {/*          />*/}
      {/*        </svg>*/}
      {/*      </div>*/}
      {/*      <div className="text-base font-medium">*/}
      {/*        Scheduling by SavvyCal*/}
      {/*      </div>*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default function ScheduledEvent() {
  const {id: scheduledEventId} = useParams();

  /**
   * useScheduledEvent(scheduledEventId)
   */

  return (
    <div className="h-screen w-screen antialiased bg-gray-100 ">
      <div className="mx-auto sm:max-w-lg sm:py-12">
        <ScheduledEventProvider scheduledEventId={scheduledEventId}>
          <ScheduledEventCard />
        </ScheduledEventProvider>
      </div>
    </div>
  );
}

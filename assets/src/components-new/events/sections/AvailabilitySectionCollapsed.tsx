import React from 'react';
import {
  PERIOD_TYPE_AVAILABLE_MOVING,
  PERIOD_TYPE_FIXED,
  PERIOD_TYPE_MOVING,
  PERIOD_TYPE_UNLIMITED,
} from '../../constants';

function DateRangeDescription({periodType, maxBookingTime}: any) {
  switch (periodType) {
    case PERIOD_TYPE_MOVING:
    case PERIOD_TYPE_AVAILABLE_MOVING:
      if (maxBookingTime) {
        return <span>{maxBookingTime / 60 / 24} rolling days</span>;
      } else {
        return <span></span>;
      }
    case PERIOD_TYPE_FIXED:
    case PERIOD_TYPE_UNLIMITED:
      return <span>in construction</span>;
  }
  return <span />;
}

export default function AvailabilitySectionCollapsed({onOpen, eventType}: any) {
  return (
    <div
      data-section="availability"
      className="mt-2 border-b lg:border  hover:border-blue-500 border-black lg:rounded"
    >
      <div
        className="flex flex-row justify-between cursor-pointer"
        onClick={() => {
          onOpen();
        }}
      >
        <div className="flex flex-row p-2 ">
          <div className="px-3">
            <i className="far fa-calendar-check" />
          </div>
          <div>
            <div className="text-lg">When can people book this event?</div>
            <div className="text-gray-700">
              {eventType.duration} min,{' '}
              <DateRangeDescription
                periodType={eventType.period_type}
                maxBookingTime={eventType.max_booking_time}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

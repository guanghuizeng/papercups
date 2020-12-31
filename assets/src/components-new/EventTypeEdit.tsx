import React from 'react';
import EventGeneralSection from './events/EventGeneralSection';
import EventAvailabilitySection from './events/EventAvailabilitySection';
import EventInviteeQuestionsSection from './events/EventInviteeQuestionsSection';
import EventNotifyPolicy from './events/EventNotifyPolicy';
import {useQueryOne} from '../store';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {useEvents} from './EventsProvider';

function Header({eventType}: any) {
  return (
    <section className="text-gray-700 body-font">
      <div className="bg-white shadow">
        <div
          className="container inner-container mx-auto px-4 sm:px-6 lg:px-8"
          style={{paddingTop: '30px', paddingBottom: '30px'}}
        >
          <div className="flex flex-row justify-between">
            <Link to="/">
              <div className="border border-blue-300 p-2 cursor-pointer">
                Back
              </div>
            </Link>
            <div>Edit {eventType.typeName} Event Type</div>
            <div>Back</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventTypeEdit({id}: any) {
  const {eventTypes} = useEvents();

  console.log('Edit', eventTypes);
  const eventType = eventTypes.find((t) => t.id === id);

  // const eventType =

  return (
    <div>
      <Header eventType={eventType} />

      <section className="text-gray-700 body-font">
        <div className="container lg:px-10 inner-container mx-auto lg:px-8 py-4 flex flex-col">
          <div className="rounded-lg h-96">
            <div className="flex flex-row justify-between">
              <div className="text-sm">
                Last edited {dayjs(eventType.editAt).toString()}.
              </div>
              <Link to="/live">
                <a className="text-green-600">
                  <i className="fas fa-external-link-alt mr-2" />
                  view live page
                </a>
              </Link>
            </div>
            <div className="mb-10">
              <EventGeneralSection eventTypeId={id} />
              <EventAvailabilitySection eventTypeId={id} />
            </div>
            <div className="mt-4">
              <div className="mb-2">
                <strong>Additional Options</strong>
              </div>
              <EventInviteeQuestionsSection eventTypeId={id} />
              <EventNotifyPolicy eventTypeId={id} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventTypeEdit;

import * as React from 'react';
import EventTypeEdit from './EventTypeEdit';
import {Link, useParams} from 'react-router-dom';
import {useEvents} from './EventsProvider';
import Header from './events/Header';
import {GeneralSectionExpand} from './events/sections/GeneralSectionExpand';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import GeneralSectionCollapsed from './events/sections/GeneralSectionCollapsed';
import AvailabilitySectionExpand from './events/sections/AvailabilitySectionExpand';
import AvailabilitySectionCollapsed from './events/sections/AvailabilitySectionCollapsed';
import {useAuth} from '../components/auth/AuthProvider';
import InviteeQuestionsSection from './events/sections/InviteeQuestionsSection';
import NotifyPolicySection from './events/sections/NotifyPolicySection';

const EventType = () => {
  let {id} = useParams();
  const {eventTypesById, onUpdateEventType, fetchAllSchedules} = useEvents();
  const eventType = eventTypesById[id];
  const [focusStep, setFocusStep] = useState(-1);

  useEffect(() => {
    fetchAllSchedules().then((r) => {
      console.log('fetch schedules done', r);
    });
  }, []);

  const onSave = (value: any) => {
    onUpdateEventType(value.id, value).then((r) => {
      if (r) {
        console.log('On update event type', r);
      }
    });
  };

  const generalSection = () => {
    if (focusStep === 0) {
      return (
        <GeneralSectionExpand
          eventType={eventType}
          onClose={() => {
            setFocusStep(-1);
          }}
          onSave={onSave}
          saveButtonLabel="Save & Close"
        />
      );
    } else {
      return (
        <GeneralSectionCollapsed
          eventType={eventType}
          onOpen={() => {
            setFocusStep(0);
          }}
        />
      );
    }
  };

  const availabilitySection = () => {
    if (focusStep === 1) {
      return (
        <AvailabilitySectionExpand
          user={{
            active_availability_rule: 1,
            own_availability_rule: 1,
          }}
          eventType={eventType}
          onClose={() => {
            setFocusStep(-1);
          }}
          onSave={onSave}
          saveButtonLabel="Save & Close"
        />
      );
    } else {
      return (
        <AvailabilitySectionCollapsed
          eventType={eventType}
          onOpen={() => setFocusStep(1)}
        />
      );
    }
  };

  if (!eventType) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header eventType={eventType} />

      <div className="container lg:px-10 inner-container mx-auto lg:px-8 py-4 flex flex-col">
        <section>
          <div className="flex flex-row justify-between">
            <div className="text-sm">
              Last edited {dayjs(eventType.editAt).toString()}.
            </div>
            <Link to="/live" className="text-green-600">
              <i className="fas fa-external-link-alt mr-2" />
              view live page
            </Link>
          </div>
        </section>
        {generalSection()}
        {availabilitySection()}
        <div className="mt-4">
          <div className="mb-2">
            <strong>Additional Options</strong>
          </div>
          <InviteeQuestionsSection />
          <NotifyPolicySection />
        </div>
      </div>
    </div>
  );
};

export default EventType;

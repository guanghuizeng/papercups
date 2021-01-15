import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../../api';
import {EventGeneralEdit} from './EventGeneralSection';
import {GeneralSectionExpand} from './sections/GeneralSectionExpand';
import AvailabilitySectionExpand from './sections/AvailabilitySectionExpand';
import {
  PERIOD_TYPE_AVAILABLE_MOVING,
  PERIOD_TYPE_FIXED,
  PERIOD_TYPE_MOVING,
  PERIOD_TYPE_UNLIMITED,
} from '../constants';
import {useEvents} from '../EventsProvider';
import AvailabilitySectionCollapsed from './sections/AvailabilitySectionCollapsed';
import GeneralSectionCollapsed from './sections/GeneralSectionCollapsed';

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
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function NewEventType() {
  const {createEventType} = useEvents();
  const [created, setCreated] = useState(false);
  const [focusStep, setFocusStep] = useState(0);

  const saveGeneralSection = (value: any) => {
    console.log('Do saveGeneralSection', value);

    createEventType(value).then((r) => {
      // call api
      setFocusStep(1);
      setCreated(true);
      console.log('r');
    });
  };

  const generalSection = () => {
    if (focusStep === 0) {
      return (
        <GeneralSectionExpand
          eventType={{}}
          onClose={() => {
            setFocusStep(-1);
          }}
          onSave={(value: any) => {
            saveGeneralSection(value);
          }}
          saveButtonLabel="Next"
        />
      );
    } else {
      return (
        <GeneralSectionCollapsed
          eventType={{}}
          onOpen={() => {
            setFocusStep(0);
          }}
        />
      );
    }
  };

  const availabilitySection = () => {
    if (created) {
      if (focusStep === 1) {
        return (
          <AvailabilitySectionExpand
            user={{
              active_availability_rule: 1,
              own_availability_rule: 1,
            }}
            eventType={{}}
            onClose={() => {
              setFocusStep(-1);
            }}
            onSave={(value: any) => {
              console.log('On Save', value);
            }}
            saveButtonLabel="Next"
          />
        );
      } else {
        return (
          <AvailabilitySectionCollapsed
            eventType={{}}
            editing={false}
            setEditing={() => {
              setFocusStep(1);
            }}
          />
        );
      }
    }
    return <></>;
  };

  return (
    <div className="container lg:px-10 inner-container mx-auto lg:px-8 py-4 flex flex-col">
      <div className="h-6">
        <Link to="/links">
          <span className="inline-block hover:underline">
            {' '}
            <i className="fas fa-chevron-left mr-2" />
            返回所有日程类型
          </span>
        </Link>
      </div>
      <div className="py-4 text-3xl font-medium">新建日程类型</div>

      <section className="pt-10 text-gray-700 body-font">
        {generalSection()}
        {availabilitySection()}
      </section>
    </div>
  );
}

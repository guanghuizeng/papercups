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
            console.log('close');
          }}
          onSave={(value: any) => {
            saveGeneralSection(value);
          }}
          saveButtonLabel="Next"
        />
      );
    } else {
      return (
        <div
          className={`mt-2 lg:border  hover:border-black border-gray-500 lg:rounded `}
        >
          <div
            className="flex flex-row justify-between cursor-pointer"
            onClick={() => {
              setFocusStep(0);
            }}
          >
            <div className="flex flex-row p-2 ">
              <div className="px-3">
                <i className="fas fa-circle text-red-500" />
              </div>
              <div>
                <div className="text-lg">What event is this?</div>
                <div className="text-gray-700">{'xx'}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const availabilitySection = () => {
    if (created) {
      if (focusStep === 1) {
        return (
          <div
            className={`mt-2 lg:border  hover:border-black border-gray-500 lg:rounded `}
          >
            <AvailabilitySectionExpand
              user={{
                active_availability_rule: 1,
                own_availability_rule: 1,
              }}
              eventType={{}}
              onClose={() => {
                console.log('close');
              }}
              onSave={(value: any) => {
                console.log('On Save', value);
              }}
              saveButtonLabel="Next"
            />
          </div>
        );
      } else {
        return (
          <div
            className={`mt-2 border-b lg:border  hover:border-blue-500 border-black lg:rounded `}
          >
            <AvailabilitySectionCollapsed
              eventType={{}}
              editing={false}
              setEditing={() => {
                setFocusStep(1);
              }}
            />
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <div>
      <Header eventType={{}} />

      <div
        onClick={() => {
          API.fetchEventTypes().then((r) => {
            console.log('Fetch all', r);
          });
        }}
      >
        Fetch
      </div>

      <section className="text-gray-700 body-font">
        <div className="container inner-container px-5 py-4 mx-auto flex flex-wrap flex-col">
          {generalSection()}
          {availabilitySection()}
        </div>
      </section>
    </div>
  );
}

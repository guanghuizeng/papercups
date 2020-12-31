import React from 'react';
import {Link} from 'react-router-dom';
import {EventGeneralEdit} from './EventGeneralSection';
import {GeneralSection} from './edit/GeneralSection';
import AvailabilitySection from './edit/AvailabilitySection';

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
  return (
    <div>
      <Header eventType={{}} />

      <section className="text-gray-700 body-font">
        <div className="container inner-container px-5 py-4 mx-auto flex flex-wrap flex-col">
          <div
            className={`mt-2 lg:border  hover:border-black border-gray-500 lg:rounded `}
          >
            <GeneralSection
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
          <div
            className={`mt-2 lg:border  hover:border-black border-gray-500 lg:rounded `}
          >
            <AvailabilitySection
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
        </div>
      </section>
    </div>
  );
}

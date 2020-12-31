import {Link} from 'react-router-dom';
import * as React from 'react';

export default function Header({eventType}: any) {
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
            <div>Edit {eventType.name} Event Type</div>
            <div>Back</div>
          </div>
        </div>
      </div>
    </section>
  );
}

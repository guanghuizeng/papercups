import React from 'react';
import {Link, useLocation} from 'react-router-dom';

export default function NavSection() {
  const {pathname} = useLocation();
  return (
    <section className="text-gray-700 body-font">
      <div className="shadow-lg">
        <div className="container mx-auto inner-container flex px-5 pt-4 flex-col ">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 ">
            <h1 className="my-3 text-3xl font-bold leading-tight text-gray-900">
              My time
            </h1>
            <div className="flex flex-row">
              <Link to="/">
                <div
                  className={`pt-2 pr-4 cursor-pointer ${
                    pathname === '/' ? 'border-b-4 border-green-600' : ''
                  }`}
                >
                  Event Types
                </div>
              </Link>
              <Link to="/scheduled_events">
                <div
                  className={`pt-2 pr-4 cursor-pointer ${
                    pathname === '/scheduled_events'
                      ? 'border-b-4 border-green-600'
                      : ''
                  }`}
                >
                  Scheduled Events
                </div>
              </Link>
              <Link to="/workflows">
                <div
                  className={`pt-2 pr-4 cursor-pointer ${
                    pathname === '/workflows'
                      ? 'border-b-4 border-green-600'
                      : ''
                  }`}
                >
                  Workflows
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

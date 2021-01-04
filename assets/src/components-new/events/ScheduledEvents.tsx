import React from 'react';
import {Switch, Route, Link, useLocation} from 'react-router-dom';
import {DefaultButton} from '@fluentui/react';

export default function ScheduledEvents() {
  const {pathname} = useLocation();

  return (
    <div className="container lg:px-10 inner-container mx-auto lg:px-8 py-4 flex flex-col">
      <div className="mt-6 py-4 text-3xl font-medium">日程</div>

      <div className="pt-10">
        <div className="flex flex-row justify-between border-b border-primary border-solid">
          <div className="flex flex-row">
            {[
              {url: '/events/all', name: 'All'},
              {url: '/events/upcoming', name: 'Upcoming'},
              {url: '/events/past', name: 'Past'},
              {url: '/events/date_range', name: 'Date Range'},
            ].map(({url, name}) => {
              return (
                <div className=" px-2 cursor-pointer" key={url}>
                  {pathname === url ? (
                    <div className="gentle-flex border-b-4 border-blue-300 border-solid py-1 w-24">
                      <span>{name}</span>
                    </div>
                  ) : (
                    <Link to={url}>
                      <span className="gentle-flex w-24 py-1 ">{name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          {/*<Default*/}
          <DefaultButton text="Filters" />
          {/*<div>Filters</div>*/}
        </div>

        <div className="pt-5">
          <Switch>
            <Route path="/events/all" component={() => <div>all</div>} />
            <Route
              path="/events/upcoming"
              component={() => <div>upcoming</div>}
            />
            <Route path="/events/past" component={() => <div>past</div>} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

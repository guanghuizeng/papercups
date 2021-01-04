import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

export default function ScheduledEvents() {
  return (
    <div className="container lg:px-10 inner-container mx-auto lg:px-8 py-4 flex flex-col">
      <div className="mt-6 py-4 text-3xl font-medium">日程</div>

      <div className="pt-10">
        <div className="flex flex-col">
          <Link to="/events/all">all</Link>
          <Link to="/events/upcoming">upcoming</Link>
          <Link to="/events/past">past</Link>
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

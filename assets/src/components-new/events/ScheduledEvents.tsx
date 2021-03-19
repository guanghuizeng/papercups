import React, {useEffect, useState} from 'react';
import {Switch, Route, Link, useLocation, Redirect} from 'react-router-dom';
import {DefaultButton} from '@fluentui/react';
import {useEvents} from '../EventsProvider';
import {days} from '../book/data';
import dayjs from 'dayjs';
import moment from 'moment';
import {SearchBoxSmallExample} from '../EventTypes';
import ScheduledEventsProvider, {
  useScheduledEvents,
} from '../../hooks/ScheduledEventsProvider';
import NavSidebar from '../NavSidebar';
var weekOfYear = require('dayjs/plugin/weekOfYear');
dayjs.extend(weekOfYear);

function EventCard() {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="border-primary border-solid border flex flex-row justify-between w-full h-24"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="my-2 p-4 flex flex-row justify-between"
        style={{width: 'calc(100% - 10px)'}}
      >
        <div className="w-1/2">09:30 - 09:45</div>
        <div className="w-1/2">
          <div>张三</div>
          <div className="text-gray-500">30 分钟约见</div>
        </div>
      </div>
      <div className="h-full w-8">
        {hovered && (
          <div className="cursor-pointer opacity-25 hover:opacity-100 h-full bg-red-300 gentle-flex">
            <i className="fas fa-expand-alt fa-sm" />
          </div>
        )}
      </div>
    </div>
  );
}

function NextEventCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="border-red-300 border-solid border flex flex-row justify-between w-full h-24"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="my-2 p-4 flex flex-row justify-between"
        style={{width: 'calc(100% - 10px)'}}
      >
        <div className="w-1/2">09:30 - 09:45</div>
        <div className="w-1/2">
          <div>张三</div>
          <div className="text-gray-500">30 分钟约见</div>
        </div>
      </div>
      <div className="h-full w-8">
        {hovered && (
          <div className="cursor-pointer opacity-25 hover:opacity-100 h-full bg-red-300 gentle-flex">
            <i className="fas fa-expand-alt fa-sm" />
          </div>
        )}
      </div>
    </div>
  );
}

function UpcomingScheduledEvents() {
  const {scheduledEvents} = useScheduledEvents();
  console.log('scheduledEvents', scheduledEvents);

  return (
    <div className="w-full flex flex-col">
      <ul>
        <li className="px-6 py-3 border-b grid grid-cols-10 gap-4 hover:bg-gray-50 transition ease-in-out duration-150 text-sm">
          <div className="text-gray-700 col-span-2 lg:col-span-1">
            Thu, Feb 11
          </div>
          <div className="text-gray-700 col-span-4 lg:col-span-2">
            12:00 pm – 2:00 pm
          </div>
          <div className="col-span-4 lg:col-span-6 text-sm leading-5">
            <div className="pb-1 flex items-center">
              <div className="pr-2">
                <span className="inline-flex flex-shrink-0 items-center justify-center h-5 w-5  rounded-full text-white ring-2 ring-white bg-gray-500 select-none">
                  <span className="text-xxs font-medium leading-none">YZ</span>
                </span>
              </div>
              <a
                href="/events/b3a6b143-5493-48d2-aefd-689570e22b5a"
                className="text-gray-900 font-bold mr-2 leading-5 hover:underline truncate transition ease-in-out duration-150"
              >
                Chat with Yuanyuan
              </a>
            </div>
            <div className="ml-7 text-gray-600 truncate">
              Yuanyuan Zhang and Yuanyuan Zhang
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default function ScheduledEvents() {
  const {pathname} = useLocation();

  return (
    <div className="w-full flex flex-row">
      <NavSidebar />

      <ScheduledEventsProvider>
        <div className="h-full w-full flex flex-col">
          <div className="Header bg-gray-100">
            <div className="flex flex-row">
              <div className="gentle-flex py-1 w-24">
                <div className="font-bold">日程</div>
              </div>

              {[
                {url: '/events/upcoming', name: '待完成'},
                {url: '/events/past', name: '已完成'},
                {url: '/events/canceled', name: '已取消'},
                // {url: '/events/all', name: '全部'},
              ].map(({url, name}) => {
                return (
                  <div className="px-2 cursor-pointer" key={url}>
                    {pathname === url ? (
                      <div className="gentle-flex py-1 w-24">
                        <span>{name}</span>
                      </div>
                    ) : (
                      <Link to={url}>
                        <span className="gentle-flex w-24 py-1 opacity-25 hover:opacity-100">
                          {name}
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row">
              <div className="gentle-flex py-1 w-24 opacity-25 hover:opacity-100 cursor-pointer">
                日历
              </div>
            </div>
          </div>
          <div className="h-full">
            <Switch>
              <Route
                path="/events/upcoming"
                component={UpcomingScheduledEvents}
              />
              <Route path="/events/past" component={() => <div>past</div>} />
              <Route
                path="/events/canceled"
                component={() => <div>canceled</div>}
              />
              <Route path="/events/all" component={() => <div>all</div>} />
              <Route path="/events">
                <Redirect to="/events/upcoming" />
              </Route>
            </Switch>
          </div>
        </div>
      </ScheduledEventsProvider>
    </div>
  );
}

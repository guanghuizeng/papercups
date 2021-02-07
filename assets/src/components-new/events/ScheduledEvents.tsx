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
    <div className="h-full grid grid-cols-4 gap-px bg-gray-100">
      <div className="h-full bg-white pt-10 px-3" style={{}}>
        <div className="flex flex-row justify-between">
          <div className="gentle-flex text-5xl font-medium">今天</div>
          <div className="gentle-flex text-base">
            {moment().format('dddd, M[月]DD[日] HH:mm ')}
          </div>
        </div>
        <div className="flex flex-col  pt-5">
          <div className="pb-8">
            <div className="flex flex-row justify-between ">
              <span />
              <div className="mr-4 opacity-50">3</div>
            </div>
            <NextEventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
      <div className="bg-white pt-5 px-3" style={{}}>
        <div className="">
          <div className="text-2xl pb-2 font-medium">本周</div>
          <div className="flex flex-row justify-between">
            <div className="text-base">
              {dayjs().format('M 月')} {dayjs().startOf('week').format('D')} -{' '}
              {dayjs().endOf('week').format('D')} 日, 第 {moment().week()} / 52
              周
            </div>
            <div className="flex flex-row">
              {['一', '二', '三', '四', '五', '六', '日'].map((d) => {
                return (
                  <div key={d} className="mr-2 opacity-75">
                    {d === '四' || d === '五' ? (
                      <div className="cursor-pointer">
                        <span className="">{d}</span>
                        <div
                          className="w-full gentle-flex rounded-full bg-red-400"
                          style={{height: '2px'}}
                        />
                      </div>
                    ) : (
                      <span className="opacity-50">{d}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-5">
          <div className="pb-8">
            <div className="flex flex-row justify-between">
              <div>星期四，1 月 14</div>
              <div className="mr-4  opacity-50">2</div>
            </div>
            <EventCard />
            <EventCard />
          </div>
          <div className="pb-8">
            <div className="flex flex-row justify-between ">
              <div>星期五，1 月 15</div>
              <div className="mr-4 opacity-50">1</div>
            </div>
            <EventCard />
          </div>
        </div>
      </div>
      <div className="bg-white pt-5 p-3" style={{}}>
        <div>
          <div className="text-2xl pb-2 font-medium">1 月</div>
          <div className="flex flex-row justify-between">
            <span />
            <div className="opacity-75 cursor-pointer">日期</div>
          </div>
        </div>
        <div className="flex flex-col pt-5">
          <div className="pb-8">
            <div className="flex flex-row justify-between ">
              <div>1 月 17，星期日</div>
              <div className="mr-4 opacity-50">2</div>
            </div>
            <EventCard />
            <EventCard />
          </div>
          <div className="pb-8">
            <div className="flex flex-row justify-between ">
              <div>1 月 18，星期五</div>
              <div className="mr-4 opacity-50">1</div>
            </div>
            <EventCard />
          </div>
        </div>
      </div>
      <div className="bg-white pt-5 p-2" style={{}}>
        <div className="text-2xl pb-2 font-medium">2021 年</div>
        <div className="flex flex-col pt-5">
          <div className="my-2">
            <div>2 月</div>
            <div>
              <div>2 月 1，星期日</div>
              <EventCard />
              <EventCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScheduledEvents() {
  const {pathname} = useLocation();

  return (
    <ScheduledEventsProvider>
      <div className="h-full w-full flex flex-col">
        <div className="Header">
          <div className="flex flex-row">
            {[
              {url: '/events/upcoming', name: '待完成'},
              {url: '/events/past', name: '已完成'},
              {url: '/events/canceled', name: '已取消'},
              {url: '/events/all', name: '全部'},
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
            <div className="gentle-flex py-1 w-24 cursor-pointer">Horizons</div>
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
  );
}

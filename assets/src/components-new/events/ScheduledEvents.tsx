import React, {useEffect} from 'react';
import {Switch, Route, Link, useLocation} from 'react-router-dom';
import {DefaultButton} from '@fluentui/react';
import {useEvents} from '../EventsProvider';
import {days} from '../book/data';
import dayjs from 'dayjs';
import moment from 'moment';

function EventCard() {
  return (
    <div className="my-2 py-2 border-primary border-solid border">
      <div className="flex flex-row justify-between">
        <div>09:30 - 09:45</div>
        <div>
          <div>张三</div>
          <div className="text-gray-500">30 分钟约见</div>
        </div>
        <div className="text-gray-500">详情</div>
      </div>
    </div>
  );
}

function UpcomingScheduledEvents() {
  return (
    <div className="grid grid-cols-4 gap-1 bg-gray-100">
      <div className="bg-white pt-10 px-3" style={{}}>
        <div className="flex flex-row justify-between">
          <div className="gentle-flex text-3xl font-medium">今天</div>
          <div className="gentle-flex text-sm">
            {moment().format('dddd, M[月]DD[日] HH:mm ')}
          </div>
        </div>
        <div className="flex flex-col">
          <EventCard />
        </div>
      </div>
      <div className="bg-white pt-5 px-3" style={{}}>
        <div>
          <div className="text-xl font-medium">本周</div>
          <div className="text-sm">11 - 17，1 月</div>
        </div>
        <div className="flex flex-col">
          <div className="my-2 border-red-300 border-solid border">
            <div>星期四，1 月 14</div>
            <EventCard />
            <EventCard />
          </div>
          <div>
            <div>星期五，1 月 15</div>
            <EventCard />
          </div>
        </div>
      </div>
      <div className="bg-white pt-5 p-3" style={{}}>
        <div>
          <div className="text-xl font-medium">1 月</div>
        </div>
        <div className="flex flex-col">
          <div className="my-2 border-red-300 border-solid border">
            <div>1 月 17，星期日</div>
            <EventCard />
            <EventCard />
          </div>
          <div>
            <div>1 月 18，星期五</div>
            <EventCard />
          </div>
        </div>
      </div>
      <div className="bg-white pt-5 p-2" style={{}}>
        <div className="text-xl font-medium">2021 年</div>
        <div className="flex flex-col">
          <div className="my-2 border-red-300 border-solid border">
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
  const {scheduledEvents, fetchScheduledEvents} = useEvents();

  useEffect(() => {
    fetchScheduledEvents().then((r) => {});
  }, []);

  return (
    <div className="mx-auto  py-4 flex flex-col">
      <div className="pt-5">
        <div className="flex flex-row justify-between border-b border-primary border-solid">
          <div className="flex flex-row">
            {[
              {url: '/events/upcoming', name: '待完成'},
              {url: '/events/past', name: '已完成'},
              {url: '/events/all', name: '全部'},
            ].map(({url, name}) => {
              return (
                <div className=" px-2 cursor-pointer" key={url}>
                  {pathname === url ? (
                    <div className="gentle-flex py-1 w-24">
                      <span>{name}</span>
                    </div>
                  ) : (
                    <Link to={url}>
                      <span className="gentle-flex w-24 py-1 opacity-25 ">
                        {name}
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <DefaultButton text="Filters" />
        </div>

        <div className="">
          <Switch>
            <Route
              path="/events/upcoming"
              component={UpcomingScheduledEvents}
            />
            <Route path="/events/past" component={() => <div>past</div>} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

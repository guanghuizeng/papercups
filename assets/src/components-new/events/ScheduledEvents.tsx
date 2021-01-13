import React, {useEffect} from 'react';
import {Switch, Route, Link, useLocation} from 'react-router-dom';
import {DefaultButton} from '@fluentui/react';
import {useEvents} from '../EventsProvider';

function UpcomingScheduledEvents() {
  return (
    <div className="grid grid-cols-4 gap-2 bg-red-300">
      <div className="bg-white" style={{}}>
        <div>
          <div className="text-xl font-medium">今天</div>
          <div className="text-sm">星期三，1月13日</div>
        </div>
        <div className="flex flex-col">
          <div className="my-2 py-2 border-primary border-solid border">
            <div>09:30 - 09:45</div>
            <div>张三</div>
            <div>30 分钟约见</div>
            <div>详情</div>
          </div>
        </div>
      </div>
      <div className="bg-white" style={{}}>
        <div>
          <div className="text-xl font-medium">本周</div>
          <div className="text-sm">11 - 17，1 月</div>
        </div>
        <div className="flex flex-col">
          <div className="my-2 border-red-300 border-solid border">
            <div>星期四，1 月 14</div>
            <div className="my-2 py-2 border-primary border-solid border">
              <div>09:30 - 09:45</div>
              <div>张三</div>
              <div>30 分钟约见</div>
              <div>详情</div>
            </div>
            <div className="my-2 py-2 border-primary border-solid border">
              <div>09:30 - 09:45</div>
              <div>张三</div>
              <div>30 分钟约见</div>
              <div>详情</div>
            </div>
          </div>
          <div>
            <div>星期五，1 月 15</div>
            <div className="my-2 py-2 border-primary border-solid border">
              <div>09:30 - 09:45</div>
              <div>张三</div>
              <div>30 分钟约见</div>
              <div>详情</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white" style={{}}>
        <div>
          <div className="text-xl font-medium">1 月</div>
        </div>
        <div className="flex flex-col">
          <div className="my-2 border-red-300 border-solid border">
            <div>1 月 17，星期日</div>
            <div className="my-2 py-2 border-primary border-solid border">
              <div>09:30 - 09:45</div>
              <div>张三</div>
              <div>30 分钟约见</div>
              <div>详情</div>
            </div>
            <div className="my-2 py-2 border-primary border-solid border">
              <div>09:30 - 09:45</div>
              <div>张三</div>
              <div>30 分钟约见</div>
              <div>详情</div>
            </div>
          </div>
          <div>
            <div>1 月 18，星期五</div>
            <div className="my-2 py-2 border-primary border-solid border">
              <div>09:30 - 09:45</div>
              <div>张三</div>
              <div>30 分钟约见</div>
              <div>详情</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white" style={{}}>
        <div className="text-xl font-medium">2021 年</div>
        <div className="flex flex-col">
          <div className="my-2 border-red-300 border-solid border">
            <div>2 月</div>
            <div>
              <div>2 月 1，星期日</div>
              <div className="my-2 py-2 border-primary border-solid border">
                <div>09:30 - 09:45</div>
                <div>张三</div>
                <div>30 分钟约见</div>
                <div>详情</div>
              </div>
              <div className="my-2 py-2 border-primary border-solid border">
                <div>09:30 - 09:45</div>
                <div>张三</div>
                <div>30 分钟约见</div>
                <div>详情</div>
              </div>
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
    <div className=" lg:px-10  mx-auto lg:px-8 py-4 flex flex-col">
      <div className="header mt-6 py-4 text-3xl font-medium">预约</div>

      <div className="pt-10">
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
          <DefaultButton text="Filters" />
        </div>

        <div className="pt-5">
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

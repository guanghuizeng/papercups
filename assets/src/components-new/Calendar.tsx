import React, {useState} from 'react';
import FullCalendar, {
  DateSelectArg,
  DayHeaderContentArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs, {Dayjs} from 'dayjs';
import {
  createEventId,
  eliminateIntervals,
  INITIAL_EVENTS,
  complementIntervals,
} from './event-utils';
import _ from 'lodash';
import zhLocale from '@fullcalendar/core/locales/zh-cn';

require('dayjs/locale/zh-cn');
var isToday = require('dayjs/plugin/isToday');

dayjs.extend(isToday);
dayjs.locale('zh-cn');

function Calendar() {
  const [overrides, setOverrides] = useState<any[]>([
    {
      startAt: '2021-01-19T02:00:00Z',
      endAt: '2021-01-19T07:00:00Z',
      type: 'block',
    },
    {
      startAt: '2021-01-18T02:00:00Z',
      endAt: '2021-01-18T08:00:00Z',
      type: 'block',
    },
    {
      startAt: '2021-01-23T02:00:00Z',
      endAt: '2021-01-23T08:00:00Z',
      type: 'allow',
    },
  ]);

  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);

  const handleWeekendsToggle = () => {
    // this.setState({
    //   weekendsVisible: !weekendsVisible
    // })
  };

  const handleSelectAllow = () => {
    if (selectInfo) {
      console.log('handleAllowSelect', selectInfo);
      const copy = _.cloneDeep(overrides);
      copy.push({
        startAt: selectInfo.startStr,
        endAt: selectInfo.endStr,
        type: 'allow',
      });
      setOverrides(copy);
    }
  };

  const handleSelectBlock = () => {
    if (selectInfo) {
      console.log('handleSelectBlock', selectInfo);
      const copy = _.cloneDeep(overrides);
      copy.push({
        startAt: selectInfo.startStr,
        endAt: selectInfo.endStr,
        type: 'block',
      });
      setOverrides(copy);
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // let title = prompt('Please enter a new title for your event')
    let title = 'new event';
    let calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect() // clear date selection

    console.log('select', selectInfo);

    setSelectInfo(selectInfo);

    // console.log('select', selectInfo.endStr, dayjs(selectInfo.end).subtract(15, 'minutes').toISOString())

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     // end: dayjs(selectInfo.end).subtract(15, 'minutes').toISOString(),
    //     allDay: selectInfo.allDay
    //   })
    // }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //     clickInfo.event.remove()
    // }
  };

  const handleEvents = (events: EventApi[]) => {
    // this.setState({
    //   currentEvents: events
    // })
  };

  const renderDayHeaderContent = (props: DayHeaderContentArg) => {
    const date = dayjs(props.date);
    return (
      <div>
        {
          // @ts-ignore
          date.isToday() ? (
            <>
              <div className="text-xs font-medium text-gray-600">
                {date.format('ddd')}
              </div>
              <div className="mb-2 flex justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full text-2xl bg-indigo-600 text-white font-bold">
                  {date.format('D')}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-xs font-medium text-gray-600">
                {date.format('ddd')}
              </div>
              <div className="mb-2 flex justify-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full text-2xl text-gray-700 font-medium">
                  {date.format('D')}
                </div>
              </div>
            </>
          )
        }
      </div>
    );
  };

  /**
   *
   */
  const getBackgroundEvents = () => {
    const startDate = dayjs('2021-01-18T00:00:00');
    const endDate = startDate.add(14, 'day');
    const intervalSettings = [
      {
        byday: ['一', '二', '三', '四', '五'],
        endTime: 1020,
        startTime: 540,
      },
      {
        byday: ['一', '二'],
        endTime: 1080,
        startTime: 720,
      },
      {
        byday: ['一', '二', '三', '四', '五'],
        endTime: 1380,
        startTime: 1200,
      },
    ];

    const allowOverrides = overrides.filter((e: any) => e.type === 'allow');
    const blockOverrides = overrides.filter((e: any) => e.type === 'block');

    console.log('allow', allowOverrides);

    // get intervals
    const intervals: Dayjs[][] = [];
    let date = startDate.clone();
    while (!date.isSame(endDate)) {
      const day = date.format('dd').toLowerCase();
      intervalSettings.forEach((settings) => {
        if (settings.byday.findIndex((d) => d === day) > -1) {
          let startTime = date.add(settings.startTime, 'minute');
          let endTime = date.add(settings.endTime, 'minute');
          intervals.push([startTime, endTime]);
        }
      });
      date = date.add(1, 'day');
    }

    // overrides intervals
    // push allow overrides
    allowOverrides.forEach((override) => {
      intervals.push([dayjs(override.startAt), dayjs(override.endAt)]);
    });
    const sortedIntervals = _.sortBy(intervals, (e) => e[0].valueOf());
    const eliminatedIntervals = eliminateIntervals(sortedIntervals);

    const complementedIntervals = complementIntervals(
      startDate,
      endDate,
      eliminatedIntervals
    );
    // push block overrides
    blockOverrides.forEach((override) => {
      complementedIntervals.push([
        dayjs(override.startAt),
        dayjs(override.endAt),
      ]);
    });
    const sortedIntervals2 = _.sortBy(complementedIntervals, (e) =>
      e[0].valueOf()
    );
    const eliminatedIntervals2 = eliminateIntervals(sortedIntervals2);

    // sort
    // eliminate

    // console.log('sortedIntervals', JSON.stringify(sortedIntervals))
    // console.log('eliminatedIntervals', JSON.stringify(eliminatedIntervals))
    // console.log('complementedIntervals', JSON.stringify(complementedIntervals))

    const res = eliminatedIntervals2.map((interval) => {
      return {
        id: createEventId(),
        start: interval[0].toISOString(),
        end: interval[1].toISOString(),
        className: 'sc-unavailable',
        display: 'background',
      };
    });

    // console.log('Background events', JSON.stringify(res))

    return res;
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          // height="800px"
          contentHeight="900px"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek',
          }}
          weekNumberCalculation="ISO"
          initialView="timeGridWeek"
          slotDuration="00:30:00"
          snapDuration="00:15:00"
          slotLabelInterval="01:00"
          slotMinTime="06:00:00"
          dayHeaderContent={renderDayHeaderContent}
          editable={true}
          selectable={true}
          allDaySlot={false}
          // dayMaxEvents={true}
          weekends={true}
          events={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          eventSources={[
            {
              events: getBackgroundEvents(),
              display: 'background',
            },
          ]}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          // eventClick={this.handleEventClick}
          // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          dateClick={function (info) {
            // alert('clicked ' + info.dateStr);
          }}
          nowIndicator={true}
          /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
          locale={zhLocale}
        />
      </div>

      <div className=" pb-4 bottom-0 w-full flex justify-center">
        <div className="relative transition-all transform rounded-lg shadow-floating bg-white z-10">
          <div className="flex p-1">
            <button
              type="button"
              onClick={handleSelectAllow}
              className="w-32 p-3 rounded-md flex flex-col items-center text-green-600 font-medium text-sm bg-white hover:bg-gray-100 active:bg-gray-200 transition ease-in-out duration-150"
            >
              <div className="-ml-px pb-1 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-plus-square"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="16"
                    stroke="currentColor"
                  ></line>
                  <line
                    x1="8"
                    y1="12"
                    x2="16"
                    y2="12"
                    stroke="currentColor"
                  ></line>
                </svg>
              </div>
              <div>Allow</div>
            </button>
            <button
              type="button"
              className="w-32 p-3 rounded-md flex flex-col items-center text-green-600 font-medium text-sm bg-white hover:bg-gray-100 active:bg-gray-200 transition ease-in-out duration-150"
            >
              <div className="-ml-px pb-1 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-plus-square"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16" stroke="#FFF"></line>
                  <line x1="8" y1="12" x2="16" y2="12" stroke="#FFF"></line>
                </svg>
              </div>
              <div>Force Allow</div>
            </button>
            <button
              type="button"
              onClick={handleSelectBlock}
              className="w-32 p-3 rounded-md flex flex-col items-center text-red-600 font-medium text-sm bg-white hover:bg-gray-100 active:bg-gray-200 transition ease-in-out duration-150"
            >
              <div className="-ml-px pb-1 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-x-square"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="#FFF"></line>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="#FFF"></line>
                </svg>
              </div>
              <div>Block</div>
            </button>
          </div>
          <button
            className="absolute flex items-center justify-center w-8 h-8 rounded-full shadow-floating bg-white hover:bg-gray-100 active:bg-gray-200 transition ease-in-out duration-150 border-2 border-white text-gray-500"
            style={{right: '-12px; top: -12px'}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      {/* <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i> */}
    </>
  );
}

export default Calendar;

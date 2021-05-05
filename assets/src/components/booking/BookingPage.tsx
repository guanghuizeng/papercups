import React, {useState, Fragment, RefObject} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import BookingProvider, {useBooking} from './BookingProvider';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import FullCalendar, {DayHeaderContentArg, EventApi} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {complementIntervals, createEventId} from '../event-utils';
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import dayjs, {Dayjs} from 'dayjs';
import {Button, Input, Text} from '@geist-ui/react';
import humanizeDuration from 'humanize-duration';
import {colourOptions} from '../constants';
import {nanoid} from 'nanoid';
import * as API from '../../api/api';
import {EventInput} from '@fullcalendar/common';
import {EMAIL, USERNAME} from '../../const';

var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);
dayjs().format('L LT');

function GeneralSection() {
  const {user, schedulingLink, eventDuration, setEventDuration} = useBooking();

  return (
    <div date-section="control" className="flex flex-col">
      <div className="px-4 pt-8">
        <h2 className="text-2xl">{schedulingLink?.name}</h2>
        <p className="pt-4">{schedulingLink?.description}</p>
      </div>

      <div
        className="px-2 pt-8 pr-4 py-2 grid gap-x-1 gap-y-6"
        style={{gridTemplateColumns: '30px auto'}}
      >
        <Fragment>
          <span className="w-full gentle-flex">
            <i className="fas fa-user-alt " />
          </span>
          <span>{schedulingLink?.organizer.displayName}</span>
        </Fragment>

        <Fragment>
          <span className="w-full gentle-flex">
            <i className="fas fa-clock" />
          </span>
          <div className="flex flex-row flex-wrap">
            {schedulingLink?.durations.map((d: number) => {
              const durationDisplay = humanizeDuration(d * 60 * 1000, {
                units: ['h', 'm'],
                language: 'zh_CN',
              });

              return (
                <div key={d} className="mt-1 mr-1">
                  <Button
                    onClick={() => {
                      setEventDuration(d);
                    }}
                    type={d === eventDuration ? 'success' : 'default'}
                    size="mini"
                  >
                    {durationDisplay}
                  </Button>
                </div>
              );
            })}
          </div>
        </Fragment>

        <Fragment>
          <span className="w-full gentle-flex">
            <i className="fas fa-video" />
          </span>
          <span>
            {schedulingLink?.location &&
              colourOptions.find((opt) => opt.value === schedulingLink.location)
                ?.label}
          </span>
        </Fragment>
      </div>

      {user && (
        <div className="px-4 pt-8">当前登录用户：{user.display_name}</div>
      )}
    </div>
  );
}

function EventSection() {
  const {
    user,
    timeSelected,
    eventStartTime,
    schedulingLink,
    setEventTime,
    eventDuration,
    setEventId,
    cancelEventDrafted,
  } = useBooking();
  const history = useHistory();

  const durationDisplay = humanizeDuration(eventDuration * 60 * 1000, {
    units: ['h', 'm'],
    language: 'zh_CN',
  });

  const onSubmit = () => {
    if (eventStartTime) {
      console.log('scheduling link', schedulingLink);
      API.createEvent({
        user: USERNAME,
        link: schedulingLink.url,
        event: {
          displayName: 'guest',
          email: EMAIL,
          startAt: eventStartTime.toISOString(),
          endAt: dayjs(eventStartTime)
            .add(eventDuration, 'minutes')
            .toISOString(),
          fields: {},
        },
      }).then((data) => {
        history.push(`/event/${data.id}`);
      });
    }
  };

  const onCancel = () => {
    cancelEventDrafted();
  };

  return (
    <div className="pt-2">
      <div className="px-4 pt-8">
        <h2 className="text-2xl">{schedulingLink?.name}</h2>
        <p className="pt-4">{schedulingLink?.description}</p>
      </div>

      <div
        className="px-2 pt-8 pr-4 py-2 grid gap-x-1 gap-y-6"
        style={{gridTemplateColumns: '30px auto'}}
      >
        <Fragment>
          <span className="w-full gentle-flex">
            <i className="fas fa-user-alt " />
          </span>
          <span>{schedulingLink?.organizer.displayName}</span>
        </Fragment>

        <Fragment>
          <span className="w-full gentle-flex">
            <i className="fas fa-clock" />
          </span>
          <span>{durationDisplay}</span>
        </Fragment>

        <Fragment>
          <span className="w-full gentle-flex">
            <i className="fas fa-calendar-check" />
          </span>
          {eventStartTime && (
            <div
              className="grid grid-cols-2 gap-2"
              style={{gridTemplateColumns: '80px auto'}}
            >
              <span>{dayjs(eventStartTime).format('M[月]DD[日]')}</span>
              <span>{dayjs(eventStartTime).format('a h点 mm[分]')}</span>
              <span className="text-right">至</span>
              <span>
                {dayjs(eventStartTime)
                  .add(eventDuration, 'minutes')
                  .format('a h点 mm[分]')}
              </span>
            </div>
          )}
        </Fragment>
      </div>

      <div className="px-4 pt-8">
        <div className="pt-4">
          <Input placeholder="" type="text" id={'name'} clearable>
            联系人
          </Input>
        </div>
        <div className="pt-4">
          <Input placeholder="" type="email" id={'email'} clearable>
            Email
          </Input>
        </div>
        {schedulingLink?.fields && (
          <>
            {schedulingLink.fields.map((field: any) => {
              return (
                <div key={field.id} className="pt-4">
                  <Input placeholder="" type="text" id={field.id} clearable>
                    {field.label}
                  </Input>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="px-4 flex flex-row pt-8">
        <Button className="mr-8" type="success" size="mini" onClick={onSubmit}>
          确定
        </Button>
        <Button size="mini" onClick={onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
}

function CalendarMonthView() {
  const [selectedDay, handleDayClick] = useState<Date>(new Date());

  return (
    <div className="absolute bottom-0 border-t border-primary border-solid">
      <DayPicker
        selectedDays={selectedDay}
        onDayClick={handleDayClick}
        todayButton="今天"
        modifiers={{
          foo: new Date(),
        }}
        onTodayButtonClick={(day, modifiers) => console.log(day, modifiers)}
      />
    </div>
  );
}

function ControlSection() {
  return (
    <div className="flex flex-col w-96">
      <GeneralSection />
      <CalendarMonthView />
    </div>
  );
}

function CalendarSection() {
  const {
    eventDuration,
    eventStartTime,
    setEventStartTime,
    draftEvent,
    calendarRef,
    eventDrafted,
    getIntervals,
  } = useBooking();

  const renderDayHeaderContent = (props: DayHeaderContentArg) => {
    const date = dayjs(props.date);
    return (
      <div className="h-full">
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

  const handleDateClick = (info: DateClickArg) => {
    let calendarApi = info.view.calendar;
    // calendarApi.
    // calendarApi.removeAllEvents();
    setEventStartTime(info.date);
    //
    // const id = nanoid();
    // setEventId(id);
    //
    draftEvent();

    // calendarApi.addEvent({
    //   id,
    //   start: info.dateStr,
    //   end: dayjs(info.date).add(eventDuration, 'minutes').toISOString(),
    // });
  };

  const handleEvents = (events: EventApi[]) => {
    console.log('handleEvents', events);
  };

  /**
   * organizer.availability
   * 1. presets
   * 2. overrides
   */
  const getBlockEvents = (
    arg: {
      start: Date;
      end: Date;
      startStr: string;
      endStr: string;
      timeZone: string;
    },
    successCallback: (events: EventInput[]) => void,
    failureCallback: (error: any) => any
  ) => {
    console.log('get intervals', getIntervals(arg.start, arg.end));

    const intervals = getIntervals(arg.start, arg.end);

    const now = dayjs();
    const intervalsFormat: Dayjs[][] = intervals
      ? intervals
          .filter((interval) => dayjs(interval.endAt).isAfter(now))
          .map((interval) => [dayjs(interval.startAt), dayjs(interval.endAt)])
          .filter((interval) => interval.length > 0)
      : [];

    const startDate = dayjs(arg.start);
    const endDate = dayjs(arg.end);

    const complementedIntervals = complementIntervals(
      startDate,
      endDate,
      intervalsFormat
    );

    successCallback(
      complementedIntervals.map((interval) => {
        return {
          id: createEventId(),
          start: interval[0].toISOString(),
          end: interval[1].toISOString(),
          className: 'sc-unavailable',
          overlap: false,
          editable: false,
          display: 'background',
        };
      })
    );
  };

  const getEvent = (
    arg: {
      start: Date;
      end: Date;
      startStr: string;
      endStr: string;
      timeZone: string;
    },
    successCallback: (events: EventInput[]) => void,
    failureCallback: (error: any) => any
  ) => {
    successCallback(
      eventDrafted && eventStartTime
        ? [
            {
              id: nanoid(),
              start: eventStartTime,
              end: dayjs(eventStartTime)
                .add(eventDuration, 'minutes')
                .toISOString(),
            },
          ]
        : []
    );
  };

  return (
    <div className="pt-8 w-full h-full">
      <div className="w-full h-full">
        <FullCalendar
          ref={calendarRef}
          height="100%"
          contentHeight="900px"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'title',
            center: '',
            right: 'today prev,next',
          }}
          weekNumberCalculation="ISO"
          initialView="timeGridWeek"
          slotDuration="00:30:00"
          snapDuration="00:15:00"
          slotLabelInterval="01:00"
          slotMinTime="00:00:00"
          dayHeaderContent={renderDayHeaderContent}
          editable={true}
          selectable={false}
          eventDurationEditable={false}
          allDaySlot={false}
          // dayMaxEvents={true}
          weekends={true}
          // events={[
          //   {
          //     id: nanoid(),
          //     start: timeSelected?.start,
          //     end: timeSelected?.end,
          //   },
          // ]} // alternatively, use the `events` setting to fetch from a feed
          eventSources={[
            {
              events: getBlockEvents,
              display: 'background',
            },
            {
              events: getEvent,
            },
          ]}
          // eventContent={renderEventContent} // custom render function
          eventClick={(e) => {
            console.log('click', e);
          }}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          dateClick={handleDateClick}
          eventDragStop={function (arg) {
            console.log('drag stop', arg, arg.event.startStr, arg.event.endStr);
          }}
          nowIndicator={true}
          locale={zhLocale}
        />
      </div>
    </div>
  );
}

export default function BookingPage() {
  const {userSlug, schedulingLinkSlug} = useParams();

  return (
    <BookingProvider
      userSlug={userSlug}
      schedulingLinkSlug={schedulingLinkSlug}
    >
      <div className="w-screen h-screen flex flex-row ">
        <ControlSection />
        <CalendarSection />
      </div>
    </BookingProvider>
  );
}

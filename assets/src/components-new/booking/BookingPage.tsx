import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import BookingProvider, {useBooking} from './BookingProvider';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import FullCalendar, {
  DateSelectArg,
  DayHeaderContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {INITIAL_EVENTS} from '../event-utils';
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import dayjs from 'dayjs';
import {Button, Input} from '@geist-ui/react';
import {colourOptions} from '../events/data';
import {convertMinToHrsMin} from '../../utils';

function GeneralSection() {
  const {user, schedulingLink, eventDuration, setEventDuration} = useBooking();

  return (
    <div>
      <div>
        <div>{schedulingLink?.name}</div>
        <div>{schedulingLink?.description}</div>
      </div>

      <div>
        <i className="fas fa-user-alt mr-2 w-5 text-center" />
        {schedulingLink?.organizer.displayName}
      </div>

      <div className="flex flex-row">
        <i className="fas fa-clock mr-2 w-5 text-center" />
        <div className="flex flex-row">
          {schedulingLink?.durations.map((d: number) => {
            return (
              <div key={d}>
                <Button
                  onClick={() => {
                    setEventDuration(d);
                  }}
                  type={d === eventDuration ? 'success' : 'default'}
                  size="mini"
                >
                  {d}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row">
        <i className="fas fa-video mr-2 w-5 text-center" />
        {schedulingLink?.location &&
          colourOptions.find((opt) => opt.value === schedulingLink.location)
            ?.label}
      </div>

      <div>当前登录用户：{user?.display_name}</div>
    </div>
  );
}

function EventSection() {
  const {
    user,
    timeSelected,
    schedulingLink,
    setEventTime,
    eventDuration,
  } = useBooking();

  return (
    <div className="pt-2">
      <div>
        <div>{schedulingLink?.name}</div>
        <div>{schedulingLink?.description}</div>

        <div>
          <i className="fas fa-user-alt mr-2 w-5 text-center" />
          {schedulingLink?.organizer.displayName}
        </div>

        <div>
          <i className="fas fa-clock mr-2 w-5 text-center" />
          {eventDuration}
        </div>
        <div className="flex flex-row">
          <i className="fas fa-video mr-2 w-5 text-center" />
          {schedulingLink?.location &&
            colourOptions.find((opt) => opt.value === schedulingLink.location)
              ?.label}
        </div>

        <div>Start: {timeSelected?.start.toISOString()}</div>
        <div>End: {timeSelected?.end.toISOString()}</div>
      </div>

      <div className="pt-2">
        <div>联系人</div>
        <Input placeholder="" type="text" id={'name'} />
      </div>
      <div className="pt-2">
        <div>Email</div>
        <Input placeholder="" type="email" id={'email'} />
      </div>
      {schedulingLink?.fields && (
        <div className="flex flex-row flex-wrap">
          {schedulingLink.fields.map((field: any) => {
            return (
              <div key={field.id} className="pt-2">
                <label>{field.label}</label>
                <Input placeholder="" type="text" id={field.id} />
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-row pt-2">
        <Button type="success" size="mini">
          确定
        </Button>
        <Button size="mini">取消</Button>
      </div>
    </div>
  );
}

function CalendarMonthView() {
  const [selectedDay, handleDayClick] = useState<Date>(new Date());

  return (
    <div>
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
  const {timeSelected} = useBooking();
  return (
    <div className="flex flex-col w-72">
      <GeneralSection />
      <div className={'border-green-500 border-2 border-solid'} />
      <EventSection />
      <div className={'border-green-500 border-2 border-solid'} />
      <CalendarMonthView />
    </div>
  );
}

function CalendarSection() {
  const {eventDuration, setEventTime} = useBooking();

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

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // let title = prompt('Please enter a new title for your event')
    let title = 'new event';
    let calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect() // clear date selection

    console.log('select', selectInfo);

    setEventTime(selectInfo.start, selectInfo.end);

    // setSelectInfo(selectInfo);

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

  return (
    <div className="w-full h-full border-green-solid-2">
      <div className="w-full h-full">
        <FullCalendar
          // height="800px"
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
          snapDuration={convertMinToHrsMin(eventDuration)}
          slotLabelInterval="01:00"
          slotMinTime="06:00:00"
          dayHeaderContent={renderDayHeaderContent}
          editable={true}
          selectable={true}
          allDaySlot={false}
          // dayMaxEvents={true}
          weekends={true}
          // events={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          // eventSources={[
          //   {
          //     events: getBackgroundEvents(),
          //     display: 'background',
          //   },
          // ]}
          select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          // eventClick={this.handleEventClick}
          // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          dateClick={function (info) {
            // alert('clicked ' + info.dateStr);
          }}
          nowIndicator={true}
          eventAdd={function (addInfo) {
            console.log('Add', addInfo);
          }}
          /* you can update a remote database when these fire:
                  eventChange={function(){}}
                  eventRemove={function(){}}
                  */
          locale={zhLocale}
        />
      </div>
    </div>
  );
}

export default function BookingPage() {
  const {userSlug, schedulingLinkSlug} = useParams();

  console.log('userSlug', userSlug);

  // read scheduling link
  // - name
  // - description
  // - ...

  return (
    <BookingProvider
      userSlug={userSlug}
      schedulingLinkSlug={schedulingLinkSlug}
    >
      <div className="flex flex-row w-full h-full">
        <ControlSection />
        <CalendarSection />
      </div>
    </BookingProvider>
  );
}

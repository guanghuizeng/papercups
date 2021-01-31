import React from 'react';
import {useParams, Link} from 'react-router-dom';
import {useAppData} from '../hooks/AppDataProvider';
import TextField from './common/TextField';
import {listOfTime24, listOfTime24Options} from './constants';
import Select from 'react-select';
import FullCalendar, {DayHeaderContentArg} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {INITIAL_EVENTS} from './event-utils';
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import {Button, Input} from '@geist-ui/react';
import dayjs from 'dayjs';

const sliceOfTime = listOfTime24.slice(0, 24 * 4);
const timeOptions = listOfTime24Options;

function AvailabilityByDay({rule}: any) {
  const dayState = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map((d) => {
    return {
      day: d,
      checked: rule.byday.findIndex((day: string) => day === d) > -1,
    };
  });

  return (
    <>
      <div className="flex flex-row py-2">
        {dayState.map((state) => {
          return (
            <div
              key={state.day}
              className="border-primary border-solid border mx-1"
            >
              <input type="checkbox" defaultChecked={state.checked} />
              {state.day}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        <Select
          // ref={selectRef}
          className="w-1/2"
          classNamePrefix="select"
          components={{
            IndicatorSeparator: () => {
              return null;
            },
          }}
          name="color"
          defaultValue={timeOptions[(rule.startTime / 60) * 4]}
          options={timeOptions}
          // onMenuOpen={onMenuOpen}
          // onChange={onChange}
        />
        <Select
          // ref={selectRef}
          className="w-1/2"
          classNamePrefix="select"
          components={{
            IndicatorSeparator: () => {
              return null;
            },
          }}
          name="color"
          defaultValue={timeOptions[(rule.endTime / 60) * 4]}
          options={timeOptions}
          // onMenuOpen={onMenuOpen}
          // onChange={onChange}
        />
      </div>
      <Button>Delete</Button>
    </>
  );
}

export function Availability() {
  const {id} = useParams();

  const {availabilityPresets} = useAppData();
  const preset = availabilityPresets
    ? availabilityPresets.find((p) => p.id === id)
    : null;

  const renderDayHeaderContent = (props: DayHeaderContentArg) => {
    const date = dayjs(props.date);
    return (
      <div>
        <div className="text-xs font-medium text-gray-600">
          {date.format('ddd')}
        </div>
      </div>
    );
  };

  const getBackgroundEvents = () => {
    return [];
  };

  /** update functions
   *  1. name
   *  2. rule: edit, add, remove
   * */

  const updateName = () => {};

  const updateRule = () => {};

  const removeRule = () => {};

  const addRule = () => {};

  console.log('Availability', preset);

  // TODO rules => background events

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col">
        <Link
          to={`/settings/links`}
          className="text-gray-400 hover:text-gray-700"
        >
          <i className="fas fa-times" />
        </Link>
        <Input
          initialValue={preset?.name}
          onChange={(value) => {
            console.log(value);
          }}
          size="large"
        />
        <div className="py-4">
          {preset?.rules.map((rule: any) => {
            return (
              <div key={`${rule.startTime}-${rule.endTime}`}>
                <AvailabilityByDay rule={rule} />
              </div>
            );
          })}
        </div>

        <div className="w-full mt-4">
          <Button>Add</Button>
          <Button>Show my calendar overlay</Button>
        </div>
      </div>

      <div className="ml-4 demo-app-main w-full">
        <FullCalendar
          contentHeight="900px"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={false}
          weekNumberCalculation="ISO"
          initialView="timeGridWeek"
          slotDuration="00:30:00"
          snapDuration="00:15:00"
          slotLabelInterval="01:00"
          slotMinTime="06:00:00"
          dayHeaderContent={renderDayHeaderContent}
          allDaySlot={false}
          weekends={true}
          events={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          eventSources={[
            {
              events: getBackgroundEvents(),
              display: 'background',
            },
          ]}
          nowIndicator={true}
          locale={zhLocale}
        />
      </div>
    </div>
  );
}

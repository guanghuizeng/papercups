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
import {
  complementIntervals,
  createEventId,
  eliminateIntervals,
  INITIAL_EVENTS,
} from './event-utils';
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import {Button, Checkbox, Input} from '@geist-ui/react';
import dayjs, {Dayjs} from 'dayjs';
import produce, {Draft} from 'immer';

import {dayConvertToEn, dayConvertToZh} from '../utils';
import _ from 'lodash';
import {nanoid} from 'nanoid';
import {X} from '@geist-ui/react-icons';

const sliceOfTime = listOfTime24.slice(0, 24 * 4);
const timeOptions = listOfTime24Options;

function AvailabilityByDay({
  rule,
  updateDayCheck,
  updateStartTime,
  updateEndTime,
}: any) {
  const dayState = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map((d) => {
    return {
      day: d,
      checked: rule.byday.findIndex((day: string) => day === d) > -1,
    };
  });

  return (
    <div className={'flex flex-col'}>
      <div className="flex flex-row py-2 px-4 ">
        {dayState.map((state) => {
          return (
            <div key={state.day} className="cursor-pointer pl-4">
              <label className="cursor-pointer inline-flex flex-col">
                <input
                  type="checkbox"
                  defaultChecked={state.checked}
                  onChange={(e) => {
                    updateDayCheck(rule.id, state.day, e.target.checked);
                  }}
                />
                {dayConvertToZh(state.day)}
              </label>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row">
        <Select
          className="w-28 mx-4"
          classNamePrefix="select"
          components={{
            IndicatorSeparator: () => {
              return null;
            },
          }}
          name="color"
          defaultValue={timeOptions[(rule.startTime / 60) * 4]}
          options={timeOptions}
          onChange={(option) => {
            if (option) {
              updateStartTime(rule.id, option.value);
            }
          }}
        />
        <Select
          className="w-28 mx-4"
          classNamePrefix="select"
          components={{
            IndicatorSeparator: () => {
              return null;
            },
          }}
          name="color"
          defaultValue={timeOptions[(rule.endTime / 60) * 4]}
          options={timeOptions}
          onChange={(option) => {
            if (option) {
              updateEndTime(rule.id, option.value);
            }
          }}
        />
      </div>
    </div>
  );
}

export function Availability() {
  const {id} = useParams();

  const {availabilityPresets, updateAvailabilityPreset} = useAppData();
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
    const startDate = dayjs('2021-02-01T00:00:00');
    const endDate = startDate.add(14, 'day');
    const availabilityPresetsIntervals: any = preset ? preset.rules : [];

    const availableIntervals: Dayjs[][] = [];
    let date = startDate.clone();
    while (!date.isSame(endDate)) {
      const day = dayConvertToEn(date.format('dd').toLowerCase());
      availabilityPresetsIntervals.forEach((settings: any) => {
        if (settings.byday.findIndex((d: string) => d === day) > -1) {
          let startTime = date.add(settings.startTime, 'minute');
          let endTime = date.add(settings.endTime, 'minute');
          availableIntervals.push([startTime, endTime]);
        }
      });
      date = date.add(1, 'day');
    }
    const sortedIntervals = _.sortBy(availableIntervals, (e) => e[0].valueOf());
    const eliminatedIntervals = eliminateIntervals(sortedIntervals);
    const complementedIntervals = complementIntervals(
      startDate,
      endDate,
      eliminatedIntervals
    );

    return complementedIntervals.map((interval) => {
      return {
        id: createEventId(),
        start: interval[0].toISOString(),
        end: interval[1].toISOString(),
        className: 'sc-unavailable',
        display: 'background',
      };
    });
  };

  /** update functions
   *  1. name
   *  2. rule: edit, add, remove
   * */

  const updateName = (value: string) => {
    updateAvailabilityPreset(preset.id, {name: value});
  };

  const removeRule = (id: string) => {
    updateAvailabilityPreset(preset.id, {
      rules: preset.rules.filter((rule: any) => rule.id != id),
    });
  };

  const addRule = () => {
    const rules = produce(preset.rules, (draft: Draft<any>) => {
      draft.push({
        id: nanoid(),
        byday: ['mo', 'tu', 'we', 'th', 'fr'],
        startTime: 540,
        endTime: 1020,
      });
    });
    updateAvailabilityPreset(preset.id, {rules});
  };

  const updateDayCheck = (ruleId: string, day: string, checked: boolean) => {
    const rules = produce(preset.rules, (draft: Draft<any>) => {
      const rule = draft.find((rule: any) => rule.id === ruleId);
      if (checked) {
        rule.byday.push(day);
      } else {
        rule.byday = rule.byday.filter((byday: string) => byday !== day);
      }
    });
    updateAvailabilityPreset(preset.id, {rules});
  };

  const updateStartTime = (ruleId: string, value: number) => {
    const rules = produce(preset.rules, (draft: Draft<any>) => {
      const rule = draft.find((rule: any) => rule.id === ruleId);
      rule.startTime = value;
    });
    updateAvailabilityPreset(preset.id, {rules});
  };

  const updateEndTime = (ruleId: string, value: number) => {
    const rules = produce(preset.rules, (draft: Draft<any>) => {
      const rule = draft.find((rule: any) => rule.id === ruleId);
      rule.endTime = value;
    });
    updateAvailabilityPreset(preset.id, {rules});
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row header-padding header-border header-h items-center">
        <Link
          to={`/settings/links`}
          className="gentle-flex focus:outline-none w-10 h-10 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <X />
        </Link>
        <span className="pl-2">时间管理</span>
      </div>

      <div className="flex flex-row w-full">
        <div className="flex flex-col w-112">
          <div className="px-4 pt-8">
            <textarea
              className="-mx-2 px-2 py-2 rounded-lg text-2xl leading-6 font-bold border-transparent focus:outline-none focus:border-gray-300 focus:ring focus:ring-black focus:ring-opacity-50 text-gray-800 resize-none placeholder-gray-600"
              placeholder="Name this link"
              spellCheck="false"
              style={{minHeight: '42px !important'}}
              defaultValue={preset?.name}
              rows={1}
              onKeyPress={(e) => {
                console.log(e.key);
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                console.log('Name change', e.target.value);
                // updateName(e.target.value);
              }}
            />
          </div>

          <div className="py-4">
            {preset?.rules.map((rule: any) => {
              return (
                <div
                  key={rule.id}
                  className="flex flex-row py-2 pb-8 mb-4 border-b border-primary border-solid"
                >
                  <AvailabilityByDay
                    rule={rule}
                    updateDayCheck={updateDayCheck}
                    updateStartTime={updateStartTime}
                    updateEndTime={updateEndTime}
                  />
                  <button
                    className="w-8 h-8 relative text-gray-300 hover:text-black hover:bg-gray-200 rounded-full gentle-flex"
                    onClick={() => removeRule(rule.id)}
                  >
                    <X />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="w-full mt-4">
            <Button onClick={addRule}>Add</Button>
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
            eventSources={[
              {
                events: getBackgroundEvents(),
                display: 'background',
              },
            ]}
            nowIndicator={false}
            locale={zhLocale}
          />
        </div>
      </div>
    </div>
  );
}

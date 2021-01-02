import React, {useEffect, useState} from 'react';
import {
  PERIOD_TYPE_AVAILABLE_MOVING,
  PERIOD_TYPE_FIXED,
  PERIOD_TYPE_MOVING,
  PERIOD_TYPE_UNLIMITED,
  WEEKDAYS,
} from '../../constants';
import {useQuery, useTransact} from '../../../store';
import _ from 'lodash';
import {EditingContext} from '../../../hooks/EditingContext';
import CancelButton from '../CancelButton';
import BookingRangeContainer from '../BookingRangeContainer';
import ScheduleContainer from '../ScheduleContainer';
import DurationSelector from '../../common/DurationSelector';
import BufferSelector from '../../common/BufferSelector';
import {useEvents} from '../../EventsProvider';

function DurationContainer() {
  return (
    <div className="pt32 pb56 border-b border-gray-400">
      <DurationSelector />
    </div>
  );
}

function BuffersContainer() {
  return (
    <div className="pt32 pb56">
      <BufferSelector />
    </div>
  );
}

function DateRangeDescription({periodType, maxBookingTime}: any) {
  switch (periodType) {
    case PERIOD_TYPE_MOVING:
    case PERIOD_TYPE_AVAILABLE_MOVING:
      if (maxBookingTime) {
        return <span>{maxBookingTime / 60 / 24} rolling days</span>;
      } else {
        return <span></span>;
      }
    case PERIOD_TYPE_FIXED:
    case PERIOD_TYPE_UNLIMITED:
      return <span>in construction</span>;
  }
  return <span />;
}

export default function AvailabilitySectionExpand({
  user,
  eventType,
  onClose,
  onSave,
  saveButtonLabel,
}: any) {
  const transact = useTransact();
  const [userInfo, setUserInfo] = useState(user);
  const [eventTypeValue, setEventTypeValue] = useState(eventType);
  const [changed, setChanged] = useState(false);
  const [forceCancel, setForceCancel] = useState(false);

  const markChanged = () => {
    if (!changed) {
      setChanged(true);
    }
  };

  const {
    active_availability_rule: activeAvailabilityRule,
    own_availability_rule: ownAvailabilityRule,
  } = userInfo;

  const {schedules: sch2, schedulesById} = useEvents();

  const schedules = sch2.map((id: string) => schedulesById[id]);

  const [currentSchedule, setCurrentSchedule] = useState({
    ...schedules[0],
    rules: JSON.parse(schedules[0].rules),
  });

  const rules = currentSchedule
    ? WEEKDAYS.map((day) => {
        // @ts-ignore
        const rule = currentSchedule.rules.find(
          (rule: any) => rule.wday === day
        );
        if (rule) {
          if (rule.available === undefined) {
            return {...rule, available: true};
          } else {
            return rule;
          }
        }
        return {
          type: 'wday',
          wday: day,
          intervals: [],
          available: false,
        };
      })
    : [];

  const save = (eventTypeValue: any) => {
    if (changed) {
      console.log('Save time', eventTypeValue);
      onSave(eventTypeValue);
      // const txs = [];
      //
      // const tx: any = {};
      // Object.keys(eventTypeValue).forEach((key) => {
      //   tx[`:eventType/${key}`] = eventTypeValue[key];
      // });
      // txs.push(tx);
      //
      // txs.push({
      //   // @ts-ignore
      //   ':schedule/uid': currentSchedule.id,
      //   // @ts-ignore
      //   ':schedule/rules': currentSchedule.rules,
      // });
      //
      // transact(txs);
    }
  };

  const setPeriodType = (type: string) => {
    markChanged();
    setEventTypeValue({
      ...eventTypeValue,
      period_type: type,
    });
  };
  const setMaxBookingTime = (value: number) => {
    markChanged();

    setEventTypeValue({
      ...eventTypeValue,
      max_booking_time: value * 60 * 24,
    });
  };
  const setStartEndDate = (start: string, end: string) => {
    markChanged();

    setEventTypeValue({
      ...eventTypeValue,
      start_date: start,
      end_date: end,
    });
  };

  const setDuration = (duration: number) => {
    markChanged();
    setEventTypeValue({
      ...eventTypeValue,
      duration,
    });
  };

  const setActiveAvailabilityRule = () => {};
  const setScheduleRuleEnabled = (
    type: string,
    date: string,
    enabled: boolean
  ) => {
    const copy = _.cloneDeep(currentSchedule);
    // @ts-ignore
    const rule = copy.rules.find((rule: any) => rule.wday === date);
    rule.available = enabled;

    setCurrentSchedule(copy);
    markChanged();
  };

  const setIntervalTime = (
    date: string,
    index: number,
    type: string,
    value: string
  ) => {
    console.log('set from', date, index, value, currentSchedule);
    if (currentSchedule) {
      const copy = _.cloneDeep(currentSchedule);
      // @ts-ignore
      const rule = copy.rules.find(
        (rule: any) => rule.wday === date || rule.date === date
      );
      if (rule) {
        if (rule.intervals) {
          const interval = rule.intervals[index];
          if (interval) {
            interval[type] = value;
            setCurrentSchedule(copy);
            markChanged();
            return;
          }
        }
      }
    }
    console.log('Err set rule from ');
  };

  const setRuleFrom = (date: string, index: number, value: string) => {
    setIntervalTime(date, index, 'from', value);
  };

  const setRuleTo = (date: string, index: number, value: string) => {
    setIntervalTime(date, index, 'to', value);
  };
  const addInterval = (date: string) => {
    if (currentSchedule) {
      const copy = _.cloneDeep(currentSchedule);
      // @ts-ignore
      const rule = copy.rules.find(
        (rule: any) => rule.wday === date || rule.date === date
      );
      console.log('add', rule);
      if (rule) {
        if (rule.intervals) {
          rule.intervals.push({
            from: '09:00',
            to: '17:00',
          });
          rule.available = true;
          setCurrentSchedule(copy);
          markChanged();
          return;
        }
      }
    }
  };

  const removeInterval = (date: string, index: number) => {
    if (currentSchedule) {
      const copy = _.cloneDeep(currentSchedule);
      // @ts-ignore
      const rule = copy.rules.find(
        (rule: any) => rule.wday === date || rule.date === date
      );
      if (rule) {
        if (rule.intervals) {
          rule.intervals.splice(index, 1);

          if (rule.intervals.length === 0) {
            rule.available = false;
          }
          setCurrentSchedule(copy);
          markChanged();
          return;
        }
      }
    }
  };
  const duplicateRule = () => {};

  const setBeforeBufferTime = (before_buffer_time: number) => {
    markChanged();
    setEventTypeValue({
      ...eventTypeValue,
      before_buffer_time,
    });
  };

  const setAfterBufferTime = (after_buffer_time: number) => {
    markChanged();
    setEventTypeValue({
      ...eventTypeValue,
      after_buffer_time,
    });
  };

  return (
    <EditingContext.Provider
      value={{
        value: eventTypeValue,
        activeAvailabilityRule,
        setActiveAvailabilityRule,
        ownAvailabilityRule,
        currentSchedule,
        rules,
        setScheduleRuleEnabled,
        setRuleFrom,
        setRuleTo,
        addInterval,
        removeInterval,
        setPeriodType,
        setMaxBookingTime,
        setStartEndDate,
        setDuration,
        setBeforeBufferTime,
        setAfterBufferTime,
        markChanged,
      }}
    >
      <div
        data-section="availability"
        className="mt-2 border-b lg:border  hover:border-blue-500 border-black lg:rounded"
      >
        <div
          className="flex flex-row justify-between cursor-pointer"
          onClick={(e) => {
            if (!changed) {
              onClose();
              e.stopPropagation();
            }
          }}
        >
          <div className="flex flex-row p-2 ">
            <div className="px-3">
              <i className="far fa-calendar-check" />
            </div>
            <div>
              <div className="text-lg">When can people book this event?</div>
              <div className="text-gray-700">
                {eventTypeValue.duration} min,{' '}
                <DateRangeDescription
                  periodType={eventTypeValue.period_type}
                  maxBookingTime={eventTypeValue.max_booking_time}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="gentle-flex mr-2">
              <CancelButton changed={changed} close={onClose} />
            </div>
            <div className="gentle-flex mx-2 ">
              <div
                className="cursor-pointer border-gray-500 hover:border-black border px-2 bg-blue-400 text-white"
                onClick={() => {
                  console.log('Value', eventTypeValue, changed);
                  save(eventTypeValue);
                  onClose();
                }}
              >
                {saveButtonLabel}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-b border-gray-200">
          <div className="px-2 py-1 lg:px-10 lg:py-8">
            <div className="flex flex-col">
              <BookingRangeContainer />
              <ScheduleContainer
                user={userInfo}
                setUser={setUserInfo}
                eventTypeValue={eventTypeValue}
                setEventTypeValue={setEventTypeValue}
              />
              <DurationContainer />
              <BuffersContainer />
            </div>
          </div>
          <div className="flex flex-row justify-end  border-t border-gray-400 py-4">
            <div className="gentle-flex mr-2">
              <CancelButton changed={changed} close={onClose} />
            </div>
            <div className="gentle-flex mx-2 ">
              <div
                className="cursor-pointer border-gray-500 hover:border-black border px-2 bg-blue-400 text-white"
                onClick={() => {
                  save(eventTypeValue);
                  onClose();
                }}
              >
                {saveButtonLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditingContext.Provider>
  );
}

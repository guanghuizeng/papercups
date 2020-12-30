import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import BookingRangeContainer from './BookingRangeContainer';
import DurationSelector from '../common/DurationSelector';
import BufferSelector from '../common/BufferSelector';
import {useQuery, useQueryOne, useTransact} from '../../store';
import CancelButton from './CancelButton';
import {
  PERIOD_TYPE_AVAILABLE_MOVING,
  PERIOD_TYPE_FIXED,
  PERIOD_TYPE_MOVING,
  PERIOD_TYPE_UNLIMITED,
  WEEKDAYS,
} from '../constants';
import ScheduleContainer from './ScheduleContainer';
import {EditingContext} from '../../hooks/EditingContext';

// function BookingRangeContainer({ eventTypeValue }: any) {
//   return (
//     <div data-container="booking_range_fieldset">
//       <div className="mb-8 pb56 border-b border-gray-400">
//         <div className="my-3">
//           <div className="text-16 font-bold">Date range</div>
//           <div className="text-light text-sm">Invitees can schedule...</div>
//         </div>
//         <BookingRangeContainer />
//       </div>
//     </div>
//   );
// }

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

function EventAvailabilityEdit({user, eventType, open, close}: any) {
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

  const schedules = useQuery(
    '[:find ?s ?n ?r :in $ ?u :where [?e ":user/uid" ?u] [?e ":user/schedules" ?s] [?se ":schedule/uid" ?s] [(get-else $ ?se ":schedule/name" "") ?n] [?se ":schedule/rules" ?r]]',
    'u1',
    ([id, name, rules]: any) => ({id, name, rules})
  );

  const [currentSchedule, setCurrentSchedule] = useState();

  useEffect(() => {
    setCurrentSchedule(
      schedules.find((sch: any) => sch.id === activeAvailabilityRule)
    );
  }, [schedules]);

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
      const txs = [];

      const tx: any = {};
      Object.keys(eventTypeValue).forEach((key) => {
        tx[`:eventType/${key}`] = eventTypeValue[key];
      });
      txs.push(tx);

      txs.push({
        // @ts-ignore
        ':schedule/uid': currentSchedule.id,
        // @ts-ignore
        ':schedule/rules': currentSchedule.rules,
      });

      transact(txs);
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

  console.log('sec', currentSchedule);

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
        markChanged,
      }}
    >
      <>
        <div
          className="flex flex-row justify-between cursor-pointer"
          onClick={(e) => {
            if (!changed) {
              close();
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
            <CancelButton changed={changed} close={close} />
            <div
              className="gentle-flex mx-2 cursor-pointer"
              onClick={() => {
                console.log('Value', eventTypeValue, changed);
                save(eventTypeValue);
                close();
              }}
            >
              Save & Close
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
            <div className="mx-2 cursor-pointer" onClick={close}>
              Cancel
            </div>
            <div className="mx-2 cursor-pointer" onClick={open}>
              Save & Close
            </div>
          </div>
        </div>
      </>
    </EditingContext.Provider>
  );
}

function EventAvailabilityEditWrapper(props: any) {
  const {preloadValue, eventTypeId} = props;
  const user = useQueryOne(
    '[:find ?aar ?oar ?n ?r :in $ ?u :where [?e ":user/uid" ?u] [?e ":user/active_availability_rule" ?aar] [?e ":user/own_availability_rule" ?oar] [?ae ":schedule/uid" ?aar] [(get-else $ ?ae ":schedule/name" "") ?n] [?ae ":schedule/rules" ?r]]',
    'u1',
    ([active_availability_rule, own_availability_rule, name, rules]: any) => ({
      active_availability_rule,
      own_availability_rule,
      name,
      rules,
    })
  );

  const eventType = useQueryOne(
    '[:find ?i ?n ?d ?loc ?url ?c ?dr ?p ?mbt ?sdt ?edt  ?last_edited :in $ ?i :where [?e ":eventType/uid" ?i] [?e ":eventType/name" ?n] [?e ":eventType/description" ?d] [?e ":eventType/location" ?loc] [?e ":eventType/url" ?url] [?e ":eventType/color" ?c] [?e ":eventType/duration" ?dr] [?e ":eventType/period_type" ?p] [?e ":eventType/max_booking_time" ?mbt] [?e ":eventType/start_date" ?sdt] [?e ":eventType/end_date" ?edt]  [?e ":eventType/last_edited" ?last_edited] ]',
    eventTypeId,
    ([
      uid,
      name,
      description,
      location,
      url,
      color,
      duration,
      period_type,
      max_booking_time,
      start_date,
      end_date,
      editAt,
    ]: any) => ({
      uid,
      name,
      description,
      location,
      url,
      color,
      duration,
      period_type,
      max_booking_time,
      start_date,
      end_date,
      editAt,
    })
  );

  if (_.isEmpty(eventType)) {
    return <XX eventType={preloadValue} />;
  }

  return <EventAvailabilityEdit {...props} user={user} eventType={eventType} />;
}

function XX({editing, setEditing, eventType}: any) {
  return (
    <div
      className="flex flex-row justify-between cursor-pointer"
      onClick={() => {
        setEditing(!editing);
      }}
    >
      <div className="flex flex-row p-2 ">
        <div className="px-3">
          <i className="far fa-calendar-check" />
        </div>
        <div>
          <div className="text-lg">When can people book this event?</div>
          <div className="text-gray-700">
            {eventType.duration} min,{' '}
            <DateRangeDescription
              periodType={eventType.period_type}
              maxBookingTime={eventType.max_booking_time}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventAvailabilitySection(props: any) {
  const {eventTypeId: id} = props;

  const eventType = useQueryOne(
    '[:find ?i ?n ?d ?loc ?url ?c ?dr ?p ?mbt ?sdt ?edt  ?last_edited :in $ ?i :where [?e ":eventType/uid" ?i] [?e ":eventType/name" ?n] [?e ":eventType/description" ?d] [?e ":eventType/location" ?loc] [?e ":eventType/url" ?url] [?e ":eventType/color" ?c] [?e ":eventType/duration" ?dr] [?e ":eventType/period_type" ?p] [?e ":eventType/max_booking_time" ?mbt] [?e ":eventType/start_date" ?sdt] [?e ":eventType/end_date" ?edt]  [?e ":eventType/last_edited" ?last_edited] ]',
    id,
    ([
      uid,
      name,
      description,
      location,
      url,
      color,
      duration,
      period_type,
      max_booking_time,
      start_date,
      end_date,
      editAt,
    ]: any) => ({
      uid,
      name,
      description,
      location,
      url,
      color,
      duration,
      period_type,
      max_booking_time,
      start_date,
      end_date,
      editAt,
    })
  );

  const [editing, setEditing] = useState(false);
  const close = () => {
    setEditing(false);
  };
  const open = () => {
    setEditing(true);
  };

  console.log('ava', eventType);

  return (
    <div data-section="availability">
      <div
        className={`mt-2 border-b lg:border  hover:border-blue-500 border-black lg:rounded `}
      >
        {editing ? (
          <EventAvailabilityEditWrapper
            preloadValue={eventType}
            eventTypeId={id}
            open={open}
            close={close}
          />
        ) : (
          <XX eventType={eventType} editing={editing} setEditing={setEditing} />
        )}
      </div>
    </div>
  );
}

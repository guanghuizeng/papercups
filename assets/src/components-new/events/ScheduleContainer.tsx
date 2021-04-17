import React, {
  useCallback,
  useRef,
  useState,
  Fragment,
  useContext,
} from 'react';
import CheckboxStateless from '../common/CheckboxStateless';
import Select from 'react-select';
import * as Popover from '@radix-ui/react-popover';

import dayjs from 'dayjs';
import {listOfTime, listOfTime24, WEEKDAYS} from '../constants';
import {EditingContext} from '../../hooks/EditingContext';
import {random} from 'nanoid';
import moment, {now} from 'moment';
import {number} from 'prop-types';
import _ from 'lodash';
import * as Dialog from '@radix-ui/react-dialog';
import {DayPickerSingleDateController} from 'react-dates';

const sliceOfTime = listOfTime24.slice(0, 24 * 4);
const timeOptions = sliceOfTime.map((slice) => ({
  value: slice,
  label: slice,
}));

function RuleCopyToMenu({date}: any) {
  return (
    <Popover.Root>
      <Popover.Trigger className="outline-none focus:outline-none">
        <i className="far fa-copy text-light hover:text-black cursor-pointer" />
      </Popover.Trigger>
      <Popover.Content
        className="outline-none border border-black border-solid p-3"
        style={{
          borderRadius: 3,
          fontSize: 14,
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <div className="flex flex-col">
          <div>COPY ITEMS TO...</div>
          <div className="grid grid-cols-2 gap-y-2 py-2">
            {WEEKDAYS.map((day) => {
              return (
                <Fragment key={day}>
                  <div className="cursor-pointer">{_.capitalize(day)}</div>
                  <div className="cursor-pointer flex flex-row justify-end">
                    <div className="gentle-flex">
                      <CheckboxStateless value={date === day} />
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
          <div className="mt-2 py-2 rounded cursor-pointer gentle-flex bg-blue-400 text-white">
            Apply
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

function SelectInput({defaultValue, onChange}: any) {
  const selectRef = useRef<any>(null);
  // Feature of focusing selected option when menu is getting opened
  const onMenuOpen = useCallback(() => {
    // Calling an initial prop if it has been passed
    // Getting a selected option
    const option = selectRef.current?.select?.state?.selectValue?.[0];
    if (option) {
      setTimeout(() => {
        // Setting a focused value as a selected one
        // References:
        // - https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Select.js#L503
        // - https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Select.js#L802
        if (selectRef.current?.select) {
          const selectedIndex = selectRef.current.select.state.menuOptions.focusable.findIndex(
            (opt: any) => opt.value === option.value
          );
          if (selectedIndex >= 0) {
            // Focusing selected option only if it exists
            selectRef.current.select.scrollToFocusedOptionOnUpdate = true;
            selectRef.current.select.inputIsHiddenAfterUpdate = false;
            selectRef.current.select.setState({
              focusedValue: null,
              focusedOption:
                selectRef.current.select.state.menuOptions.focusable[
                  selectedIndex + 3
                ],
            });
          }
        }
      });
    }
  }, [selectRef.current]);

  return (
    <Select
      ref={selectRef}
      className=""
      classNamePrefix="select"
      components={{
        DropdownIndicator: () => {
          return null;
        },
        IndicatorSeparator: () => {
          return null;
        },
      }}
      name="color"
      defaultValue={defaultValue}
      options={timeOptions}
      onMenuOpen={onMenuOpen}
      onChange={onChange}
    />
  );
}

function IntervalsContainer({date, durations: intervals, available}: any) {
  const {
    setScheduleRuleEnabled,
    setRuleFrom,
    setRuleTo,
    addInterval,
    removeInterval,
  } = useContext(EditingContext);
  const enabled = available !== false;
  const [checkPass, setCheckPass] = useState(true);

  return (
    <div className="p-4 border-gray-200 border-t">
      <div className="grid md:grid-cols-3x w-full">
        <div className="flex flex-row justify-between">
          <div className="w-16 md:pt-3 flex flex-row cursor-pointer">
            <div
              className="pr-3"
              onClick={() => setScheduleRuleEnabled('wday', date, !enabled)}
            >
              <CheckboxStateless value={enabled} />
            </div>
            <div
              className="font-medium"
              onClick={() => setScheduleRuleEnabled('wday', date, !enabled)}
            >
              {(date as string).substr(0, 3).toUpperCase()}
            </div>
          </div>
          <div className="visible md:invisible flex flex-row">
            <div
              className="mx-2"
              onClick={() => {
                console.log('add new interval');
                addInterval(date);
              }}
            >
              <i className="fas fa-plus text-light hover:text-black cursor-pointer" />
            </div>
            <div
              onClick={() => {
                console.log('copy to another');
              }}
            >
              <i className="far fa-copy text-light hover:text-black cursor-pointer" />
            </div>
          </div>
        </div>
        {enabled ? (
          <div className="flex-1 flex flex-col h-full">
            {intervals.map((interval: any, index: number) => {
              return (
                <div key={index} className="flex flex-col">
                  <div className="flex flex-row my-1">
                    <div className="mx-2 md:mx-3">
                      <div className="flex flex-row">
                        <div className="w-20">
                          <SelectInput
                            defaultValue={{
                              value: interval.from,
                              label: interval.from,
                            }}
                            onChange={({value}: any, {action}: any) => {
                              if (action === 'select-option') {
                                console.log('OnChange', value, action);
                                setRuleFrom(date, index, value);
                              }
                            }}
                          />
                        </div>
                        <div>
                          <div className="px-1 center-v">
                            <i className="fas fa-minus text-light" />
                          </div>
                        </div>
                        <div className="w-20">
                          <SelectInput
                            defaultValue={{
                              value: interval.to,
                              label: interval.to,
                            }}
                            onChange={({value}: any, {action}: any) => {
                              if (action === 'select-option') {
                                console.log('OnChange', value, action);
                                setRuleTo(date, index, value);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="center-v">
                        <div
                          className=""
                          onClick={() => {
                            console.log('delete', date, index, interval);
                            removeInterval(date, index);
                          }}
                        >
                          <i className="far fa-trash-alt text-light hover:text-black cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {!checkPass && <div className="mx-2 md:mx-3">Info</div>}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 text-light md:mx-2 md:pt-3">Unavailable</div>
        )}
        <div className="invisible md:visible flex flex-row justify-end">
          <div
            className="mx-2 md:pt-3"
            onClick={() => {
              console.log('add new interval');
              addInterval(date);
            }}
          >
            <i className="fas fa-plus text-light hover:text-black cursor-pointer" />
          </div>
          <div
            className="md:pt-3"
            onClick={() => {
              console.log('copy to another');
            }}
          >
            <RuleCopyToMenu date={date} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleContainer(props: any) {
  const {
    activeAvailabilityRule,
    ownAvailabilityRule,
    currentSchedule,
    rules,
  } = useContext(EditingContext);

  return (
    <div className="pt32 pb56 border-b border-gray-400">
      <div>
        <div className="grid lg:grid-cols-6-4 gap-2">
          <div className="text-16 font-bold">
            How do you want to offer your availability for this event type?
          </div>
          <div className="text-light">
            Select one of your schedules or define custom hours specific to this
            type of event.
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap">
              <div
                className={`mt-4 mr-4 p-2 border-2 ${
                  activeAvailabilityRule !== ownAvailabilityRule
                    ? 'border-green-400 cursor-default'
                    : 'border-gray-400 cursor-pointer'
                } border-solid rounded gentle-flex`}
                onClick={() => {}}
              >
                Use an existing schedule
              </div>
              <div
                className={`mt-4 p-2 border-2 ${
                  activeAvailabilityRule === ownAvailabilityRule
                    ? 'border-green-400 cursor-default'
                    : 'border-gray-400 cursor-pointer'
                } border-solid rounded gentle-flex`}
              >
                Set custom hours
              </div>
            </div>
            {activeAvailabilityRule !== ownAvailabilityRule && (
              <div>Use an existing schedule</div>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-end lg:visible invisible">
            <Dialog.Root>
              <Dialog.Trigger className="outline-none focus:outline-none">
                <div className="gentle-flex mx-4 text-green-500 cursor-pointer">
                  Save as new schedule
                </div>
              </Dialog.Trigger>
              <Dialog.Overlay
                style={{
                  backgroundColor: 'rgba(0, 0, 0, .15)',
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              />
              <Dialog.Content
                className="outline-none focus:outline-none p-6"
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  // maxWidth: "fit-content",
                  // maxHeight: "85vh",
                  marginTop: '-5vh',
                  backgroundColor: 'white',
                  borderRadius: 6,
                }}
              >
                <div className="font-bold text-xl">
                  Want to save this as a new schedule?
                </div>
                <div className="pt-10">
                  Save these hours to reuse with other event types. Manage all
                  your schedules under availability.
                </div>
                <div className="w-full my-5">
                  <div>New schedule name</div>
                  <div className="w-full mt-2" style={{height: '46px'}}>
                    <input
                      type="text"
                      className="border border-gray-400 cursor-text h-full w-full px-2 focus:outline-none focus:shadow-outline focus:border-blue-300"
                      placeholder="Working Hours, Exclusive Hours, etc..."
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <Dialog.Close className="py-2 rounded focus:outline-none w-1/2 mr-6 text-center border border-black border-solid">
                    Cancel
                  </Dialog.Close>
                  <div className="py-2 rounded w-1/2 text-center bg-blue-400 text-white cursor-pointer">
                    Apply
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Root>

            {/*<div className="flex flex-row border border-gray-300 rounded">*/}
            {/*  <div className="p-1 border-r border-gray-200 text-white rounded-l bg-gray-600">*/}
            {/*    List*/}
            {/*  </div>*/}
            {/*  <div className="p-1">Calendar</div>*/}
            {/*</div>*/}
          </div>
          <div className="flex flex-row justify-between flex-wrap w-full">
            <div className="lg:w-3/5 mt-4 w-full">
              <div className="flex flex-col border rounded-lg mr-2 border-gray-200">
                <div className="p-4">
                  Set the weekly hours you're typically available for events.
                </div>
                {rules.map((rule: any) => {
                  if (rule.type === 'wday') {
                    return (
                      <IntervalsContainer
                        key={rule.wday}
                        date={rule.wday}
                        available={rule.available}
                        durations={rule.intervals}
                      />
                    );
                  }
                  return <span />;
                })}
              </div>
            </div>
            <div className="flex flex-col mt-4 lg:w-2/5 w-full">
              <div className="border-gray-200 rounded-lg  border">
                <div className="flex flex-row justify-between p-4 border-b border-gray-200">
                  <div>Add hours for specific dates.</div>
                  <Dialog.Root>
                    <Dialog.Trigger className="outline-none focus:outline-none">
                      <div className="px-2 rounded-md text-blue-300 border border-blue-300">
                        +
                      </div>
                    </Dialog.Trigger>
                    <Dialog.Overlay
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, .15)',
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                      }}
                    />
                    <Dialog.Content
                      className="outline-none focus:outline-none"
                      style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 200,
                        maxWidth: 'fit-content',
                        maxHeight: '85vh',
                        marginTop: '-5vh',
                        backgroundColor: 'white',
                        borderRadius: 6,
                      }}
                    >
                      <div className="font-bold text-16 p-6">
                        Select the date(s) you want to assign specific hours
                      </div>
                      <div className="py-4 gentle-flex"></div>
                      <div className="px-6 py-6 border-t border-b border-solid border-gray-400 bg-gray-200 flex flex-col">
                        <div>What hours are you available?</div>
                        <div>intervals</div>
                        <div>intervals</div>
                      </div>
                      <div className="flex flex-row justify-between p-6">
                        <Dialog.Close className="py-2 rounded focus:outline-none w-1/2 mr-6 text-center border border-black border-solid">
                          Cancel
                        </Dialog.Close>
                        <div className="py-2 rounded w-1/2 text-center bg-blue-400 text-white cursor-pointer">
                          Apply
                        </div>
                      </div>
                    </Dialog.Content>
                  </Dialog.Root>
                </div>
                <div>
                  <div className="grid grid-cols-3x gap-2 p-4 bg-gray-300">
                    <div className="w-32">DATES</div>
                    <div>AVAILABILITY</div>
                  </div>
                  <div className="grid grid-cols-3x gap-2 px-4">
                    {currentSchedule &&
                      currentSchedule.rules
                        .filter((rule: any) => rule.type === 'date')
                        .map(({date, intervals}: any) => {
                          return (
                            <Fragment key={date}>
                              <div className="w-32">{date}</div>
                              <div className="flex flex-col">
                                {intervals.map(
                                  ({from, to}: any, index: number) => (
                                    <div key={index} className="flex-1">
                                      {from} - {to}
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="px-1">
                                <i className="far fa-trash-alt text-light hover:text-black cursor-pointer" />
                              </div>
                            </Fragment>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

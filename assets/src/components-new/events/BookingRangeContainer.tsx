import React, {useContext, useState} from 'react';
import Select from 'react-select';
import {
  PERIOD_TYPE_AVAILABLE_MOVING,
  PERIOD_TYPE_FIXED,
  PERIOD_TYPE_MOVING,
  PERIOD_TYPE_UNLIMITED,
} from '../constants';
import DatePicker from './DatePicker';
import {EditingContext} from '../../hooks/EditingContext';

export default function BookingRangeContainer({}: any) {
  const context = useContext(EditingContext);
  const {value, setPeriodType, setMaxBookingTime, setStartEndDate} = context;
  const {
    period_type: periodType,
    max_booking_time: maxBookingTime,
    start_date: startDate,
    end_date: endDate,
  } = value;

  const setMoving = () => {
    if (
      periodType !== PERIOD_TYPE_MOVING &&
      periodType !== PERIOD_TYPE_AVAILABLE_MOVING
    ) {
      setPeriodType(PERIOD_TYPE_MOVING);
    }
  };

  return (
    <div data-container="booking_range_fieldset">
      <div className="mb-8 pb56 border-b border-gray-400">
        <div className="my-3">
          <div className="text-16 font-bold">Date range</div>
          <div className="text-light text-sm">Invitees can schedule...</div>
        </div>
        <div className="flex flex-col">
          {/* moving*/}
          <div className="flex flex-row">
            <div
              className="gentle-flex pr-4 cursor-pointer"
              onClick={setMoving}
            >
              {periodType === PERIOD_TYPE_MOVING ||
              periodType === PERIOD_TYPE_AVAILABLE_MOVING ? (
                <i className="far fa-check-square" />
              ) : (
                <i className="far fa-square" />
              )}
            </div>
            <div
              className="flex flex-row flex-wrap cursor-pointer"
              onClick={setMoving}
            >
              <div className="flex flex-row">
                <div className="gentle-flex" style={{height: '46px'}}>
                  <input
                    type="number"
                    className="border border-gray-400 cursor-text h-full w-16 px-2 focus:outline-none focus:shadow-outline focus:border-blue-300"
                    defaultValue={maxBookingTime / 24 / 60}
                    onChange={(e) => {
                      setMaxBookingTime(parseInt(e.target.value));
                    }}
                  />
                </div>
                <div className="center-v pr-4">
                  <div className="w-40 lg:w-48 cursor-pointer focus:outline-none ">
                    <Select
                      className=""
                      classNamePrefix="select"
                      onChange={(option: any) => {
                        setPeriodType(option.value);
                      }}
                      components={{
                        DropdownIndicator: () => {
                          return null;
                        },
                        IndicatorSeparator: () => {
                          return null;
                        },
                      }}
                      styles={{
                        container: (a) => {
                          a.height = '46px';
                          return a;
                        },
                        control: (a) => {
                          a.height = '100%';
                          a.borderRadius = 0;
                          return a;
                        },
                      }}
                      defaultValue={
                        periodType === PERIOD_TYPE_MOVING
                          ? {
                              value: PERIOD_TYPE_MOVING,
                              label: 'Calendar days',
                              color: '#00B8D9',
                            }
                          : {
                              value: PERIOD_TYPE_AVAILABLE_MOVING,
                              label: 'Business days',
                              color: '#00B8D9',
                            }
                      }
                      name="color"
                      options={[
                        {
                          value: PERIOD_TYPE_MOVING,
                          label: 'Calendar days',
                          color: '#00B8D9',
                        },
                        {
                          value: PERIOD_TYPE_AVAILABLE_MOVING,
                          label: 'Business days',
                          color: '#00B8D9',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="gentle-flex">
                <div>into the future</div>
              </div>
            </div>
          </div>
          {/* fixed*/}
          <div className="mt-6 flex flex-row">
            <div
              className="gentle-flex pr-4 cursor-pointer"
              onClick={() => setPeriodType(PERIOD_TYPE_FIXED)}
            >
              {periodType === PERIOD_TYPE_FIXED ? (
                <i className="far fa-check-square" />
              ) : (
                <i className="far fa-square" />
              )}
            </div>
            <div
              className="flex flex-row flex-wrap cursor-pointer"
              onClick={() => setPeriodType(PERIOD_TYPE_FIXED)}
            >
              <div className="gentle-flex pr-4">With a date range</div>
              {periodType === PERIOD_TYPE_FIXED && (
                <DatePicker
                  setStartEndDate={setStartEndDate}
                  defaultStartDate={startDate}
                  defaultEndDate={endDate}
                />
              )}
            </div>
          </div>
          {/* unlimited*/}
          <div className="mt-6 flex flex-row">
            <div
              className="gentle-flex pr-4 cursor-pointer"
              onClick={() => setPeriodType(PERIOD_TYPE_UNLIMITED)}
            >
              {periodType === PERIOD_TYPE_UNLIMITED ? (
                <i className="far fa-check-square" />
              ) : (
                <i className="far fa-square" />
              )}
            </div>
            <div
              className="gentle-flex cursor-pointer"
              onClick={() => setPeriodType(PERIOD_TYPE_UNLIMITED)}
            >
              <div>Indefinitely into the future</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

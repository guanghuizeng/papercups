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

export default function BookingRangeContainer(props: any) {
  const context = useContext(EditingContext);
  const {value, setPeriodType, setMaxBookingTime, setStartEndDate} = context;
  const {period_type, max_booking_time, start_date, end_date} = value;

  const setMoving = () => {
    if (
      period_type !== PERIOD_TYPE_MOVING &&
      period_type !== PERIOD_TYPE_AVAILABLE_MOVING
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
          <div className="flex flex-row">
            <div
              className="gentle-flex pr-4 cursor-pointer"
              onClick={setMoving}
            >
              {period_type === PERIOD_TYPE_MOVING ||
              period_type === PERIOD_TYPE_AVAILABLE_MOVING ? (
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
                    defaultValue={max_booking_time / 24 / 60}
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
                        period_type === PERIOD_TYPE_MOVING
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
          <div className="mt-6 flex flex-row">
            <div
              className="gentle-flex pr-4 cursor-pointer"
              onClick={() => setPeriodType(PERIOD_TYPE_FIXED)}
            >
              {period_type === PERIOD_TYPE_FIXED ? (
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
              {period_type === PERIOD_TYPE_FIXED && (
                <DatePicker
                  setStartEndDate={setStartEndDate}
                  defaultStartDate={start_date}
                  defaultEndDate={end_date}
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
              {period_type === PERIOD_TYPE_UNLIMITED ? (
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

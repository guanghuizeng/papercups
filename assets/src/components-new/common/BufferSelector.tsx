import React, {useContext} from 'react';
import Select from 'react-select';
import {EditingContext} from '../../hooks/EditingContext';

const keys = [15, 30, 45, 60];

const DurationOptions = keys.map((key: number) => ({
  value: key,
  label: key + ' min',
  color: '#00B8D9',
}));

export default function BufferSelector() {
  const {
    value,
    setPeriodType,
    setMaxBookingTime,
    setStartEndDate,
    setDuration,
    setBeforeBufferTime,
    setAfterBufferTime,
  } = useContext(EditingContext);
  const {before_buffer_time, after_buffer_time} = value;

  console.log('Buffer', before_buffer_time, after_buffer_time);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="text-lg font-bold">Buffers</div>
      <div className="row-span-2 text-gray-500">
        Allocate time before or after the event that you can use to prepare for
        or wrap up from the event.
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-bold">Before event</div>
          <Select
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
            defaultValue={
              before_buffer_time
                ? DurationOptions.find(
                    ({value}) => value === before_buffer_time
                  )
                : null
            }
            placeholder={null}
            name="color"
            options={DurationOptions}
            onChange={(option) => {
              if (option) {
                const {value} = option;
                setBeforeBufferTime(value);
                console.log('Before', value);
              }
            }}
          />
        </div>
        <div>
          <div className="text-sm font-bold">After event</div>
          <Select
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
            defaultValue={
              after_buffer_time
                ? DurationOptions.find(({value}) => value === after_buffer_time)
                : null
            }
            placeholder={null}
            name="color"
            options={DurationOptions}
            onChange={(option) => {
              if (option) {
                const {value} = option;
                setAfterBufferTime(value);
                console.log('After', value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

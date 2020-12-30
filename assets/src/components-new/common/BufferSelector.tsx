import React from 'react';
import Select from 'react-select';

const keys = ['15', '30', '45', '60'];

const DurationOptions = keys.map((key: string) => ({
  value: key,
  label: key + ' min',
  color: '#00B8D9',
}));

export default function BufferSelector() {
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
            defaultValue={null}
            placeholder={null}
            name="color"
            options={DurationOptions}
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
            defaultValue={null}
            placeholder={null}
            name="color"
            options={DurationOptions}
          />
        </div>
      </div>
    </div>
  );
}

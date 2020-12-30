import React, {useState} from 'react';
import DotCheckStateless from './CircleCheckboxStateless';
import Select from 'react-select';

const keys = ['15', '30', '45', '60'];

const customKey = 'custom';

export default function DurationSelector() {
  const [value, setValue] = useState('15');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="text-lg font-bold">Duration</div>
      <div className="row-span-2 text-gray-500">
        Define how long your event will be. It can be as long as 12 hours.
      </div>
      <div>
        <div className="text-sm font-bold">Choose a duration</div>
        <div className="pt-2">
          <div className="flex flex-row flex-wrap">
            {keys.map((key) => {
              return (
                <div
                  key={key}
                  className="flex flex-row mr-3 cursor-pointer"
                  onClick={() => {
                    setValue(key);
                  }}
                >
                  <div className="center-v mr-1">
                    <DotCheckStateless value={value === key} />
                  </div>
                  <div>{key} min</div>
                </div>
              );
            })}
          </div>
          <div className="pt-2">
            <div className="text-sm font-bold">
              ... or choose a custom duration
            </div>
            <div className="flex flex-row pt-2">
              <div
                className="flex flex-row mr-3 cursor-pointer"
                onClick={() => {
                  setValue(customKey);
                }}
              >
                <div className="center-v mr-2">
                  <DotCheckStateless value={value === customKey} />
                </div>
                <div className="center-v mr-2">
                  <input
                    type="text"
                    className="border border-gray-400 cursor-text p-3  w-16 focus:outline-none focus:shadow-outline focus:border-blue-300"
                    value=""
                  />
                </div>
                <div className="center-v">
                  <div className="w-40 lg:w-48 cursor-pointer focus:outline-none focus:shadow-outline focus:border-blue-300">
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
                      defaultValue={{
                        value: 'min',
                        label: 'min',
                        color: '#00B8D9',
                      }}
                      name="color"
                      options={[
                        {value: 'min', label: 'min', color: '#00B8D9'},
                        {value: 'hrs', label: 'hrs', color: '#00B8D9'},
                      ]}
                    />
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

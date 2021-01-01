import React, {useContext, useState} from 'react';
import DotCheckStateless from './CircleCheckboxStateless';
import Select from 'react-select';
import {EditingContext} from '../../hooks/EditingContext';

const keys = [15, 30, 45, 60];

const customKey = 'custom';

export default function DurationSelector() {
  const {
    value,
    setPeriodType,
    setMaxBookingTime,
    setStartEndDate,
    setDuration,
  } = useContext(EditingContext);
  const {duration} = value;

  const [durationValue, setDurationValue] = useState(duration);
  const [custom, setCustom] = useState(
    keys.findIndex((k) => k === durationValue) < 0
  );

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
                    setCustom(false);
                    setDurationValue(key);
                    setDuration(key);
                  }}
                >
                  <div className="center-v mr-1">
                    <DotCheckStateless
                      value={!custom && durationValue === key}
                    />
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
                  setCustom(true);
                }}
              >
                <div className="center-v mr-2">
                  <DotCheckStateless value={custom} />
                </div>
                <div className="center-v mr-2">
                  <input
                    type="number"
                    className="border border-gray-400 cursor-text p-3  w-16 focus:outline-none focus:shadow-outline focus:border-blue-300"
                    defaultValue={custom ? durationValue : undefined}
                    onChange={(e) => {
                      console.log('on change', e.target.value);
                      if (e.target.value) {
                        setDurationValue(parseInt(e.target.value));
                        setDuration(parseInt(e.target.value));
                      } else {
                        setDuration(null);
                        setDurationValue(null);
                      }
                    }}
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

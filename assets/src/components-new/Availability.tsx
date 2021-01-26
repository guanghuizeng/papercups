import React from 'react';
import {useParams, Link} from 'react-router-dom';
import {useAppData} from '../hooks/AppDataProvider';
import TextField from './common/TextField';

function AvailabilityByDay({rule}: any) {
  const dayState = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map((d) => {
    return {
      day: d,
      checked: rule.byday.findIndex((day: string) => day === d) > -1,
    };
  });

  return (
    <>
      <div className="flex flex-row">
        {dayState.map((state) => {
          return (
            <div
              key={state.day}
              className="border-primary border-solid border mx-2"
            >
              <input type="checkbox" checked={state.checked} />
              {state.day}
            </div>
          );
        })}
      </div>
      <div>
        <label className="mx-2">{rule.startTime}</label>
        <label className="mx-2">{rule.endTime}</label>
      </div>
    </>
  );
}

export function Availability() {
  const {id} = useParams();

  const {availabilityPresets} = useAppData();
  const preset = availabilityPresets
    ? availabilityPresets.find((p) => p.id === id)
    : null;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <Link
          to={`/settings/links`}
          className="text-gray-400 hover:text-gray-700"
        >
          <i className="fas fa-times" />
        </Link>
        <TextField
          defaultValue={preset?.name}
          onChange={(value) => {
            console.log(value);
          }}
          className="h-12 text-lg"
        />

        <div>
          {preset?.rules.map((rule: any) => {
            return (
              <div key={`${rule.startTime}-${rule.endTime}`}>
                <AvailabilityByDay rule={rule} />
              </div>
            );
          })}
        </div>
      </div>
      <div>Calendar</div>
    </div>
  );
}

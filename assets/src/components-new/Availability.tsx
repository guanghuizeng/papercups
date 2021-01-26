import React from 'react';
import {useParams, Link} from 'react-router-dom';
import {useAppData} from '../hooks/AppDataProvider';
import TextField from './common/TextField';

export function Availability() {
  const {id} = useParams();

  const {availabilityPresets} = useAppData();
  const preset = availabilityPresets
    ? availabilityPresets.find((p) => p.id === id)
    : null;

  return (
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
              <div className="flex flex-row">
                {rule.byday.map((byday: string) => {
                  return (
                    <div className="mx-2 underline" key={byday}>
                      {byday}
                    </div>
                  );
                })}
              </div>
              <div>
                <label className="mx-2">{rule.startTime}</label>
                <label className="mx-2">{rule.endTime}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

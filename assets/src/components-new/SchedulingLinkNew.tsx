import React from 'react';
import * as API from '../api';
import {mutate} from 'swr';

export default function SchedulingLinkNew() {
  return (
    <div
      onClick={async () => {
        API.createSchedulingLink({
          name: 'Test link',
          location: 'loc1',
          description: 'description',
          url: '15min',
          color: 'red',
        }).then(() => {
          mutate(`/api/scheduling_links/`);
        });
      }}
    >
      New
    </div>
  );
}

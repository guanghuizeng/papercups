import React from 'react';
import * as API from '../api';
import {mutate} from 'swr';
import {useHistory} from 'react-router-dom';

export default function SchedulingLinkNew() {
  let history = useHistory();

  return (
    <div
      onClick={async () => {
        API.createSchedulingLink({
          name: '名称',
          location: 'loc1',
          description: '描述',
          url: '15min',
          color: 'red',
        }).then((r) => {
          console.log('Resp', r);
          mutate(`/api/scheduling_links/`);
          history.push(`/links/${r.data.id}`);
        });
      }}
    >
      New
    </div>
  );
}

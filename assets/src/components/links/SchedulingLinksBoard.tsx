import React from 'react';
import {Link} from 'react-router-dom';
import NavSidebar from '../common/NavSidebar';
import {Button} from '@geist-ui/react';
import {useSchedulingLinks} from '../../hooks/api-hooks';
import * as API from '../../api/api';
import {nanoid} from 'nanoid';
import {mutate} from 'swr';
import {useHistory} from 'react-router-dom';

export function SchedulingLinksBoard() {
  const history = useHistory();
  const {data: schedulingLinks} = useSchedulingLinks();
  const createSchedulingLinkAndRedirect = async () => {
    return API.createSchedulingLink({
      name: '未命名',
      description: '',
      durations: [30],
      location: 'loc1',
      url: nanoid(7),
      color: 'red',
      fields: [],
      email_reminders: [
        {
          quantity: 1,
          units: 'hours',
        },
      ],
      organizer: {
        availability: {
          mode: 'ranked',
          overrides: [],
          presets: ['39f52432cfa64661', 'ed0eb79a82ba137e', 'ff9e7d4dd2f506c5'],
          recurringIntervals: [],
        },
        avatarUrl:
          'https://secure.gravatar.com/avatar/fcb9bbfe7fa822090dce8a194ed9730d?s=256&d=404',
        calendarId: null,
        displayName: 'Yuanyuan Zhang',
      },
    }).then((r) => {
      console.log('Resp', r);
      mutate(`/api/scheduling_links/`);
      history.push(`/links/${r.id}/edit`);
      return r;
    });
  };

  return (
    <div className="w-full flex flex-row">
      <NavSidebar />
      <div className="w-full flex flex-col">
        <div className="Header bg-gray-100">
          <div className="flex flex-row justify-between w-full">
            <div className="gentle-flex py-1 w-24">
              <div className="font-bold">预约链接</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-y-1 flex-wrap">
          <div className="px-3 py-1">名称</div>
          <div className="px-3 py-1">时长</div>
          <div className="px-3 py-1">链接</div>
          <div className="px-3 py-1">操作</div>
          {schedulingLinks &&
            schedulingLinks.map((link: any) => {
              const {id, durations, url, name} = link;
              console.log('link', link);
              return (
                <React.Fragment key={id}>
                  <div className="px-3 py-1">{name}</div>
                  <div className="px-3 py-1">
                    {durations.map((d: number) => (
                      <span>{d}</span>
                    ))}
                    分钟
                  </div>
                  <div className="px-3 py-1 text-blue-500 hover:bg-blue-50 cursor-pointer rounded-md ">
                    /{url}
                  </div>

                  <div className="px-3 py-1">
                    <Link to={`/links/${id}/edit`}>
                      <Button size="mini">编辑</Button>
                    </Link>
                  </div>
                </React.Fragment>
              );
            })}
        </div>

        <div className="mt-2 p-2">
          <Button onClick={createSchedulingLinkAndRedirect}>新建</Button>
        </div>
      </div>
    </div>
  );
}

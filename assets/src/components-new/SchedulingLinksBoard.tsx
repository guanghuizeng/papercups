import React from 'react';
import {useAppData} from '../hooks/AppDataProvider';
import {Link} from 'react-router-dom';
import NavSidebar from './NavSidebar';
import {Button} from '@geist-ui/react';

export function SchedulingLinksBoard() {
  const {schedulingLinks, createSchedulingLinkAndRedirect} = useAppData();

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
                    <Link to={`/links/${id}`}>
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

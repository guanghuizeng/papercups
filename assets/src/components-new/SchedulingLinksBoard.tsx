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

            <button
              className="cursor-pointer hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2"
              onClick={createSchedulingLinkAndRedirect}
            >
              <svg
                className="group-hover:text-light-blue-600 text-light-blue-500 mr-2"
                width="12"
                height="20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
                />
              </svg>
              New
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-y-1 flex-wrap">
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
        <div>
          <Button onClick={createSchedulingLinkAndRedirect}>新建</Button>
        </div>
      </div>
    </div>
  );
}

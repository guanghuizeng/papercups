import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import * as API from '../api';
import {useAuth} from '../components/auth/AuthProvider';

export default function NavSidebar() {
  const auth = useAuth();
  const {pathname} = useLocation();
  return (
    <div
      className="w-full md:w-64 border-r-2 border-solid border-gray-100 pt-5"
      style={{backgroundColor: '#f2f2f2'}}
    >
      <div className="flex flex-col">
        <div className="pt-4 pb-4 pl-4">
          <div>曾光晖</div>
          <div className="text-sm text-blue-500">localhost/zgh</div>
        </div>
        <div>
          {[
            {
              icon: () => <i className="fas fa-link mr-2" />,
              url: '/links',
              name: '链接',
            },
            {
              icon: () => <i className="fas fa-calendar-check mr-2" />,
              url: '/events',
              name: '日程',
            },
            {
              icon: () => <i className="fas fa-cog mr-2" />,
              url: '/settings',
              name: '设置',
            },
            {
              icon: () => <i className="fas fa-cog mr-2" />,
              url: '/ycy/chat',
              name: 'Booking Page Preview',
            },
            // {url: '/availability', name: '时间管理'},
            // {url: '/workflows', name: '工作流'},
          ].map(({icon, url, name}) => {
            return (
              <Link to={url} key={url}>
                <div
                  className={`${
                    pathname === url ||
                    pathname.startsWith(url) ||
                    (pathname === '/' && url === '/links')
                      ? 'bg-gray-200 text-black'
                      : 'opacity-75'
                  } pl-4 py-2`}
                >
                  {icon && icon()}
                  {name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className="cursor-pointer hover:bg-gray-200 mt-20"
        onClick={() => {
          API.createSchedule().then((r) => {
            console.log('createSchedule', r);
          });
        }}
      >
        Create schedule
      </div>

      <div
        className="cursor-pointer hover:bg-gray-200 mt-20"
        onClick={() => {
          auth.logout();
        }}
      >
        Logout
      </div>
    </div>
  );
}

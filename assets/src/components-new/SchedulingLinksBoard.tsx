import React, {useEffect} from 'react';
import {
  SearchBox,
  ISearchBoxStyles,
  DefaultButton,
  PrimaryButton,
} from '@fluentui/react';
import {useAppData} from '../hooks/AppDataProvider';
import EventTypeCard from './EventTypeCard';
import SchedulingLinkCard from './SchedulingLinkCard';
import {Link, useLocation} from 'react-router-dom';
import * as API from '../api';
import {useAuth} from '../components/auth/AuthProvider';

const searchBoxStyles: Partial<ISearchBoxStyles> = {
  root: {width: 200, border: '0'},
};

export const SearchBoxSmallExample = () => (
  <SearchBox
    styles={searchBoxStyles}
    placeholder="Search"
    onEscape={(ev) => {
      console.log('Custom onEscape Called');
    }}
    onClear={(ev) => {
      console.log('Custom onClear Called');
    }}
    onChange={(_, newValue) =>
      console.log('SearchBox onChange fired: ' + newValue)
    }
    onSearch={(newValue) =>
      console.log('SearchBox onSearch fired: ' + newValue)
    }
  />
);

export function SchedulingLinksBoard() {
  const {
    schedulingLinks,
    createSchedulingLinkAndRedirect,
    availabilityPresets,
  } = useAppData();
  const auth = useAuth();
  const {pathname} = useLocation();

  return (
    <>
      <div
        className="w-full md:w-64 border-r-2 border-solid border-gray-100 pt-5"
        style={{backgroundColor: '#f2f2f2'}}
      >
        <div className="flex flex-col">
          <div className="pt-4 pb-4 pl-4">
            <div>杨超越</div>
            <div className="text-sm text-blue-500">letsmeet.com/ycy</div>
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
                icon: () => <i className="fas fa-code mr-2" />,
                url: '/apps',
                name: '应用',
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

      <div className="w-full flex flex-col">
        <div className="Header">
          <div className="flex flex-row justify-between w-full">
            <div>预约链接</div>
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
          {/*<div className="flex flex-row mb-2">*/}
          {/*  <Link to="/links/add" className="cursor-pointer mr-2 py-1 ">*/}
          {/*    <DefaultButton text="Add Event Type" />*/}
          {/*  </Link>*/}
          {/*  <div className="cursor-pointer mr-2 py-1 ">*/}
          {/*    <DefaultButton text="Copy Link" />*/}
          {/*  </div>*/}
          {/*  <div className="cursor-pointer  py-1 ">*/}
          {/*    <DefaultButton text="Add to Website" />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="gentle-flex mb-2">*/}
          {/*  <SearchBoxSmallExample />*/}
          {/*</div>*/}
        </div>
        <div className="flex flex-row flex-wrap">
          {schedulingLinks &&
            schedulingLinks.map((link: any) => {
              return (
                <div key={link.id} className="py-4 pl-4 mb-4 w-64 h-32">
                  <SchedulingLinkCard schedulingLink={link} />
                </div>
              );
            })}
          <div className="py-4 pl-4 w-64 h-32">
            {/*<button className="w-full h-full hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2">*/}
            {/*    <svg*/}
            {/*        className="group-hover:text-light-blue-600 text-light-blue-500 mr-2"*/}
            {/*        width="12"*/}
            {/*        height="20"*/}
            {/*        fill="currentColor"*/}
            {/*    >*/}
            {/*        <path*/}
            {/*            fill-rule="evenodd"*/}
            {/*            clip-rule="evenodd"*/}
            {/*            d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"*/}
            {/*        />*/}
            {/*    </svg>*/}
            {/*    New*/}
            {/*</button>*/}
            <li className="hover:shadow-lg flex hover:bg-light-blue-200 hover:text-light-blue-800 rounded-lg w-full h-full text-light-blue-600">
              <div
                onClick={createSchedulingLinkAndRedirect}
                className="cursor-pointer hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4"
              >
                新建
              </div>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

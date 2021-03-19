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
import NavSidebar from './NavSidebar';

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

  return (
    <div className="w-full flex flex-row">
      <NavSidebar />
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
    </div>
  );
}

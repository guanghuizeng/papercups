import React, {useEffect} from 'react';
import {useQuery, useQueryOne, useStore} from '../store';
import {Link} from 'react-router-dom';
import {useEvents} from './EventsProvider';
import {fetchSchedules, fetchUserProfile} from '../api';
import CreateEventTypeDialog from './events/CreateEventTypeModal';
import {
  SearchBox,
  ISearchBoxStyles,
  DefaultButton,
  PrimaryButton,
} from '@fluentui/react';
import EventTypeCard from './EventTypeCard';

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

export function EventTypes() {
  const {profile, eventTypes, fetchAllEventTypes} = useEvents();
  useEffect(() => {
    fetchAllEventTypes();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="Header">
        <div className="flex flex-row justify-between w-full">
          <div>预约链接</div>
          <button className="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2">
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
        {eventTypes.map((eventTypeId: any) => {
          return (
            <div key={eventTypeId} className="py-4 pl-4 mb-4 w-64 h-32">
              <EventTypeCard eventTypeId={eventTypeId} />
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
          <li className="hover:shadow-lg flex hover:bg-light-blue-100 hover:text-light-blue-700 rounded-lg w-full h-full">
            <a
              href="/new"
              className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4"
            >
              新建
            </a>
          </li>
        </div>
      </div>
    </div>
  );
}

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
          <div>+</div>
        </div>
        {/*<div className="flex flex-row mb-2">*/}
        {/*  <Link to="/event_types/add" className="cursor-pointer mr-2 py-1 ">*/}
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
            <div key={eventTypeId} className="pt-4 pl-4">
              <EventTypeCard eventTypeId={eventTypeId} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

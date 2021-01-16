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
            <div key={eventTypeId} className="pt-4 pl-4">
              <div className="group cursor-pointer rounded-lg p-4 border border-gray-200 hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg">
                <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                  <div>
                    <dt className="sr-only">Title</dt>
                    <dd className="leading-6 font-medium text-black group-hover:text-white">
                      New Benefits Plan
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Category</dt>
                    <dd className="text-sm font-medium group-hover:text-light-blue-200 sm:mb-4 lg:mb-0 xl:mb-4">
                      Human Resources
                    </dd>
                  </div>
                  <div className="col-start-2 row-start-1 row-end-3">
                    <dt className="sr-only">Users</dt>
                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
                      <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                        alt=""
                        width="48"
                        height="48"
                        className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                        loading="lazy"
                      />
                    </dd>
                  </div>
                </dl>
              </div>
              {/*<EventTypeCard eventTypeId={eventTypeId} />*/}
            </div>
          );
        })}
      </div>
    </div>
  );
}

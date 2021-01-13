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

const searchBoxStyles: Partial<ISearchBoxStyles> = {root: {width: 200}};

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
    <div className="container lg:px-10 inner-container mx-auto lg:px-8 py-4 flex flex-col">
      <div className="mt-6 py-4 text-3xl font-medium">预约类型</div>

      <section className="pt-10 text-gray-700 body-font">
        <div className="border-b border-gray-500 flex flex-row justify-between">
          <div className="gentle-flex mb-2">
            <SearchBoxSmallExample />
          </div>
          <div className="flex flex-row mb-2">
            <Link to="/event_types/add" className="cursor-pointer mr-2 py-1 ">
              <DefaultButton text="Add Event Type" />
            </Link>
            <div className="cursor-pointer mr-2 py-1 ">
              <DefaultButton text="Copy Link" />
            </div>
            <div className="cursor-pointer  py-1 ">
              <DefaultButton text="Add to Website" />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1">
          {eventTypes.map((eventTypeId: any) => {
            return (
              <div key={eventTypeId} className="pt-4 pl-4">
                <EventTypeCard eventTypeId={eventTypeId} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// export default function Home() {
//   const [store, setStore] = useStore();
//
//   useEffect(() => {
//     setStore('1', conn, db);
//   }, []);
//
//   if (!store) {
//     return <div>Loading...</div>;
//   }
//
//   return <AppContent />;
// }
// export function Home() {
//   const {currentUser, account, profile, eventTypes, createEventType, fetchAllEventTypes} = useEvents();
//
//   console.log('Home', currentUser, account, profile)
//
//   return (
//     <div className="flex flex-col">
//       <div
//         onClick={() => {
//           console.log('click');
//           createEventType();
//         }}
//       >
//         Create
//       </div>
//       <div
//         onClick={() => {
//           fetchAllEventTypes();
//         }}
//       >
//         List
//       </div>
//       <div
//         onClick={() => {
//           fetchUserProfile().then(r => console.log(r))
//         }}
//       >
//         List
//       </div>
//     </div>
//   );
// }

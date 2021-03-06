import React, {useEffect} from 'react';
import {useQuery, useQueryOne, useStore} from '../store';
import {Link} from 'react-router-dom';
import {useEvents} from './EventsProvider';
import {fetchUserProfile} from '../api';
import CreateEventTypeDialog from './events/CreateEventTypeModal';

function EventTypeCard({eventTypeId}: any) {
  const {eventTypesById} = useEvents();
  const eventType = eventTypesById[eventTypeId];
  const {id, name, description, url, enabled} = eventType;

  return (
    <div className="m-3 h-48 shadow-lg ">
      <div className="border-t-4 border-red-500 ">
        <Link to={{pathname: `/event_type/${id}`}}>
          <div className="cursor-pointer">
            <div className="flex flex-row justify-between px-4 pt-4">
              <div className="border-2 border-gray-500 w-4 h-4"></div>
              <div className="w-4 h-4">#</div>
            </div>
            <div className="px-4 py-4 border-b border-gray-300">
              <div className="text-xl">{name}</div>
              <div className="text-gray-500">{description}</div>
            </div>
          </div>
        </Link>
        <div className="py-4 px-4 flex flex-row justify-between">
          <div>
            <a
              href="#"
              className="block text-sm text-green-500 hover:underline"
              role="menuitem"
            >
              /{url}
            </a>
          </div>
          <div className="cursor-pointer hover:bg-green-200 text-green-500 border border-green-500 rounded-md px-1">
            Copy link
          </div>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const {profile, eventTypes, fetchAllEventTypes} = useEvents();

  // const user = useQueryOne(
  //   '[:find ?u ?l ?n ?em :in $ ?l :where [?e ":user/uid" ?u] [?e ":user/login" ?l]  [?e ":user/name" ?n]  [?e ":user/email" ?em]]',
  //   'yyz',
  //   ([id, login, name, email]: any) => ({id, login, name, email})
  // );

  // const eventTypes = useQuery(
  //   '[:find ?evt :in $ ?l :where [?ue ":user/login" ?l] [?ue ":user/eventTypes" ?evt] [?ee ":eventType/uid" ?evt]]',
  //   'yyz',
  //   ([id]: any) => ({id})
  // );
  //
  // console.log('user', user);
  // console.log('event types', eventTypes);

  useEffect(() => {
    fetchAllEventTypes();
  }, []);

  return (
    <div>
      <section className="text-gray-700 body-font">
        <div className="shadow-lg">
          <div className="container mx-auto inner-container flex px-5 pt-4 flex-col ">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 ">
              <h1 className="my-3 text-3xl font-bold leading-tight text-gray-900">
                My time
              </h1>
              <div className="flex flex-row">
                <div className="pt-2 pr-4 cursor-pointer">
                  <div className="border-b-4 border-green-600">Event Types</div>
                </div>
                <div className="pt-2 pr-4 cursor-pointer">Scheduled Events</div>
                <div className="pt-2 pr-4 cursor-pointer">Workflows</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font">
        <div className="container inner-container px-5 py-4 mx-auto flex flex-wrap flex-col">
          <div className="py-2 flex flex-row">
            <div className="mr-2">
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="14" cy="8" r="7.5" fill="white" stroke="#4D5055" />
                <line
                  x1="9.37165"
                  y1="13.3345"
                  x2="0.371647"
                  y2="23.3345"
                  stroke="black"
                />
              </svg>
            </div>
            <div className="text-gray-500">Filter</div>
          </div>
          <div className="mt-4 pb-4 border-b border-gray-500 flex flex-row justify-between">
            <div className="flex flex-row">
              <div className="mr-4 border-gray-500 border rounded-full">
                Avatar
              </div>
              <div>
                <div>{profile && profile.display_name}</div>
                <a
                  href="#"
                  className="block text-sm text-green-500"
                  role="menuitem"
                >
                  {/*mytime.com/{user.login}*/}
                </a>
              </div>
            </div>
            <div className="flex flex-row">
              <div>
                <Link to="/event_type/add">
                  <div className="text-green-500 border-2 border-green-500 rounded px-2 cursor-pointer">
                    + New Event Type
                  </div>
                </Link>
              </div>
              <div className="mx-2 px-2">Settings</div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1">
            {eventTypes.map((eventTypeId: any) => {
              return (
                <div key={eventTypeId}>
                  <EventTypeCard eventTypeId={eventTypeId} />
                </div>
              );
            })}
          </div>
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

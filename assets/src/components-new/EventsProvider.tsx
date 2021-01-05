import React, {useContext} from 'react';
import _ from 'lodash';

import * as API from '../api';

export const EventsContext = React.createContext<{
  loading: boolean;
  account: any;
  currentUser: any;
  profile: any;
  settings: any;
  isNewUser: boolean;

  eventTypesById: {[key: string]: any};
  eventTypes: Array<any>;
  schedules: Array<any>;
  schedulesById: {[key: string]: any};

  createEventType: (any: any) => Promise<any>;
  onUpdateEventType: (eventTypeId: string, any: any) => Promise<any>;
  fetchAllEventTypes: () => Promise<any>;
  fetchAllSchedules: () => Promise<any>;
}>({
  loading: true,
  account: null,
  currentUser: null,
  profile: null,
  settings: null,
  isNewUser: false,

  eventTypesById: {},
  eventTypes: [],
  schedules: [],
  schedulesById: {},

  createEventType: (any: any) => Promise.resolve({}),
  onUpdateEventType: (eventTypeId: string, any: any) => Promise.resolve({}),
  fetchAllEventTypes: () => Promise.resolve([]),
  fetchAllSchedules: () => Promise.resolve([]),
});

export const useEvents = () => useContext(EventsContext);

type Props = React.PropsWithChildren<{}>;
type State = {
  loading: boolean;
  account: any | null;
  currentUser: any | null;
  profile: any | null;
  settings: any | null;
  isNewUser: boolean;

  eventTypesById: {[key: string]: any};
  eventTypes: Array<any>;
  schedules: Array<any>;
  schedulesById: {[key: string]: any};
};
export class EventsProvider extends React.Component<Props, State> {
  state: State = {
    loading: true,
    account: null,
    currentUser: null,
    profile: null,
    settings: null,
    isNewUser: false,

    eventTypesById: {},
    eventTypes: [],
    schedules: [],
    schedulesById: {},
  };

  async componentDidMount() {
    const [
      currentUser,
      account,
      profile,
      settings,
      eventTypes,
    ] = await Promise.all([
      API.me(),
      API.fetchAccountInfo(),
      API.fetchUserProfile(),
      API.fetchUserSettings(),
      API.fetchEventTypes(),
    ]);

    const eventTypesById = _.keyBy(eventTypes, 'id');

    console.log('events', settings);

    this.setState({
      currentUser,
      profile,
      settings,
      account,
      eventTypes: eventTypes.map((t: any) => t.id),
      eventTypesById,
    });
  }

  createEventType = async (value: any) => {
    console.log('createEventType');
    try {
      await API.createEventType(value);
    } catch (e) {
      console.log('Create err', e);
    }
  };

  handleUpdateEventType = async (eventTypeId: string, params: any) => {
    const {eventTypesById} = this.state;
    const existing = eventTypesById[eventTypeId];

    this.setState({
      eventTypesById: {
        ...eventTypesById,
        [eventTypeId]: {...existing, ...params},
      },
    });

    try {
      await API.updateEventType(eventTypeId, {event_type: params});
    } catch (err) {
      this.setState({
        eventTypesById: eventTypesById,
      });
    }
  };

  fetchAllEventTypes = async (): Promise<Array<any>> => {
    const eventTypes = await API.fetchEventTypes();
    const eventTypesById = _.keyBy(eventTypes, 'id');

    this.setState({
      eventTypes: eventTypes.map((t: any) => t.id),
      eventTypesById,
    });

    return eventTypes;
  };

  fetchAllSchedules = async (): Promise<Array<any>> => {
    const schedules = await API.fetchSchedules();
    const schedulesById = _.keyBy(schedules, 'id');

    this.setState({
      schedules: schedules.map((t: any) => t.id),
      schedulesById,
    });

    return schedules;
  };

  render() {
    const {
      loading,
      account,
      currentUser,
      profile,
      settings,
      isNewUser,

      eventTypesById,
      eventTypes,
      schedules,
      schedulesById,
    } = this.state;
    return (
      <EventsContext.Provider
        value={{
          loading,
          account,
          currentUser,
          profile,
          settings,
          isNewUser,

          eventTypesById,
          eventTypes,
          schedules,
          schedulesById,

          createEventType: this.createEventType,
          onUpdateEventType: this.handleUpdateEventType,
          fetchAllEventTypes: this.fetchAllEventTypes,
          fetchAllSchedules: this.fetchAllSchedules,
        }}
      >
        {this.props.children}
      </EventsContext.Provider>
    );
  }
}

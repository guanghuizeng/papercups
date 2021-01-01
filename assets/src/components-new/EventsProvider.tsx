import React, {useContext} from 'react';
import _ from 'lodash';

import * as API from '../api';

export const EventsContext = React.createContext<{
  loading: boolean;
  account: any;
  currentUser: any;
  profile: any;
  isNewUser: boolean;

  eventTypesById: {[key: string]: any};
  eventTypes: Array<any>;

  createEventType: (any: any) => Promise<any>;
  onUpdateEventType: (eventTypeId: string, any: any) => Promise<any>;
  fetchAllEventTypes: () => Promise<any>;
}>({
  loading: true,
  account: null,
  currentUser: null,
  profile: null,
  isNewUser: false,

  eventTypesById: {},
  eventTypes: [],

  createEventType: (any: any) => Promise.resolve({}),
  onUpdateEventType: (eventTypeId: string, any: any) => Promise.resolve({}),
  fetchAllEventTypes: () => Promise.resolve([]),
});

export const useEvents = () => useContext(EventsContext);

type Props = React.PropsWithChildren<{}>;
type State = {
  loading: boolean;
  account: any | null;
  currentUser: any | null;
  profile: any | null;
  isNewUser: boolean;

  eventTypesById: {[key: string]: any};
  eventTypes: Array<any>;
};
export class EventsProvider extends React.Component<Props, State> {
  state: State = {
    loading: true,
    account: null,
    currentUser: null,
    profile: null,
    isNewUser: false,

    eventTypesById: {},
    eventTypes: [],
  };

  async componentDidMount() {
    const [currentUser, account, profile, eventTypes] = await Promise.all([
      API.me(),
      API.fetchAccountInfo(),
      API.fetchUserProfile(),
      API.fetchEventTypes(),
    ]);

    const eventTypesById = _.keyBy(eventTypes, 'id');

    this.setState({
      currentUser,
      profile,
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

  render() {
    const {
      loading,
      account,
      currentUser,
      profile,
      isNewUser,
      eventTypesById,
      eventTypes,
    } = this.state;
    return (
      <EventsContext.Provider
        value={{
          loading,
          account,
          currentUser,
          profile,
          isNewUser,

          eventTypesById,
          eventTypes,

          createEventType: this.createEventType,
          onUpdateEventType: this.handleUpdateEventType,
          fetchAllEventTypes: this.fetchAllEventTypes,
        }}
      >
        {this.props.children}
      </EventsContext.Provider>
    );
  }
}

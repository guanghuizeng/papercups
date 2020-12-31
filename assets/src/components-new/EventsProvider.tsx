import React, {useContext} from 'react';
import * as API from '../api';

export const EventsContext = React.createContext<{
  loading: boolean;
  account: any;
  currentUser: any;
  profile: any;
  isNewUser: boolean;

  eventTypes: Array<any>;

  createEventType: (any: any) => Promise<any>;
  fetchAllEventTypes: () => Promise<any>;
}>({
  loading: true,
  account: null,
  currentUser: null,
  profile: null,
  isNewUser: false,

  eventTypes: [],

  createEventType: (any: any) => Promise.resolve({}),
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

  eventTypes: Array<any>;
};
export class EventsProvider extends React.Component<Props, State> {
  state: State = {
    loading: true,
    account: null,
    currentUser: null,
    profile: null,
    isNewUser: false,

    eventTypes: [],
  };

  async componentDidMount() {
    const [currentUser, account, profile, eventTypes] = await Promise.all([
      API.me(),
      API.fetchAccountInfo(),
      API.fetchUserProfile(),
      API.fetchEventTypes(),
    ]);

    this.setState({
      currentUser,
      profile,
      account,
      eventTypes,
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

  fetchAllEventTypes = async (): Promise<Array<any>> => {
    const eventTypes = await API.fetchEventTypes();
    this.setState({
      eventTypes,
    });

    console.log('Fetch', eventTypes);
    return eventTypes;
  };

  render() {
    const {
      loading,
      account,
      currentUser,
      profile,
      isNewUser,
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

          eventTypes,
          createEventType: this.createEventType,
          fetchAllEventTypes: this.fetchAllEventTypes,
        }}
      >
        {this.props.children}
      </EventsContext.Provider>
    );
  }
}

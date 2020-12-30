import React, {useContext} from 'react';
import * as API from '../api';

export const EventsContext = React.createContext<{
  eventTypes: Array<any>;

  createEventType: () => Promise<any>;
  fetchAllEventTypes: () => Promise<any>;
}>({
  eventTypes: [],

  createEventType: () => Promise.resolve({}),
  fetchAllEventTypes: () => Promise.resolve([]),
});

export const useEvents = () => useContext(EventsContext);

type Props = React.PropsWithChildren<{}>;
type State = {
  eventTypes: Array<any>;
};
export class EventsProvider extends React.Component<Props, State> {
  state: State = {
    eventTypes: [],
  };

  async componentDidMount() {
    const [eventTypes] = await Promise.all([API.fetchEventTypes()]);

    this.setState({
      eventTypes,
    });
  }

  createEventType = async () => {
    console.log('createEventType');
    try {
      await API.createEventType();
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
    const {eventTypes} = this.state;
    return (
      <EventsContext.Provider
        value={{
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

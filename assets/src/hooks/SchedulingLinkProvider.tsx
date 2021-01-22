import React, {useContext, useState} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import {getAccessToken} from '../api';
import {fetchWithToken} from './utils';
import {useAppData} from './AppDataProvider';

export const SchedulingLinkContext = React.createContext<{
  slug: string;
  name: string;
  description: string;
  durations: string[];
  location: string;
  availability: any;
  availabilityPresets: any[];
  availabilityOverrides: any[];

  updateSlug: (value: string) => Promise<any>;
  updateName: (value: string) => Promise<any>;
  updateDescription: (value: string) => Promise<any>;
  updateDurations: (value: string[]) => Promise<any>;
  updateAvailability: (value: any) => Promise<any>;
  updateAvailabilityOverrides: (value: any) => Promise<any>;
}>({
  slug: '',
  name: '',
  description: '',
  durations: [''],
  location: '',
  availability: {},
  availabilityPresets: [],
  availabilityOverrides: [],

  updateSlug: (value: string) => Promise.resolve({}),
  updateName: (value: string) => Promise.resolve({}),
  updateDescription: (value: string) => Promise.resolve({}),
  updateDurations: (value: string[]) => Promise.resolve({}),
  updateAvailability: (value: any) => Promise.resolve({}),
  updateAvailabilityOverrides: (value: any) => Promise.resolve({}),
});

export const useSchedulingLink = () => useContext(SchedulingLinkContext);

type Props = React.PropsWithChildren<{
  linkId: string;
}>;

const SchedulingLinkProvider = (props: Props) => {
  const {link, isLoading, isError} = useLink(props.linkId);
  const {getAvailabilityPresets} = useAppData();
  const [overrides, setOverrides] = useState<any[]>([
    {
      startAt: '2021-01-19T02:00:00Z',
      endAt: '2021-01-19T07:00:00Z',
      type: 'block',
    },
    {
      startAt: '2021-01-18T02:00:00Z',
      endAt: '2021-01-18T08:00:00Z',
      type: 'block',
    },
    {
      startAt: '2021-01-23T02:00:00Z',
      endAt: '2021-01-23T08:00:00Z',
      type: 'allow',
    },
  ]);
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  const _update = (newValue: any) => {
    return mutate(
      `/api/event_types/${props.linkId}`,
      {...link, ...newValue},
      false
    );
  };

  const _revalidate = () => {
    mutate(`/api/event_types/${props.linkId}`);
  };

  const updateSlug = (value: string) => {
    _update({slug: value});
    // await API.updateSchedulingLinkSlug
    _revalidate();
    return Promise.resolve();
  };

  const updateName = (value: string) => {
    _update({name: value});
    // await API.updateSchedulingLinkName
    _revalidate();
    return Promise.resolve();
  };

  const updateDescription = (value: string) => {
    _update({description: value});
    // await API.updateSchedulingLinkDescription
    _revalidate();
    return Promise.resolve();
  };

  const updateDurations = (value: string[]) => {
    _update({description: value});
    // await API.updateSchedulingLinkDescription
    _revalidate();
    return Promise.resolve();
  };

  const updateAvailability = (value: any) => {
    _update({description: value});
    // await API.updateSchedulingLinkDescription
    _revalidate();
    return Promise.resolve();
  };

  const updateAvailabilityOverrides = (value: any) => {
    setOverrides(value);
    return Promise.resolve();
  };

  return (
    <SchedulingLinkContext.Provider
      value={{
        slug: link.slug,
        name: link.name,
        description: link.description,
        durations: link.durations,
        location: link.location,
        availability: link.organizer?.availability,
        availabilityPresets: [
          {
            byday: ['一', '二', '三', '四', '五'],
            endTime: 1020,
            startTime: 540,
          },
          {
            byday: ['一', '二'],
            endTime: 1080,
            startTime: 720,
          },
          {
            byday: ['一', '二', '三', '四', '五'],
            endTime: 1380,
            startTime: 1200,
          },
        ],
        availabilityOverrides: overrides,

        updateSlug,
        updateName,
        updateDescription,
        updateDurations,
        updateAvailability,
        updateAvailabilityOverrides,
      }}
    >
      {props.children}
    </SchedulingLinkContext.Provider>
  );
};

// hooks
function useLink(id: string, token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/event_types/${id}`, (url) =>
    fetchWithToken(url, token)
  );
  console.log('Use link', data);
  return {
    link: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default SchedulingLinkProvider;

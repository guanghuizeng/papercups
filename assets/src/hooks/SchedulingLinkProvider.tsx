import React, {useContext, useEffect, useState} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import {useAppData} from './AppDataProvider';
import {useLink} from '../api-hooks';
import * as API from '../api';

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
  updateLocation: (value: string) => Promise<any>;
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
  updateLocation: (value: string) => Promise.resolve({}),
  updateAvailability: (value: any) => Promise.resolve({}),
  updateAvailabilityOverrides: (value: any) => Promise.resolve({}),
});

export const useSchedulingLink = () => useContext(SchedulingLinkContext);

type Props = React.PropsWithChildren<{
  linkId: string;
}>;

const SchedulingLinkProvider = (props: Props) => {
  const {link, isLoading, isError} = useLink(props.linkId);
  const {settings, getAvailabilityPresets} = useAppData();
  const [presets, setPresets] = useState<any[]>([]);

  console.log('Scheduling Link Provider', link);

  useEffect(() => {
    setPresets(getAvailabilityPresets(''));
  }, [settings, link]);

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
      {data: {...link, ...newValue}},
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

  const updateLocation = async (value: string) => {
    _update({location: value});
    await API.updateEventType(link.id, {location: value});
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
        availabilityPresets: presets,
        availabilityOverrides: overrides,

        updateSlug,
        updateName,
        updateDescription,
        updateDurations,
        updateLocation,
        updateAvailability,
        updateAvailabilityOverrides,
      }}
    >
      {props.children}
    </SchedulingLinkContext.Provider>
  );
};

// hooks

export default SchedulingLinkProvider;

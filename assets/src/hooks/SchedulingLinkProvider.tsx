import React, {useContext, useEffect, useState} from 'react';
import useSWR, {mutate} from 'swr';
import {useAppData} from './AppDataProvider';
import {useLink} from '../api-hooks';
import * as API from '../api';
import _ from 'lodash';

export const SchedulingLinkContext = React.createContext<{
  slug: string;
  name: string;
  description: string;
  durations: string[];
  location: string;
  availability: any;
  availabilityPresets: string[];
  availabilityPresetsIntervals: any[];
  availabilityOverrides: any[];
  fields: any[];
  bufferBefore: number;
  bufferAfter: number;
  limitBookingTime: number;
  emailReminders: any[];
  organizer: any;

  updateSlug: (value: string) => Promise<any>;
  updateName: (value: string) => Promise<any>;
  updateDescription: (value: string) => Promise<any>;
  updateDurations: (value: number[]) => Promise<any>;
  updateLocation: (value: string) => Promise<any>;
  updateAvailability: (value: any) => Promise<any>;
  updateAvailabilityPresets: (value: string[] | null) => Promise<any>;
  updateAvailabilityOverrides: (value: any) => Promise<any>;

  updateSchedulingLink: (value: any) => Promise<any>;
}>({
  slug: '',
  name: '',
  description: '',
  durations: [''],
  location: '',
  availability: {},
  availabilityPresets: [],
  availabilityPresetsIntervals: [],
  availabilityOverrides: [],
  fields: [],
  bufferBefore: 0,
  bufferAfter: 0,
  limitBookingTime: 0,
  emailReminders: [],
  organizer: {},

  updateSlug: (value: string) => Promise.resolve({}),
  updateName: (value: string) => Promise.resolve({}),
  updateDescription: (value: string) => Promise.resolve({}),
  updateDurations: (value: number[]) => Promise.resolve({}),
  updateLocation: (value: string) => Promise.resolve({}),
  updateAvailability: (value: any) => Promise.resolve({}),
  updateAvailabilityPresets: (value: string[] | null) => Promise.resolve({}),
  updateAvailabilityOverrides: (value: any) => Promise.resolve({}),

  updateSchedulingLink: (value: any) => Promise.resolve({}),
});

export const useSchedulingLink = () => useContext(SchedulingLinkContext);

type Props = React.PropsWithChildren<{
  linkId: string;
}>;

const SchedulingLinkProvider = (props: Props) => {
  const {data: link, isLoading, isError} = useLink(props.linkId);
  const {settings, getAvailabilityPresetsById} = useAppData();
  const [presetsIntervals, setPresetsIntervals] = useState<any[]>([]);

  useEffect(() => {
    if (link && link.organizer && link.organizer.availability) {
      setPresetsIntervals(
        getAvailabilityPresetsById(link.organizer.availability.presets)
      );
    }
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
      `/api/scheduling_links/${props.linkId}`,
      {data: {...link, ...newValue}},
      false
    );
  };

  const _revalidate = () => {
    mutate(`/api/scheduling_links/${props.linkId}`);
    mutate('/api/scheduling_links/');
  };

  const updateSlug = async (value: string) => {
    _update({slug: value});
    await API.updateSchedulingLink(link.id, {slug: value});
    _revalidate();
    return Promise.resolve();
  };

  const updateName = async (value: string) => {
    _update({name: value});
    await API.updateSchedulingLink(link.id, {name: value});
    _revalidate();
    return Promise.resolve();
  };

  const updateDescription = async (value: string) => {
    _update({description: value});
    await API.updateSchedulingLink(link.id, {description: value});
    _revalidate();
    return Promise.resolve();
  };

  const updateDurations = async (value: number[]) => {
    _update({durations: value});
    await API.updateSchedulingLink(link.id, {durations: value});
    _revalidate();
    return Promise.resolve();
  };

  const updateLocation = async (value: string) => {
    _update({location: value});
    await API.updateSchedulingLink(link.id, {location: value});
    _revalidate();
    return Promise.resolve();
  };

  const updateAvailability = (value: any) => {
    _update({description: value});
    // await API.updateSchedulingLinkDescription
    _revalidate();
    return Promise.resolve();
  };

  const updateAvailabilityPresets = async (value: string[] | null) => {
    if (link.organizer) {
      const clone = _.cloneDeep(link.organizer);
      return updateSchedulingLink({
        organizer: {
          ...clone,
          availability: {
            ...clone.availability,
            presets: value,
          },
        },
      });
    } else {
      return updateSchedulingLink({
        organizer: {
          availability: {
            presets: value,
          },
        },
      });
    }
  };

  const updateAvailabilityOverrides = (value: any) => {
    setOverrides(value);
    return Promise.resolve();
  };

  const updateSchedulingLink = async (updates: any) => {
    _update(updates);
    await API.updateSchedulingLink(link.id, updates);
    _revalidate();
    return Promise.resolve();
  };

  return (
    <SchedulingLinkContext.Provider
      value={{
        slug: link.url,
        name: link.name,
        description: link.description,
        durations: link.durations,
        location: link.location,
        availability: link.organizer?.availability,
        availabilityPresets: link.organizer?.availability?.presets,
        availabilityPresetsIntervals: presetsIntervals,
        availabilityOverrides: overrides,
        fields: link.fields,
        bufferBefore: link.before_buffer_time,
        bufferAfter: link.after_buffer_time,
        limitBookingTime: link.max_booking_time,
        emailReminders: link.email_reminders,
        organizer: {
          id: '',
          avatarUrl:
            'https://secure.gravatar.com/avatar/fcb9bbfe7fa822090dce8a194ed9730d?s=256&d=404',
          displayName: 'Yuanyuan Zhang',
          availability: {
            mode: 'ranked',
            overrides: [],
            presets: ['1ac33b81-c2cc-43be-90e5-2cd25685bfd8'],
            recurringIntervals: [],
          },
        },

        updateSlug,
        updateName,
        updateDescription,
        updateDurations,
        updateLocation,
        updateAvailability,
        updateAvailabilityPresets,
        updateAvailabilityOverrides,

        updateSchedulingLink,
      }}
    >
      {props.children}
    </SchedulingLinkContext.Provider>
  );
};

export default SchedulingLinkProvider;

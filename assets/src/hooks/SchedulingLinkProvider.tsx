import React, {useContext} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import {getAccessToken} from '../api';
import {fetchWithToken} from './utils';

export const SchedulingLinkContext = React.createContext<{
  slug: string;
  name: string;
  description: string;
  durations: string[];
  location: string;

  updateSlug: (value: string) => Promise<any>;
  updateName: (value: string) => Promise<any>;
  updateDescription: (value: string) => Promise<any>;
  updateDurations: (value: string[]) => Promise<any>;
}>({
  slug: '',
  name: '',
  description: '',
  durations: [''],
  location: '',

  updateSlug: (value: string) => Promise.resolve({}),
  updateName: (value: string) => Promise.resolve({}),
  updateDescription: (value: string) => Promise.resolve({}),
  updateDurations: (value: string[]) => Promise.resolve({}),
});

export const useSchedulingLink = () => useContext(SchedulingLinkContext);

type Props = React.PropsWithChildren<{
  linkId: string;
}>;

const SchedulingLinkProvider = (props: Props) => {
  const {link, isLoading, isError} = useLink(props.linkId);

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

  return (
    <SchedulingLinkContext.Provider
      value={{
        slug: link.slug,
        name: link.name,
        description: link.description,
        durations: link.durations,
        location: link.location,

        updateSlug,
        updateName,
        updateDescription,
        updateDurations,
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

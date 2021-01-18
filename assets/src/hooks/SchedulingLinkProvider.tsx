import React, {useContext} from 'react';
import _ from 'lodash';
import useSWR, {mutate} from 'swr';
import {getAccessToken} from '../api';
import {fetchWithToken} from './utils';

export const SchedulingLinkContext = React.createContext<{
  name: string;
  description: string;
  slug: string;
  location: string;

  updateName: (value: string) => Promise<any>;
}>({
  name: '',
  description: '',
  slug: '',
  location: '',

  updateName: (value: string) => Promise.resolve({}),
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

  const updateName = (value: string) => {
    _update({name: value});
    // await API.updateSchedulingLinkName
    // _revalidate()
    return Promise.resolve();
  };

  return (
    <SchedulingLinkContext.Provider
      value={{
        name: link.name,
        description: link.description,
        slug: link.slug,
        location: link.location,

        updateName,
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

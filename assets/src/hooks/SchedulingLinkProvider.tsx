import React, {useContext} from 'react';
import _ from 'lodash';
import useSWR from 'swr';
import {getAccessToken} from '../api';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
const fetchWithToken = (url: string, token: string) =>
  fetcher(url, {
    headers: {
      Authorization: token,
    },
  });

export const SchedulingLinkContext = React.createContext<{
  schedulingLink: any;
}>({
  schedulingLink: {},
});

export const useSchedulingLink = () => useContext(SchedulingLinkContext);

type Props = React.PropsWithChildren<{
  linkId: string;
}>;

const SchedulingLinkProvider = (props: Props) => {
  const {link} = useLink(props.linkId);

  return (
    <SchedulingLinkContext.Provider
      value={{
        schedulingLink: link,
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
    link: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default SchedulingLinkProvider;

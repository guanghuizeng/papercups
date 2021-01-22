import {getAccessToken} from './api';
import useSWR from 'swr';
import {fetchWithToken} from './hooks/utils';

export function useSchedulingLinks(token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/event_types/`, (url) =>
    fetchWithToken(url, token)
  );
  return {
    data: data ? data.data : [],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useLink(id: string, token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/event_types/${id}`, (url) =>
    fetchWithToken(url, token)
  );
  return {
    link: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useUserSettings(token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/user_settings`, (url) =>
    fetchWithToken(url, token)
  );

  return {
    data: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

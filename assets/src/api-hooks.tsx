import {getAccessToken} from './api';
import useSWR from 'swr';
import {fetchWithToken, fetchWithoutToken} from './hooks/utils';

export function useSchedulingLinks(token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/scheduling_links`, (url) =>
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

  const {data, error} = useSWR(`/api/scheduling_links/${id}`, (url) =>
    fetchWithToken(url, token)
  );

  return {
    data: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useSchedulingLinkBySlug(
  userSlug: string,
  schedulingLinkSlug: string
) {
  const {
    data,
    error,
  } = useSWR(
    `/api/public/scheduling_links?user=${userSlug}&link=${schedulingLinkSlug}`,
    (url) => fetchWithoutToken(url)
  );

  return {
    data: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useUserProfile(token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/profile/`, (url) =>
    fetchWithToken(url, token)
  );

  return {
    data: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useUserSettings(token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/user_settings/`, (url) =>
    fetchWithToken(url, token)
  );

  return {
    data: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSchedules(token = getAccessToken()) {
  if (!token) {
    throw new Error('Invalid token!');
  }

  const {data, error} = useSWR(`/api/schedules`, (url) =>
    fetchWithToken(url, token)
  );

  return {
    data: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useUserProfileBySlug(slug: string) {
  const {data, error} = useSWR(`/api/profile?slug=${slug}`, (url) =>
    fetchWithoutToken(url)
  );

  return {
    data: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useIntervals(
  userSlug: string,
  linkSlug: string,
  from: string,
  to: string
) {
  const {
    data,
    error,
  } = useSWR(
    `/api/links/${userSlug}/${linkSlug}/intervals?from=${from}&to=${to}`,
    (url) => fetchWithoutToken(url)
  );

  console.log('intervals', data);

  return {
    data: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
}

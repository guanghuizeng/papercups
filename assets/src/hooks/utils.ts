import {getAccessToken} from '../api';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
export const fetchWithToken = (url: string, token: string) =>
  fetcher(url, {
    headers: {
      Authorization: token,
    },
  });

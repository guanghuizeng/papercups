import {useEffect, useState} from 'react';
// @ts-ignore
import * as datascript from 'datascript';
import _ from 'lodash';
import {useDebouncedCallback} from 'use-debounce';

export type StoreIdentifier = string;

export interface Store {
  conn: any;
  db: any;
}

class StoreContext {
  current: StoreIdentifier = '';
  store: Map<StoreIdentifier, Store> = new Map<StoreIdentifier, Store>();

  set(key: StoreIdentifier, conn: any, db: any) {
    this.store.set(key, {conn, db});
  }

  get(key: StoreIdentifier) {
    return this.store.get(key);
  }

  setCurrent(id: StoreIdentifier) {
    this.current = id;
  }
}

export const storeContext = new StoreContext();

export function useStore(): any {
  const [store, _setStore] = useState(storeContext.get(storeContext.current));
  const setStore = (key: StoreIdentifier, conn: any, db: any) => {
    storeContext.set(key, conn, db);
    storeContext.setCurrent(key);
    _setStore(storeContext.get(key));
  };
  return [store, setStore];
}

export function useCurrentStore() {
  const [current, setCurrent] = useState(storeContext.current);
  useEffect(() => {
    storeContext.current = current;
  }, [current]);
  return {current, setCurrent};
}

export function useConn() {
  const {current} = useCurrentStore();
  const store = storeContext.get(current);
  if (!store) {
    return null;
  }
  return store.conn;
}

export function useQuery(
  query: any,
  args: any,
  callback?: any,
  sortBy?: Function[]
) {
  const [results, setResults] = useState<any>([]);
  const conn = useConn();

  useEffect(() => {
    if (conn) {
      const subscriptionId = datascript.posh_q(
        (value: any) => {
          if (value && callback) {
            if (sortBy) {
              setResults(
                _.sortBy(
                  value.map((v: any) => callback(v)),
                  sortBy
                )
              );
            } else {
              setResults(value.map((v: any) => callback(v)));
            }
          } else if (sortBy) {
            setResults(_.sortBy(value, sortBy));
          } else {
            setResults(value);
          }
        },
        query,
        conn,
        args
      );
      return () => {
        return datascript.posh_unsubscribe(subscriptionId);
      };
    }
    return () => {};
  }, [conn, query, JSON.stringify(args)]);
  return results;
}

export function useQueryOne(
  query: any,
  args: any,
  callback?: any,
  defaultValue?: any
) {
  const results = useQuery(query, args, callback);
  if (results.length === 1) {
    return results[0];
  }
  if (results.length > 1) {
    console.log('Results more than one');
    return results[0];
  }
  if (callback) {
    if (defaultValue) return defaultValue;
    return {};
  }
  return results;
}

export function useTransact() {
  const conn = useConn();
  return (txData: any) => {
    datascript.posh_transact(conn, txData, txData);
  };
}
export function useDebouncedTransact(wait = 100) {
  const conn = useConn();
  return useDebouncedCallback((txData: any) => {
    datascript.posh_transact(conn, txData, txData);
  }, wait);
}

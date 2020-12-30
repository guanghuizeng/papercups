// @ts-ignore
import * as datascript from 'datascript';
import schema from './schema';
import dayjs from 'dayjs';

export const db = datascript.db_with(datascript.empty_db(schema));
export const conn = datascript.conn_from_db(db);
datascript.posh(conn);

export function init() {
  const tx = [];

  tx.push({
    ':user/uid': 'u1',
    ':user/login': 'yyz',
    ':user/name': 'Yuanyuan Zhang',
    ':user/email': 'yuanyuan.zhang.hash@outlook.com',
  });

  tx.push({
    ':eventKind/uid': 't1',
    ':eventKind/name': 'One-on-One',
  });

  tx.push({
    ':eventLocation/uid': 'loc1',
    ':eventLocation/name': 'In-person meeting',
  });

  tx.push({
    ':eventLocation/uid': 'loc2',
    ':eventLocation/name': 'Phone call',
  });

  tx.push({
    ':eventLocation/uid': 'loc3',
    ':eventLocation/name': 'WeChat',
  });

  tx.push({
    ':schedule/uid': 's1',
    ':schedule/rules': [
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'monday',
      },
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'tuesday',
      },
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'wednesday',
      },
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'thursday',
      },
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'friday',
      },
      {
        type: 'date',
        intervals: [
          {
            from: '09:00',
            to: '17:30',
          },
          {
            from: '19:00',
            to: '22:30',
          },
        ],
        date: '2020-12-23',
      },
    ],
    ':schedule/timezone': 'Asia Shanghai',
  });

  tx.push({
    ':schedule/uid': 's2',
    ':schedule/name': 'Default schedule',
    ':schedule/rules': [
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'monday',
      },
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'tuesday',
      },
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'wednesday',
      },
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'thursday',
      },
      {
        type: 'wday',
        intervals: [
          {
            from: '09:00',
            to: '17:00',
          },
        ],
        wday: 'friday',
      },
    ],
    ':schedule/timezone': 'Asia Shanghai',
  });

  tx.push({
    ':user/uid': 'u1',
    ':user/active_availability_rule': 's1',
    ':user/own_availability_rule': 's1',
  });

  tx.push({
    ':user/uid': 'u1',
    ':user/schedules': 's1',
  });

  tx.push({
    ':user/uid': 'u1',
    ':user/schedules': 's2',
  });

  tx.push({
    ':eventType/uid': 'evt1',
    ':eventType/name': '15 Minute Meeting',
    ':eventType/location': 'loc1',
    ':eventType/description': '15 mins, One-on-One',
    ':eventType/url': '15min',
    ':eventType/color': 'red',
    ':eventType/enabled': true,
    ':eventType/last_edited': dayjs().valueOf(),
    ':eventType/kind': 't1',

    ':eventType/duration': 15,

    ':eventType/period_type': 'moving', // moving, fix, unlimited
    ':eventType/min_booking_time': 14400,
    ':eventType/max_booking_time': 86400,
    ':eventType/start_date': '2020-12-23',
    ':eventType/end_date': '2020-12-25',

    ':eventType/color_options': '#FFF',
  });

  tx.push({
    ':eventType/uid': 'evt2',
    ':eventType/name': '30 Minute Meeting',
    ':eventType/location': 'loc1',
    ':eventType/description': '30 mins, One-on-One',
    ':eventType/url': '30min',
    ':eventType/color': 'green',
    ':eventType/enabled': false,
    ':eventType/last_edited': dayjs().valueOf(),
    ':eventType/kind': 't1',
  });

  tx.push({
    ':eventType/uid': 'evt3',
    ':eventType/name': '60 Minute Meeting',
    ':eventType/location': 'loc1',
    ':eventType/description': '1 hr, One-on-One',
    ':eventType/url': '60min',
    ':eventType/color': 'blue',
    ':eventType/enabled': false,
    ':eventType/last_edited': dayjs().valueOf(),
    ':eventType/kind': 't1',
  });

  tx.push({
    ':user/uid': 'u1',
    ':user/eventTypes': 'evt1',
  });

  tx.push({
    ':user/uid': 'u1',
    ':user/eventTypes': 'evt2',
  });

  tx.push({
    ':user/uid': 'u1',
    ':user/eventTypes': 'evt3',
  });

  datascript.transact(conn, tx);
}

init();

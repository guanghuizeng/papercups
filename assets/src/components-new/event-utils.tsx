import {EventInput} from '@fullcalendar/react';
import {Dayjs} from 'dayjs';

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    start: '2021-01-22' + 'T12:00:00',
    end: '2021-01-22' + 'T14:00:00',
  },
];

export function createEventId() {
  return String(eventGuid++);
}

export function complementIntervals(
  start: Dayjs,
  end: Dayjs,
  intervals: Dayjs[][]
) {
  const res: Dayjs[][] = [];
  if (intervals.length === 0) {
    return res;
  }

  if (start.isBefore(intervals[0][0])) {
    res.push([start, intervals[0][0]]);
  }

  for (let index = 0; index < intervals.length - 1; index++) {
    res.push([intervals[index][1], intervals[index + 1][0]]);
  }

  if (end.isAfter(intervals[intervals.length - 1][1])) {
    res.push([intervals[intervals.length - 1][1], end]);
  }
  return res;
}

function max(a: Dayjs, b: Dayjs) {
  return a.isAfter(b) ? a : b;
}

export function eliminateIntervals(intervals: Dayjs[][]) {
  const res = [];
  let currentStart = intervals[0][0];
  let currentEnd = intervals[0][1];
  for (let index = 1; index < intervals.length; index++) {
    const element = intervals[index];
    if (currentEnd.isAfter(element[0]) || currentEnd.isSame(element[0])) {
      currentEnd = max(element[1], currentEnd);
    } else {
      res.push([currentStart, currentEnd]);
      // next
      currentStart = element[0];
      currentEnd = element[1];
    }
    if (index === intervals.length - 1) {
      res.push([currentStart, currentEnd]);
    }
  }
  return res;
}

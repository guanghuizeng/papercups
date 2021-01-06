import dayjs from 'dayjs';

export const PERIOD_TYPE_MOVING = 'moving';
export const PERIOD_TYPE_AVAILABLE_MOVING = 'available_moving';
export const PERIOD_TYPE_FIXED = 'fixed';
export const PERIOD_TYPE_UNLIMITED = 'unlimited';

export const listOfTime = (function () {
  const start = dayjs().startOf('day');
  const seq = [];
  for (let i = 0; i <= 95; i++) {
    seq.push(start.add(i * 15, 'minute').format('HH:mm'));
  }
  return seq;
})();

export const listOfTime24 = (function () {
  const start = dayjs().startOf('day');
  const seq = [];
  for (let i = 0; i <= 95; i++) {
    seq.push(start.add(i * 15, 'minute').format('HH:mm'));
  }
  return seq;
})();

export const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

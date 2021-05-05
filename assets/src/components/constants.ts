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

export const listOfTime24Options = (function () {
  const start = dayjs().startOf('day');
  const seq = [];
  for (let i = 0; i <= 95; i++) {
    seq.push({
      label: start.add(i * 15, 'minute').format('HH:mm'),
      value: i * 15,
    });
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

export const colourOptions = [
  {value: 'loc1', label: '面谈', color: '#00B8D9'},
  {value: 'loc2', label: '电话', color: '#0052CC'},
  {value: 'loc3', label: '微信', color: '#5243AA'},
  {value: 'loc4', label: '钉钉', color: '#FF5630'},
  {value: 'loc5', label: 'Zoom', color: '#FF8B00'},
];

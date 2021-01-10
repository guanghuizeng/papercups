import {Redirect, useHistory, useLocation, useParams} from 'react-router-dom';
import {useBook} from './BookProvider';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import {listOfTime} from '../constants';
import {
  DayPickerSingleDateController,
  isInclusivelyAfterDay,
  isSameDay,
} from 'react-dates';
import {colourOptions} from '../events/data';
import ReactList from 'react-list';
import TimeOption from './TimeOption';
import 'react-dates/lib/css/_datepicker.css';
import './day-picker.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const days = [
  {
    date: '2021-01-09',
    status: 'unavailable',
    spots: [],
    invitee_events: [],
  },
  {
    date: '2021-01-12',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-12T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-12T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-13',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-13T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-13T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-14',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-14T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-14T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-15',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-15T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-15T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-16',
    status: 'unavailable',
    spots: [],
    invitee_events: [],
  },
  {
    date: '2021-01-19',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-19T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-19T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-20',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-20T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-20T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-21',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-21T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-21T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-22',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-22T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-22T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-23',
    status: 'unavailable',
    spots: [],
    invitee_events: [],
  },
  {
    date: '2021-01-26',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-26T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-26T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-27',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-27T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-27T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-28',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-28T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-28T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-29',
    status: 'available',
    spots: [
      {
        status: 'available',
        start_time: '2021-01-29T09:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T09:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T09:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T09:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T10:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T10:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T10:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T10:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T11:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T11:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T11:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T11:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T12:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T12:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T12:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T12:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T13:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T13:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T13:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T13:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T14:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T14:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T14:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T14:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T15:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T15:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T15:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T15:45:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T16:00:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T16:15:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T16:30:00+08:00',
      },
      {
        status: 'available',
        start_time: '2021-01-29T16:45:00+08:00',
      },
    ],
    invitee_events: [],
  },
  {
    date: '2021-01-30',
    status: 'unavailable',
    spots: [],
    invitee_events: [],
  },
];

function isBeforeDay(a: any, b: any) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

  const aYear = a.year();
  const aMonth = a.month();

  const bYear = b.year();
  const bMonth = b.month();

  const isSameYear = aYear === bYear;
  const isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return a.date() < b.date();
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}

function minsToDays(mins: number) {
  return mins / 60 / 24;
}

const TimeOptionList = ({sliceOfTime, handleSelectDateAndTime}: any) => {
  const {pathname} = useLocation();
  const {selectedMonth, selectedDate, updateSelectedTime} = useBook();

  const [checkedValue, setCheckedValue] = useState<string>('');
  let history = useHistory();

  const handleConfirm = () => {
    updateSelectedTime(checkedValue);
    history.push(
      `${pathname}/${selectedDate
        ?.clone()
        .add(moment.duration(checkedValue))
        ?.format()}?month=${selectedMonth?.format(
        'YYYY-MM'
      )}&date=${selectedDate?.format('YYYY-MM-DD')}`
    );
  };

  return (
    <ReactList
      itemRenderer={(index: number, key: any) => {
        return (
          <div key={key}>
            <TimeOption
              value={sliceOfTime[index]}
              checked={sliceOfTime[index] === checkedValue}
              onCheck={setCheckedValue}
              onConfirm={handleConfirm}
            />
          </div>
        );
      }}
      length={sliceOfTime.length}
      type="uniform"
    />
  );
};

const BookTypePage = () => {
  const {user, type} = useParams();
  const query = useQuery();
  const month = query.get('month');
  const date = query.get('date');

  const {pathname} = useLocation();
  const history = useHistory();

  const {
    selectedMonth,
    selectedDate,
    updateSelectedMonth,
    updateSelectedDate,

    userProfileBySlug,
    fetchUserProfile,
    eventTypes,
    fetchEventTypeByUrl,
    fetchSchedule,
    schedules,
  } = useBook();

  useEffect(() => {
    fetchUserProfile(user).then((r) => {});
    fetchEventTypeByUrl(user, type).then((r) => {
      if (r) {
        fetchSchedule(user, r['schedule_id']).then((r) => {});
      }
    });

    if (month) {
      updateSelectedMonth(moment(month, 'YYYY-MM'));
    }
    if (date) {
      updateSelectedDate(moment(date, 'YYYY-MM-DD'));
    }
  }, []);

  const profile = userProfileBySlug[user];
  const eventType = eventTypes[user] && eventTypes[user][type];
  const nextDays = minsToDays(eventType?.max_booking_time);
  const today = moment();

  const schedule_id = eventType && eventType['schedule_id'];
  const schedule = schedules && schedules[schedule_id];
  const rules = schedule && JSON.parse(schedule.rules);

  const rule =
    rules &&
    rules.find(
      (rule: any) =>
        rule.wday ===
        dayjs(selectedDate?.toISOString()).format('dddd').toLowerCase()
    );
  const interval: any = rule && rule.intervals[0];

  let sliceOfTime: any[] = [];

  if (interval) {
    const startIndex = listOfTime.findIndex((t) => t === interval.from);
    const endIndex = listOfTime.findIndex((t) => t === interval.to);

    sliceOfTime = listOfTime.slice(startIndex, endIndex + 1);
  }

  const isDayBlocked = (date: any) => {
    return date.weekday() === 5 || date.weekday() === 6;
  };

  const isDayHighlighted = (date: moment.Moment) => {
    return isSameDay(date, today) || isInclusivelyAfterDay(date, today);
  };

  const isOutsideRange = (date: any) => {
    return (
      isBeforeDay(date, today) ||
      isInclusivelyAfterDay(date, moment().add(nextDays, 'day'))
    );
  };

  const handleSelectDateAndTime = (time: string) => {
    console.log('handleSelectDateAndTime', selectedDate, time);
  };

  const handleMonthNavigate = (newCurrentMonth: moment.Moment) => {
    if (newCurrentMonth) {
      updateSelectedMonth(newCurrentMonth);
      history.push(
        `${pathname}?month=${newCurrentMonth.format('YYYY-MM')}${
          selectedDate ? `&date=${selectedDate.format('YYYY-MM-DD')}` : ''
        }`
      );
    }
  };

  return (
    <div className="h-full flex flex-row bg-gray-200">
      <div
        className="w-96 bg-white border-primary border-r border-solid"
        style={{
          paddingTop: '25px',
          paddingBottom: '25px',
        }}
      >
        <div className="flex flex-col">
          <h4
            className=""
            style={{
              fontSize: '16px',
              paddingLeft: '30px',
              paddingRight: '10px',
              color: 'rgba(77, 80, 85, 0.6)',
              marginBottom: '0 0 3px',
            }}
          >
            {profile?.full_name}
          </h4>
          <h1
            className="font-bold"
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              lineHeight: '32px',
              paddingLeft: '30px',
              paddingRight: '10px',
              color: '#4d5055',
            }}
          >
            {eventType?.name}
          </h1>
          <div
            style={{
              fontSize: '16px',
              lineHeight: '1.5',
              paddingLeft: '30px',
              paddingRight: '10px',
              marginBottom: '20px',
              color: '#4d5055',
            }}
          >
            <i className="fas fa-clock mr-2 w-5 text-center" />
            {eventType?.duration} 分钟
          </div>
          <div
            style={{
              fontSize: '16px',
              lineHeight: '1.5',
              paddingLeft: '30px',
              paddingRight: '10px',
              marginBottom: '20px',
              color: '#4d5055',
            }}
          >
            <i className="fas fa-handshake mr-2 w-5 text-center" />
            {
              colourOptions.find((opt) => opt.value === eventType?.location)
                ?.label
            }
          </div>
        </div>
      </div>
      <div className="bg-white" style={{paddingTop: '28px'}}>
        <div
          className="text-20px"
          style={{
            color: '#4d5055',
            fontSize: '20px',
            marginBottom: '20px',
            textAlign: 'left',
            paddingLeft: '32px',
            paddingRight: '32px',
          }}
        >
          选择日期和时间
        </div>

        <div className="flex flex-row justify-between bg-white">
          <div className="w-96">
            <DayPickerSingleDateController
              date={selectedDate}
              focused={true}
              onFocusChange={(date) => {
                console.log('onFocusChange', date);
              }}
              onPrevMonthClick={handleMonthNavigate}
              onNextMonthClick={handleMonthNavigate}
              onDateChange={(date) => {
                if (date) {
                  updateSelectedDate(date);
                  history.push(
                    `${pathname}?month=${(selectedMonth
                      ? selectedMonth
                      : date
                    ).format('YYYY-MM')}&date=${date.format('YYYY-MM-DD')}`
                  );
                }
              }}
              initialVisibleMonth={() => {
                return month ? moment(month, 'YYYY-MM') : moment();
              }}
              monthFormat="YYYY [年] M [月]"
              weekDayFormat="dd"
              isOutsideRange={isOutsideRange}
              isDayBlocked={isDayBlocked}
              isDayHighlighted={isDayHighlighted}
              hideKeyboardShortcutsPanel
            />
          </div>
          {selectedDate && (
            <div className="w-64 flex flex-col h-full">
              <div
                className=""
                style={{
                  height: '38px',
                  marginBottom: '10px',
                  fontSize: '16px',
                  lineHeight: '38px',
                  color: '#4d5055',
                }}
              >
                {selectedDate?.format('MMM D[日] dddd')}
              </div>
              <div
                className="p-1 h-full"
                style={{overflow: 'scroll', height: '500px'}}
              >
                <TimeOptionList
                  sliceOfTime={sliceOfTime}
                  handleSelectDateAndTime={handleSelectDateAndTime}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BookTypePageWrapper = () => {
  const query = useQuery();
  const {pathname} = useLocation();
  if (query.get('month')) {
    return <BookTypePage />;
  } else {
    return <Redirect to={`${pathname}?month=${moment().format('YYYY-MM')}`} />;
  }
};

export default BookTypePageWrapper;

import React, {useEffect, useState} from 'react';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

function DatePicker({setStartEndDate, defaultStartDate, defaultEndDate}: any) {
  console.log('Date picker', defaultStartDate, defaultEndDate);

  const [startDate, setStartDate] = useState(
    defaultStartDate ? moment(defaultStartDate, 'YYYY-MM-DD') : null
  );
  const [endDate, setEndDate] = useState(
    defaultEndDate ? moment(defaultEndDate, 'YYYY-MM-DD') : null
  );
  const [focusedInput, setFocusedInput] = useState<any>(null);
  const handleDatesChange = ({startDate, endDate}: any) => {
    console.log(startDate, endDate);
    setStartDate(startDate);
    setEndDate(endDate);

    setStartEndDate(
      startDate ? startDate.format('YYYY-MM-DD') : '',
      endDate ? endDate.format('YYYY-MM-DD') : ''
    );
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="tata-start-date"
      endDate={endDate}
      endDateId="tata-end-date"
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
    />
  );
}

export default DatePicker;

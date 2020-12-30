import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function BookCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        // @ts-ignore
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default BookCalendar;

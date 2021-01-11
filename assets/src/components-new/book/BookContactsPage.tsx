import {useHistory, useLocation, useParams} from 'react-router-dom';
import {useBook} from './BookProvider';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {colourOptions} from '../events/data';
import {
  ITextFieldStyles,
  Label,
  PrimaryButton,
  TextField,
} from '@fluentui/react';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const QuestionForm = ({eventType}: any) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const history = useHistory();

  const {createEvent, selectedTime} = useBook();

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
    setError(null);
    setLoading(null);
  };

  const handleChangeName = (e: any) => {
    setName(e.target.value);
    setError(null);
    setLoading(null);
  };

  const textFieldStyles: Partial<ITextFieldStyles> = {
    field: {height: 50, fontSize: '1rem', color: 'black', padding: '12px 16px'},
    fieldGroup: {height: 52, border: '1px black solid'},
    revealButton: {height: 50},
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={(e) => {
        e.preventDefault();

        const res = `invitees/HAX776ZFSRHFOTIA`;
        if (selectedTime) {
          createEvent(eventType.id, selectedTime).then((r) => {
            history.push(res);
          });
        } else {
          console.log('Error time is null');
        }
      }}
    >
      <div className="flex flex-col">
        <div style={{paddingBottom: '24px'}}>
          <Label required>姓名</Label>
          <TextField
            type="text"
            styles={textFieldStyles}
            onChange={handleChangeName}
            value={name}
            id={'name'}
          />
        </div>
        <div style={{paddingBottom: '24px'}}>
          <Label required>Email</Label>
          <TextField
            type="email"
            styles={textFieldStyles}
            onChange={handleChangeEmail}
            value={email}
            id={'email'}
          />
        </div>
      </div>
      <PrimaryButton className="submit-button" text="提交" type="submit" />
    </form>
  );
};

const BookContactsPage = () => {
  const {user, type, datetime} = useParams();
  const query = useQuery();
  const month = query.get('month');
  const date = query.get('date');

  const {
    selectedDate,
    updateSelectedDate,
    updateSelectedMonth,
    selectedTime,
    updateSelectedTime,

    userProfileBySlug,
    fetchUserProfile,
    eventTypes,
    fetchEventTypeByUrl,
    fetchSchedule,
  } = useBook();
  const profile = userProfileBySlug[user];
  const eventType = eventTypes[user] && eventTypes[user][type];

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
    if (datetime) {
      updateSelectedMonth(moment(datetime, 'YYYY-MM'));
      updateSelectedDate(moment(datetime, 'YYYY-MM-DD'));
      updateSelectedTime(moment(datetime, 'YYYY-MM-DDTHH:mm').format('HH:mm'));
    }
  }, []);

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
            <i className="fas fa-calendar-day mr-2 w-5 text-center" />
            {selectedTime}, {selectedDate?.format('YYYY-MM-DD')}
          </div>
        </div>
      </div>
      <div className="bg-white h-full" style={{paddingTop: '28px'}}>
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
          联系信息
        </div>
        <div
          className=""
          style={{
            width: '600px',
            paddingLeft: '32px',
            paddingRight: '32px',
            height: 'calc(100% - 60px)',
          }}
        >
          <QuestionForm eventType={eventType} />
        </div>
      </div>
    </div>
  );
};

export default BookContactsPage;

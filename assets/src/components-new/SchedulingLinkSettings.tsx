import React from 'react';
import {Link, useParams} from 'react-router-dom';
import _ from 'lodash';
import {useSchedulingLink} from '../hooks/SchedulingLinkProvider';
import {Toggle} from '@fluentui/react';
import Select from 'react-select';

function SettingSection(props: any) {
  return (
    <div className="border-primary border-b border-solid py-8">
      <div className="mx-auto">{props.children}</div>
    </div>
  );
}

function CalendarBindingSection() {
  // const {calendars} = useAppData()
  // const {calendar} = useSchedulingLink()

  return (
    <SettingSection>
      <h2>日历</h2>
      <div>新日程将同步到选择的日历</div>
    </SettingSection>
  );
}

interface SchedulingLinkFieldConfiguration {
  label: string;
  required: boolean;
  type: string;
}

interface SchedulingLinkField extends SchedulingLinkFieldConfiguration {
  id: string;
}

function FieldSection() {
  const {fields, updateSchedulingLink} = useSchedulingLink();

  const updateLabel = (id: string, value: string) => {
    const clone: SchedulingLinkField[] = _.cloneDeep(fields);
    const field = clone.find((field) => field.id === id);
    if (field) {
      field.label = value;
      updateSchedulingLink({
        fields: clone,
      });
    }
  };

  const updateRequired = (id: string, value: boolean) => {
    const clone: SchedulingLinkField[] = _.cloneDeep(fields);
    const field = clone.find((field) => field.id === id);
    if (field) {
      field.required = value;
      updateSchedulingLink({
        fields: clone,
      });
    }
  };

  const addField = () => {
    const clone: SchedulingLinkField[] = _.cloneDeep(fields);
    clone.push({
      id: 'f' + String(_.random(100)),
      label: 'new question',
      required: false,
      type: 'long_text',
    });
    updateSchedulingLink({
      fields: clone,
    });
  };

  const removeField = (id: string) => {
    if (fields) {
      updateSchedulingLink({
        fields: fields.filter((field) => field.id !== id),
      });
    }
  };

  console.log('Field', fields);

  return (
    <SettingSection>
      <h2 className="text-lg text-gray-700">问题</h2>
      <div className="text-sm text-gray-400">在预约界面上将收集的问题</div>
      <div className="flex flex-col">
        {fields ? (
          fields.map((field) => {
            return (
              <div key={field.id} className="flex flex-row  py-2">
                {/*<div className="mx-2 text-gray-400">*/}
                {/*  <i className="fas fa-bars" />*/}
                {/*</div>*/}
                <input
                  className="border-primary border-solid border-2 rounded"
                  defaultValue={field.label}
                  onChange={(e) => {
                    updateLabel(field.id, e.target.value);
                  }}
                />
                <div
                  className="btn-draft"
                  onClick={() => {
                    updateRequired(field.id, !field.required);
                  }}
                >
                  {field.required ? 'required' : 'optional'}
                </div>
                <div
                  className="btn-draft"
                  onClick={() => {
                    removeField(field.id);
                  }}
                >
                  delete
                </div>
              </div>
            );
          })
        ) : (
          <div>template</div>
        )}
        <div className="w-24 text-center btn-draft" onClick={addField}>
          Add
        </div>
      </div>
    </SettingSection>
  );
}

function BufferLimitSection() {
  const {
    bufferBefore,
    bufferAfter,
    limitBookingTime,
    updateSchedulingLink,
  } = useSchedulingLink();

  const updateBufferBefore = (value: number) => {
    updateSchedulingLink({
      before_buffer_time: value,
    });
  };

  const updateBufferAfter = (value: number) => {
    updateSchedulingLink({
      after_buffer_time: value,
    });
  };

  const updateLimitBookingTime = (value: number) => {
    updateSchedulingLink({
      max_booking_time: value,
    });
  };

  // const {bufferBefore, bufferAfter, updateBufferBefore, updateBufferAfter, limitBookingTime, updateLimitBookingTime, limitBookingFrequency, updateLimitBookingFrequency} = useSchedulingLink()

  return (
    <SettingSection>
      <h2 className="text-lg text-gray-700">缓冲时间及限制</h2>
      {/*<div className="text-sm text-gray-400"></div>*/}
      <div>
        <div>
          <label>会议前</label>
          <input
            className="border-primary border-solid border-2 rounded"
            defaultValue={bufferBefore}
            type="number"
            onChange={(e) => {
              updateBufferBefore(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <label>会议后</label>
          <input
            className="border-primary border-solid border-2 rounded"
            defaultValue={bufferAfter}
            type="number"
            onChange={(e) => {
              updateBufferAfter(parseInt(e.target.value));
            }}
          />
        </div>

        <div className="flex flex-row">
          <Toggle className="m-0" checked={true} onChange={() => {}} />
          <label>限制多少天内可以预约</label>
        </div>
        <div className="flex flex-row">
          <input
            className="border-primary border-solid border-2 rounded"
            defaultValue={limitBookingTime / 24 / 60}
            type="number"
            onChange={(e) => {
              updateLimitBookingTime(parseInt(e.target.value) * 24 * 60);
            }}
          />
          <label>天</label>
        </div>
      </div>
    </SettingSection>
  );
}

function ReminderSection() {
  const {emailReminders, updateSchedulingLink} = useSchedulingLink();

  const updateEmailReminderQuantity = (index: number, value: number) => {
    const clone = _.cloneDeep(emailReminders);
    clone[index].quantity = value;
    updateSchedulingLink({
      email_reminders: clone,
    });
  };

  const updateEmailReminderUnit = (index: number, value: string) => {
    const clone = _.cloneDeep(emailReminders);
    clone[index].units = value;
    updateSchedulingLink({
      email_reminders: clone,
    });
  };

  const add = () => {
    if (emailReminders) {
      const clone = _.cloneDeep(emailReminders);
      clone.push({
        quantity: 30,
        units: 'min',
      });
      updateSchedulingLink({
        email_reminders: clone,
      });
    }
  };

  const remove = (index: number) => {
    if (emailReminders) {
      emailReminders.splice(index, 1);
      updateSchedulingLink({
        email_reminders: emailReminders,
      });
    }
  };

  return (
    <div>
      <label>提醒</label>
      <div>
        {emailReminders &&
          emailReminders.map(({quantity, units}, index) => {
            return (
              <div className="flex flex-row">
                <input
                  className="border-primary border-solid border-2 rounded w-20"
                  defaultValue={quantity}
                  type="number"
                  onChange={(e) => {
                    updateEmailReminderQuantity(
                      index,
                      parseInt(e.target.value)
                    );
                  }}
                />
                <Select
                  className="w-32"
                  options={[
                    {
                      label: 'minutes',
                      value: 'min',
                    },
                    {
                      label: 'hours',
                      value: 'hour',
                    },
                    {
                      label: 'days',
                      value: 'day',
                    },
                  ]}
                  defaultValue={{
                    label: 'minutes',
                    value: 'min',
                  }}
                  onChange={(option) => {
                    if (option) {
                      updateEmailReminderUnit(index, option.value);
                    }
                  }}
                />
                <div
                  className="btn-draft"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  delete
                </div>
              </div>
            );
          })}
      </div>
      <div className="w-24 text-center btn-draft" onClick={add}>
        Add
      </div>
    </div>
  );
}

export default function SchedulingLinkSettings() {
  let {id} = useParams();
  return (
    <div className="border-primary border-l border-solid w-full h-full">
      <div>
        <Link to={`/links/${id}`} className="text-gray-400 hover:text-gray-700">
          <i className="fas fa-times" />
        </Link>
      </div>

      <div className="w-full h-full flex flex-col">
        {/*<CalendarBindingSection />*/}
        <FieldSection />
        <BufferLimitSection />
        <ReminderSection />
      </div>
    </div>
  );
}

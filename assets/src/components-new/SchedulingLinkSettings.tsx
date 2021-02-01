import React from 'react';
import {Link, useParams} from 'react-router-dom';
import _ from 'lodash';
import {useSchedulingLink} from '../hooks/SchedulingLinkProvider';
import {Toggle} from '@fluentui/react';
import Select from 'react-select';
import {nanoid} from 'nanoid';
import {X} from '@geist-ui/react-icons';
import {Button, Input} from '@geist-ui/react';

function SettingSection(props: any) {
  return (
    <div className="border-primary border-b border-solid py-8">
      <div className="mx-auto w-128">{props.children}</div>
    </div>
  );
}

interface SectionTitleProps extends React.PropsWithChildren<any> {
  title: string;
}

function SectionTitle(props: SectionTitleProps) {
  return <div className="text-xl py-2">{props.title}</div>;
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

  return (
    <SettingSection>
      <SectionTitle title={'问题'} />
      <div className="flex flex-col">
        {fields ? (
          fields.map((field) => {
            return (
              <div
                key={field.id}
                className="flex flex-row py-2 justify-between"
              >
                <Input
                  size="large"
                  // className="border-primary border-solid border-2 rounded"
                  initialValue={field.label}
                  onChange={(e) => {
                    updateLabel(field.id, e.target.value);
                  }}
                />
                <div className="flex flex-row">
                  <div className="mx-1">
                    <Button
                      size={'small'}
                      auto
                      onClick={() => {
                        updateRequired(field.id, !field.required);
                      }}
                    >
                      {field.required ? '必填' : '可选'}
                    </Button>
                  </div>
                  <div className="mx-1">
                    <Button
                      size={'small'}
                      auto
                      onClick={() => {
                        removeField(field.id);
                      }}
                    >
                      删除
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>template</div>
        )}
        <div className="w-24 pt-4">
          <Button onClick={addField} size={'small'}>
            添加
          </Button>
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
      <SectionTitle title={'缓冲时间及限制'} />
      <div>
        <div className="flex flex-row">
          <div className="flex flex-col">
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

          <div className="flex flex-col ml-4">
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

const ReminderSection = React.memo(() => {
  const {emailReminders, updateSchedulingLink} = useSchedulingLink();

  const updateEmailReminderQuantity = (id: string, value: number) => {
    const clone = _.cloneDeep(emailReminders);
    const reminder = clone.find((r) => r.id === id);
    if (reminder) {
      reminder.quantity = value;
      updateSchedulingLink({
        email_reminders: clone,
      });
    }
  };

  const updateEmailReminderUnit = (id: string, value: string) => {
    const clone = _.cloneDeep(emailReminders);
    const reminder = clone.find((r) => r.id === id);
    if (reminder) {
      reminder.units = value;
      updateSchedulingLink({
        email_reminders: clone,
      });
    }
  };

  const add = () => {
    if (emailReminders) {
      const clone = _.cloneDeep(emailReminders);
      clone.push({
        id: nanoid(),
        quantity: 30,
        units: 'min',
      });
      updateSchedulingLink({
        email_reminders: clone,
      });
    }
  };

  const remove = (id: string) => {
    if (emailReminders) {
      updateSchedulingLink({
        email_reminders: emailReminders.filter((r) => r.id !== id),
      });
    }
  };

  console.log('reminder', emailReminders);

  return (
    <SettingSection>
      <SectionTitle title={'提醒'} />
      <div>
        {emailReminders &&
          emailReminders.map(({quantity, units, id}) => {
            return (
              <div key={id} className="flex flex-row">
                <input
                  className="border-primary border-solid border-2 rounded w-20"
                  defaultValue={quantity}
                  type="number"
                  onChange={(e) => {
                    updateEmailReminderQuantity(id, parseInt(e.target.value));
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
                      updateEmailReminderUnit(id, option.value);
                    }
                  }}
                />
                <div
                  className="btn-draft"
                  onClick={() => {
                    remove(id);
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
    </SettingSection>
  );
});

export default function SchedulingLinkSettings() {
  let {id} = useParams();
  return (
    <div className="border-primary border-l border-solid w-full h-full">
      <div className="Header">
        <Link
          to={`/links/${id}`}
          className="hover:bg-gray-200 text-gray-600 hover:text-black gentle-flex w-10"
        >
          <X />
        </Link>
      </div>

      <div className="w-full flex flex-col">
        {/*<CalendarBindingSection />*/}
        <FieldSection />
        <BufferLimitSection />
        <ReminderSection />
      </div>
    </div>
  );
}

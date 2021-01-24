import React from 'react';
import {Link, useParams} from 'react-router-dom';
import _ from 'lodash';
import {useSchedulingLink} from '../hooks/SchedulingLinkProvider';

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
  // const {bufferBefore, bufferAfter, updateBufferBefore, updateBufferAfter, limitBookingTime, updateLimitBookingTime, limitBookingFrequency, updateLimitBookingFrequency} = useSchedulingLink()

  return (
    <SettingSection>
      <h2>缓冲时间及限制</h2>
      <div>
        <div>
          <label>会议前</label>
          <div>5 mins</div>
        </div>
        <div>
          <label>会议后</label>
          <div>15 mins</div>
        </div>
      </div>
    </SettingSection>
  );
}

function ReminderSection() {
  // const {reminders, updateReminders} = useSchedulingLink()

  return <div>提醒</div>;
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

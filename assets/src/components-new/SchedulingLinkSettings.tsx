import React from 'react';
import {Link, useParams} from 'react-router-dom';
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
  const {fields} = useSchedulingLink();

  const updateQuestion = (question: SchedulingLinkField) => {};

  const removeQuestion = (id: string) => {};

  const addQuestion = (
    questionConfiguration: SchedulingLinkFieldConfiguration
  ) => {};

  return (
    <SettingSection>
      <h2>问题</h2>
      <div>在预约界面上将收集的问题</div>
      <div className="flex flex-col">
        {fields ? (
          fields.map((field) => {
            return (
              <div key={field.id} className="flex flex-row  py-2">
                <div className="mx-2 text-gray-400">
                  <i className="fas fa-bars" />
                </div>
                <div className="border-primary border-solid border-2 rounded">
                  {field.label}
                </div>
              </div>
            );
          })
        ) : (
          <div>template</div>
        )}
      </div>
    </SettingSection>
  );
}

function BufferLimitSection() {
  // const {bufferBefore, bufferAfter, updateBufferBefore, updateBufferAfter, limitBookingTime, updateLimitBookingTime, limitBookingFrequency, updateLimitBookingFrequency} = useSchedulingLink()

  return (
    <SettingSection>
      <h2>缓冲时间及限制</h2>
      <div></div>
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

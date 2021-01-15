import * as React from 'react';
import EventTypeEdit from './EventTypeEdit';
import {Link, useParams} from 'react-router-dom';
import {useEvents} from './EventsProvider';
import Header from './events/Header';
import {GeneralSectionExpand} from './events/sections/GeneralSectionExpand';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import GeneralSectionCollapsed from './events/sections/GeneralSectionCollapsed';
import AvailabilitySectionExpand from './events/sections/AvailabilitySectionExpand';
import AvailabilitySectionCollapsed from './events/sections/AvailabilitySectionCollapsed';
import {useAuth} from '../components/auth/AuthProvider';
import InviteeQuestionsSection from './events/sections/InviteeQuestionsSection';
import NotifyPolicySection from './events/sections/NotifyPolicySection';

const EventType = () => {
  let {id} = useParams();
  const {
    settings,
    eventTypesById,
    onUpdateEventType,
    fetchAllSchedules,
  } = useEvents();
  const eventType = eventTypesById[id];
  const [focusStep, setFocusStep] = useState(-1);

  useEffect(() => {
    fetchAllSchedules().then((r) => {
      // console.log('fetch schedules done', r);
    });
  }, []);

  const onSave = (value: any) => {
    onUpdateEventType(value.id, value).then((r) => {
      if (r) {
        // console.log('On update event type', r);
      }
    });
  };

  const generalSection = () => {
    if (focusStep === 0) {
      return (
        <GeneralSectionExpand
          eventType={eventType}
          onClose={() => {
            setFocusStep(-1);
          }}
          onSave={onSave}
          saveButtonLabel="Save & Close"
        />
      );
    } else {
      return (
        <GeneralSectionCollapsed
          eventType={eventType}
          onOpen={() => {
            setFocusStep(0);
          }}
        />
      );
    }
  };

  const availabilitySection = () => {
    if (focusStep === 1) {
      return (
        <AvailabilitySectionExpand
          user={{
            active_availability_rule: 1,
            own_availability_rule: 1,
          }}
          eventType={eventType}
          onClose={() => {
            setFocusStep(-1);
          }}
          onSave={onSave}
          saveButtonLabel="Save & Close"
        />
      );
    } else {
      return (
        <AvailabilitySectionCollapsed
          eventType={eventType}
          onOpen={() => setFocusStep(1)}
        />
      );
    }
  };

  const inviteeQuestionsSection = () => {
    if (focusStep === 2) {
    } else {
    }
  };

  if (!eventType) {
    return <div>Loading...</div>;
  }

  // return (
  //   <div>
  //     <div className="h-6">
  //       <Link to="/event_types">
  //         <span className="inline-block hover:underline">
  //           <i className="fas fa-times m-2 text-lg opacity-25 hover:opacity-100 hover:underline" />
  //         </span>
  //       </Link>
  //     </div>
  //     <div className="container lg:px-10 inner-container mx-auto lg:px-8 py-4 flex flex-col">
  //       <div className="header py-4 text-3xl font-medium">编辑预约类型</div>
  //
  //       <section className="pt-10">
  //         <div className="flex flex-row justify-between">
  //           <div className="">Your type is ON</div>
  //           <div className="text-sm opacity-50">
  //             Last edited {dayjs(eventType.editAt).toString()}.
  //           </div>
  //           <a
  //             href={`/@${settings.slug}/${eventType.url}`}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="text-blue-400"
  //           >
  //             <i className="fas fa-external-link-alt mr-2" />
  //             view live page
  //           </a>
  //         </div>
  //       </section>
  //       {generalSection()}
  //       {availabilitySection()}
  //       <div className="mt-4">
  //         <div className="mb-2">
  //           <strong>Additional Options</strong>
  //         </div>
  //         <InviteeQuestionsSection />
  //         <NotifyPolicySection />
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col h-full">
      <div className="Header">
        <div className="flex flex-row w-full">
          <Link to="/event_types">
            <span className="inline-block hover:underline">
              <i className="fas fa-times m-2 text-lg opacity-25 hover:opacity-100 hover:underline" />
            </span>
          </Link>
          <div className="flex flex-row justify-between w-full">
            <div className="gentle-flex">
              <span>编辑</span>
            </div>
            <div className="flex flex-row">
              <div className="gentle-flex">
                http://localhost:3000/@ycy/15min
              </div>
              <div className="gentle-flex">复制</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row h-full">
        <div className="w-64 border-primary border-r border-solid h-full flex flex-col">
          <div className="px-4 py-8">
            <div className="text-xl pb-2">Name</div>
            <div className="opacity-75">Description</div>
          </div>
          <div className="px-4 flex flex-col">
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
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
                marginBottom: '20px',
                color: '#4d5055',
              }}
            >
              <i className="fas fa-calendar-check mr-2 w-5 text-center" />
              工作时间
            </div>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                marginBottom: '20px',
                color: '#4d5055',
              }}
            >
              <i className="fas fa-video mr-2 w-5 text-center" />
              微信
            </div>{' '}
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                marginBottom: '20px',
                color: '#4d5055',
              }}
            >
              <i className="fas fa-user-alt mr-2 w-5 text-center" />
              个性化
            </div>
            <div
              style={{
                fontSize: '16px',
                lineHeight: '1.5',
                marginBottom: '20px',
                color: '#4d5055',
              }}
            >
              <i className="fas fa-cog mr-2 w-5 text-center" />
              设置
            </div>
          </div>

          <div className="border-primary border-t border-solid">
            <div className="flex flex-col px-4 py-4">
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  color: '#4d5055',
                }}
              >
                <i className="fas fa-external-link-alt mr-2 w-5 text-center" />
                预览
              </div>
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  color: '#4d5055',
                }}
              >
                <i className="fas fa-link mr-2 w-5 text-center" />
                复制链接
              </div>{' '}
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  color: '#4d5055',
                }}
              >
                <i className="far fa-clone mr-2 w-5 text-center" />
                另存为
              </div>{' '}
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  color: '#4d5055',
                }}
              >
                <i className="fas fa-code mr-2 w-5 text-center" />
                嵌入
              </div>
            </div>
          </div>

          {/*<GeneralSectionExpand*/}
          {/*  eventType={eventType}*/}
          {/*  onClose={() => {*/}
          {/*    setFocusStep(-1);*/}
          {/*  }}*/}
          {/*  onSave={onSave}*/}
          {/*  saveButtonLabel="Save & Close"*/}
          {/*/>*/}
        </div>
        <div>Calendar</div>
      </div>
    </div>
  );
};

export default EventType;

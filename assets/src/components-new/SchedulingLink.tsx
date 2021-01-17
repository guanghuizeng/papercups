import * as React from 'react';
import {Link, Route, Switch, useParams} from 'react-router-dom';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import SchedulingLinkProvider, {
  useSchedulingLink,
} from '../hooks/SchedulingLinkProvider';

function Header() {
  return (
    <div className="Header">
      <div className="flex flex-row w-full">
        <Link to="/links" className="hover:bg-blue-300">
          <span className="inline-block hover:underline ">
            <i className="fas fa-times m-2 text-lg opacity-25 hover:opacity-100 hover:underline" />
          </span>
        </Link>
        <div className="flex flex-row justify-between w-full px-8">
          <div className="gentle-flex">
            <span>编辑</span>
          </div>
          <div className="flex flex-row">
            <div className="gentle-flex">http://localhost:3000/@ycy/15min</div>
            <div className="gentle-flex">复制</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralSection() {
  let {id} = useParams();
  const {schedulingLink} = useSchedulingLink();
  console.log('general', schedulingLink);

  return (
    <div date-section="general" className="flex flex-col">
      <div className="px-4 py-8">
        <div className="text-2xl font-bold pb-2">{schedulingLink?.name}</div>
        <div className="opacity-75">{schedulingLink?.description}</div>
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
          30 分钟
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
          <Switch>
            <Route
              exact
              path="/links/:id"
              component={() => (
                <Link to={`/links/${id}/more-settings`}>
                  <i className="fas fa-cog mr-2 w-5 text-center" />
                  设置
                </Link>
              )}
            />
            <Route
              exact
              path="/links/:id/more-settings"
              component={() => (
                <div className="bg-gray-300">
                  <i className="fas fa-cog mr-2 w-5 text-center" />
                  设置
                </div>
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

function ControlSection() {
  return (
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
        </div>
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
        </div>
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
        <div
          className="text-gray-700 hover:text-red-500 hover:bg-gray-200 cursor-pointer rounded"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            // color: '#4d5055',
          }}
        >
          <i className="far fa-trash-alt mr-2 w-5 text-center" />
          删除
        </div>
      </div>
    </div>
  );
}

function CalendarSection() {}

/**
 * Manage scheduling link
 *
 * context:
 *  LinkContext
 *  useLink()
 *
 * LinkContext:
 *  link
 *  updateName
 *  updateDescription
 *  updateDuration
 *  updateAvailability
 *  updateLocation
 *  updateBuffer
 *  updateLimit
 *  updateCalendar
 *  ...
 *
 * Link:
 *  name
 *  description
 *  duration
 *  availability
 *  location
 *  ...
 *
 * Components:
 *   Header
 *      ViewControl
 *      Title
 *      LinkControl
 *   GeneralSection
 *   SettingSection
 *      Buffer&Limit Subsection
 *      ...
 *   ControlSection
 *   CalendarSection
 */
function SchedulingLink() {
  let {id} = useParams();

  return (
    <SchedulingLinkProvider linkId={id}>
      <div className="flex flex-col h-full">
        <Header />

        <div className="flex flex-row h-full">
          <div className="w-80 border-primary border-r border-solid h-full flex flex-col">
            <GeneralSection />
            <ControlSection />
          </div>

          <div className="w-full h-full">
            <Switch>
              <Route
                exact
                path="/links/:id/more-settings"
                component={() => (
                  <div>
                    <div>
                      <Link to={`/links/${id}`} className="hover:bg-gray-300">
                        Close
                      </Link>
                    </div>
                    <div>问题</div>
                  </div>
                )}
              />
              <Route
                exact
                path="/links/:id"
                component={() => (
                  <div className="w-full h-full flex flex-col bg-gray-300">
                    <Calendar height="100%" />
                  </div>
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </SchedulingLinkProvider>
  );
}

export default SchedulingLink;

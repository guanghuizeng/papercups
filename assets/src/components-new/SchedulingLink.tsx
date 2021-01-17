import * as React from 'react';
import {Link, Route, Switch, useParams} from 'react-router-dom';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import SchedulingLinkProvider, {
  useSchedulingLink,
} from '../hooks/SchedulingLinkProvider';
import SingleSelect from './events/EventLocationSelect';
import Select from 'react-select';
import {Toggle} from '@fluentui/react';
import WithTip from '../components-new/common/WithTip';

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
            <div className="gentle-flex mr-4">
              <div className="bg-green-100 text-green-700 px-2 py-1">
                <i className="fas fa-check" />
                <span className="px-1">已保存</span>
              </div>
            </div>
            <div className="gentle-flex mr-3">
              <Toggle className="m-0" onChange={() => {}} />
            </div>
            <div className="gentle-flex">
              <WithTip content={'复制链接'}>
                <span className="text-gray-600 hover:text-blue-500">
                  http://localhost:3000/@ycy/15min
                </span>
              </WithTip>
            </div>
            <div className="gentle-flex">
              <button className="btn btn-gray py-1 px-3">编辑</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DurationOptions = [
  ['10 分钟', 10],
  ['15 分钟', 15],
  ['30 分钟', 30],
  ['45 分钟', 45],
  ['60 分钟', 60],
  ['90 分钟', 90],
  ['2 小时', 120],
];

const DurationOptionsMap = DurationOptions.map((opt) => ({
  value: opt[1],
  label: opt[0],
}));

function GeneralSection() {
  let {id} = useParams();
  const {schedulingLink} = useSchedulingLink();
  console.log('general', schedulingLink);

  return (
    <div date-section="general" className="flex flex-col">
      <div className="px-4 py-8">
        <textarea
          className="-mx-2 px-2 py-0 rounded-lg text-2xl leading-8 font-bold border-transparent focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800 resize-none w-full placeholder-gray-600"
          placeholder="Name this link"
          spellCheck="false"
          style={{height: '34px !important'}}
          value={schedulingLink?.name}
        />
        <textarea
          className="-mx-2 px-2 py-0 rounded-md block border-transparent focus:outline-none focus:border focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full text-gray-600 resize-none leading-5 placeholder-gray-600"
          placeholder="Enter a description"
          spellCheck="false"
          style={{height: '24px !important'}}
          value={schedulingLink?.description}
        />
      </div>
      <div className="px-4 flex flex-col">
        <div
          className="flex flex-row"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-clock mr-2 w-5 text-center" />
          <Select className="w-full" options={DurationOptionsMap} isMulti />
          {/*{schedulingLink?.duration} 分钟*/}
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
          className="flex flex-row"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-video mr-2 w-5 text-center" />
          <SingleSelect defaultValue={schedulingLink?.location} />
        </div>
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
          <div className="w-112 border-primary border-r border-solid h-full flex flex-col">
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

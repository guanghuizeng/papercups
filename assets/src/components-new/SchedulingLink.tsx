import * as React from 'react';
import {Link, Route, Switch, useParams} from 'react-router-dom';
import 'tui-calendar/dist/tui-calendar.css';
import SchedulingLinkProvider, {
  useSchedulingLink,
} from '../hooks/SchedulingLinkProvider';
import SingleSelect from './events/EventLocationSelect';
import Select from 'react-select';
import {Toggle} from '@fluentui/react';
import WithTip from '../components-new/common/WithTip';
import Calendar from './Calendar';
import SchedulingLinkSettings from './SchedulingLinkSettings';
import {useAppData} from '../hooks/AppDataProvider';

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

const AvailabilityPresetOptions = [
  {value: '123', label: '工作时间'},
  {value: '124', label: '周末'},
];

function AvailabilitySelect() {
  // get presets from scheduling link config as selected value
  // get all presets from app data as options

  // const {availability_presets} = useAppData()
  // const {availability} = useSchedulingLink();

  // options

  // from organizer
  // from attender
  // from teammates

  const {availabilityPresets} = useAppData();

  console.log('availabilityPresets', availabilityPresets);

  const options = availabilityPresets
    ? availabilityPresets.map((preset) => ({
        value: preset.id,
        label: preset.name,
      }))
    : [];

  const organizer = {
    id: '',
    avatarUrl:
      'https://secure.gravatar.com/avatar/fcb9bbfe7fa822090dce8a194ed9730d?s=256&d=404',
    displayName: 'Yuanyuan Zhang',
    availability: {
      mode: 'ranked',
      overrides: [],
      presets: ['s1', 's2', 's3'],
      recurringIntervals: [],
    },
  };

  const guests = [
    {
      displayName: '',
      email: '',
      availability: {},
    },
  ];

  const teammates = [
    {
      id: '',
      displayName: 'Ruoxi Zeng',
      email: 'ruoxizeng@gmail.com',
      availability: {
        mode: 'ranked',
        overrides: [],
        schedules: ['z1', 'z2', 'z3'],
        recurringIntervals: [],
      },
    },
  ];

  return <Select className="w-full" options={options} isMulti />;
}

function GeneralSection() {
  let {id} = useParams();
  const {
    name,
    description,
    durations,
    location,
    organizer,

    updateLocation,
    updateName,
    updateDescription,
    updateDurations,
  } = useSchedulingLink();

  console.log('general', organizer);

  return (
    <div date-section="general" className="flex flex-col">
      <div className="px-4 py-8">
        <textarea
          className="-mx-2 px-2 py-0 rounded-lg text-2xl leading-8 font-bold border-transparent focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-800 resize-none w-full placeholder-gray-600"
          placeholder="Name this link"
          spellCheck="false"
          style={{height: '34px !important'}}
          defaultValue={name}
          onChange={(e) => {
            console.log('Name change', e.target.value);
            updateName(e.target.value);
          }}
        />
        <textarea
          className="-mx-2 px-2 py-0 rounded-md block border-transparent focus:outline-none focus:border focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full text-gray-600 resize-none leading-5 placeholder-gray-600"
          placeholder="Enter a description"
          spellCheck="false"
          style={{height: '24px !important'}}
          defaultValue={description}
          onChange={(e) => {
            updateDescription(e.target.value);
          }}
        />
      </div>
      <div className="px-2 flex flex-col">
        <div
          className="flex flex-row px-2  py-2"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-clock mr-2 w-5 text-center" />
          <Select
            className="w-full"
            options={DurationOptionsMap}
            defaultValue={
              durations
                ? durations.map((d) => {
                    const opt = DurationOptions.find((opt) => opt[1] === d);
                    if (opt) {
                      return {
                        value: opt[1],
                        label: opt[0],
                      };
                    }
                  })
                : []
            }
            isMulti
            onChange={(value: any) => {
              updateDurations(value.map((opt: any) => opt.value));
              console.log('Durations change', value);
            }}
          />
        </div>
        <div
          className="flex flex-row px-2 py-2"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-calendar-check mr-2 w-5 text-center" />
          <AvailabilitySelect />
        </div>
        <div
          className="flex flex-row px-2 py-2"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-video mr-2 w-5 text-center" />
          <SingleSelect
            defaultValue={location}
            onChange={(v: any) => {
              updateLocation(v.value);
              console.log('Change location', v);
            }}
          />
        </div>
        <div
          className="flex flex-row px-2 py-2"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-user-alt mr-2 w-5 text-center" />
          受邀请人信息
        </div>
        <div
          className="flex flex-row px-2 py-2"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            color: '#4d5055',
          }}
        >
          <i className="fas fa-user-alt mr-2 w-5 text-center" />
          添加团队成员
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
                <div className="hover:bg-gray-200 w-full px-2 py-2 rounded">
                  <Link to={`/links/${id}/more-settings`} className="w-full">
                    <div className="w-full">
                      <i className="fas fa-cog mr-2 w-5 text-center" />
                      设置
                    </div>
                  </Link>
                </div>
              )}
            />
            <Route
              exact
              path="/links/:id/more-settings"
              component={() => (
                <div className="bg-gray-200 w-full px-2 py-2 rounded">
                  <div className="w-full">
                    <i className="fas fa-cog mr-2 w-5 text-center" />
                    设置
                  </div>
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
      <div className="flex flex-col px-2 py-2">
        <div
          className="hover:underline cursor-pointer text-gray-700 hover:text-green-500 px-2 py-2"
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
            marginBottom: '20px',
            // color: '#4d5055',
          }}
        >
          <i className="fas fa-external-link-alt mr-2 w-5 text-center" />
          预览
        </div>
        <div
          className="hover:bg-gray-200 cursor-pointer px-2 py-2 rounded"
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
          className="hover:bg-gray-200 cursor-pointer px-2 py-2 rounded"
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
          className="hover:bg-gray-200 cursor-pointer px-2 py-2 rounded"
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
          className="text-gray-700 hover:text-red-500 hover:bg-gray-200 px-2 py-2  cursor-pointer rounded"
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
          <div className="w-112  h-full flex flex-col">
            <GeneralSection />
            <ControlSection />
          </div>

          <div className="w-full h-full">
            <Switch>
              <Route
                exact
                path="/links/:id/more-settings"
                component={SchedulingLinkSettings}
              />
              <Route
                exact
                path="/links/:id"
                component={() => (
                  <div className="w-full h-full flex flex-col bg-white">
                    <Calendar />
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

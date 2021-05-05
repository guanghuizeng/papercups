import * as React from 'react';
import {Link, Route, Switch, useParams} from 'react-router-dom';
import 'tui-calendar/dist/tui-calendar.css';
import SchedulingLinkProvider, {
  useSchedulingLink,
} from '../../hooks/SchedulingLinkProvider';
import SingleSelect from '../common/EventLocationSelect';
import Select, {components} from 'react-select';
import Calendar from '../common/Calendar';
import SchedulingLinkSettings from './SchedulingLinkSettings';
import {useAppData} from '../../hooks/AppDataProvider';
import {useState, Fragment, useEffect} from 'react';
import {X} from '@geist-ui/react-icons';
import {Button, Input, Toggle, Tooltip} from '@geist-ui/react';
import {HOST} from '../constants';
import {useSchedules} from '../../hooks/api-hooks';

function Header() {
  const {profile} = useAppData();
  const {slug: schedulingLinkSlug, updateSlug} = useSchedulingLink();
  const userSlug = profile?.slug;

  const [slug, setSlug] = useState<string>('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setSlug(schedulingLinkSlug);
  }, [schedulingLinkSlug]);

  const onSave = () => {
    console.log('on save', slug);
    updateSlug(slug);
    setEditing(false);
  };

  return (
    <div className="Header">
      <div className="flex flex-row w-full">
        <Link
          to="/links"
          className="hover:bg-gray-100 text-gray-600 focus:outline-none hover:text-black gentle-flex w-10 h-10 rounded-full "
        >
          <X />
        </Link>
        <div className="flex flex-row justify-between w-full px-10">
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
            {/*<Button onClick={() => {}}>测试保存</Button>*/}
            <div className="gentle-flex mr-3">
              <Toggle initialChecked={true} size="medium" onChange={() => {}} />
            </div>
            <div className="gentle-flex px-1">
              {editing ? (
                <div>
                  <Input
                    label={HOST + '/' + userSlug + '/'}
                    placeholder="必填"
                    initialValue={slug}
                    autoFocus={true}
                    onChange={(e) => {
                      setSlug(e.target.value);
                    }}
                  />
                </div>
              ) : (
                <Tooltip text={'点击复制链接'} type={'dark'} placement="bottom">
                  <span className="cursor-pointer text-gray-600 hover:text-blue-500 hover:bg-blue-100 py-2 px-2 rounded">
                    {HOST + '/' + userSlug + '/' + slug}
                  </span>
                </Tooltip>
              )}
            </div>
            <div className="gentle-flex">
              {editing ? (
                <div className="flex flex-row">
                  <div className="ml-1">
                    <Button
                      size={'small'}
                      type={'success'}
                      auto
                      onClick={onSave}
                    >
                      保存
                    </Button>
                  </div>
                  <div className="ml-1">
                    <Button
                      size={'small'}
                      auto
                      onClick={() => setEditing(false)}
                    >
                      取消
                    </Button>
                  </div>
                </div>
              ) : (
                <Button size={'small'} auto onClick={() => setEditing(true)}>
                  编辑
                </Button>
              )}
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

const MenuList = (props: any) => {
  return (
    <components.MenuList {...props}>
      <div className="flex flex-row justify-end px-2 items-center ">
        <Link to="/settings/links" className="text-gray-400 hover:text-black">
          <i className="fas fa-external-link-alt" />
          <span className="px-2">编辑</span>
        </Link>
      </div>
      {props.children}
    </components.MenuList>
  );
};

const NoOptionsMessage = (props: any) => {
  return (
    <components.NoOptionsMessage {...props}>
      没有更多选项
    </components.NoOptionsMessage>
  );
};

function AvailabilitySelect() {
  const {data: allAvailabilityPresets} = useSchedules();

  const {
    availabilityPresets: currentLinkAvailabilityPresets,
    updateAvailabilityPresets: updateCurrentAvailabilityPresets,
  } = useSchedulingLink();

  const options = allAvailabilityPresets
    ? allAvailabilityPresets.map((preset: any) => ({
        value: preset.id,
        label: preset.name,
      }))
    : [];

  const defaultValue = currentLinkAvailabilityPresets
    ? currentLinkAvailabilityPresets.map((scheduleId) => {
        return options.find((opt: any) => opt.value === scheduleId);
      })
    : null;

  const updatePresets = async (value: string[] | null) => {
    return updateCurrentAvailabilityPresets(value);
    // updateSchedulingLink()
  };

  return (
    <Select
      className="w-full"
      options={options}
      defaultValue={defaultValue}
      isMulti
      components={{
        ClearIndicator: null,
        IndicatorSeparator: null,
        MenuList,
        NoOptionsMessage,
      }}
      onChange={(value) => {
        // update organizer
        updatePresets(value ? value.map((opt) => opt.value) : null);
      }}
    />
  );
}

/**
 *
 */
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

  return (
    <div date-section="general" className="flex flex-col">
      <div className="px-4 pt-8">
        <textarea
          className="-mx-2 px-2 py-2 rounded-lg text-2xl leading-6 font-bold border-transparent focus:outline-none focus:border-gray-300 focus:ring focus:ring-black focus:ring-opacity-50 text-gray-800 resize-none w-full placeholder-gray-600"
          placeholder="未命名"
          spellCheck="false"
          style={{minHeight: '42px !important'}}
          defaultValue={name}
          rows={1}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            updateName(e.target.value);
          }}
        />
        <textarea
          className="-mx-2 mt-2 px-2 py-2 rounded-md block border-transparent focus:outline-none focus:border focus:border-gray-300 focus:ring focus:ring-black  focus:ring-opacity-50 w-full text-gray-600 resize-none leading-5 placeholder-gray-600"
          placeholder="描述"
          spellCheck="false"
          style={{minHeight: '24px !important'}}
          defaultValue={description}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            updateDescription(e.target.value);
          }}
        />
      </div>
      <div
        className="px-2 pr-4 py-2 grid gap-x-1 gap-y-6"
        style={{gridTemplateColumns: '30px auto'}}
      >
        <Fragment>
          <span className="w-full gentle-flex">
            <Tooltip text="时间" type="dark" placement={'top'}>
              <i className="fas fa-clock" />
            </Tooltip>
          </span>
          <Select
            className="w-full"
            options={DurationOptionsMap}
            components={{
              ClearIndicator: null,
              IndicatorSeparator: null,
            }}
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
            }}
          />
        </Fragment>
        <Fragment>
          <span className="w-full gentle-flex">
            <Tooltip text="可选时间" type="dark" placement={'top'}>
              <i className="fas fa-calendar-check" />
            </Tooltip>
          </span>
          <AvailabilitySelect />
        </Fragment>
        <Fragment>
          <span className="w-full gentle-flex">
            <Tooltip text="方式" type="dark" placement={'top'}>
              <i className="fas fa-video" />
            </Tooltip>
          </span>
          <SingleSelect
            defaultValue={location}
            onChange={(v: any) => {
              updateLocation(v.value);
            }}
          />
        </Fragment>
        <Fragment>
          <Switch>
            <Route
              exact
              path="/links/:id"
              component={() => (
                // <div className="hover:bg-gray-200 w-full px-2 py-2 rounded">
                <>
                  <span className="w-full gentle-flex">
                    <Tooltip text="更多设置" type="dark" placement={'top'}>
                      <i className="fas fa-cog" />
                    </Tooltip>
                  </span>
                  <Link
                    to={`/links/${id}/more-settings`}
                    className="w-full px-2 py-2 hover:bg-blue-100 rounded"
                  >
                    设置
                  </Link>
                </>
                // </div>
              )}
            />
            <Route
              exact
              path="/links/:id/more-settings"
              component={() => (
                <>
                  <span className="w-full gentle-flex">
                    <Tooltip text="更多设置" type="dark" placement={'top'}>
                      <i className="fas fa-cog" />
                    </Tooltip>
                  </span>
                  <span className="bg-blue-100 w-full px-2 py-2 rounded">
                    设置
                  </span>
                </>
                // <div className="bg-gray-200 w-full px-2 py-2 rounded">
                //   <div className="w-full">
                //   </div>
                // </div>
              )}
            />
          </Switch>
        </Fragment>
      </div>
    </div>
  );
}

function ControlSection() {
  const {profile} = useAppData();
  const {slug: schedulingLinkSlug} = useSchedulingLink();
  const userSlug = profile?.slug;
  const bookingUrl = '/' + userSlug + '/' + schedulingLinkSlug;
  return (
    <div className="border-primary border-t border-solid mt-8">
      <div
        className="px-2 pt-8 grid gap-x-1 gap-y-6"
        style={{gridTemplateColumns: '30px auto'}}
      >
        <Fragment>
          <span className="w-full gentle-flex">
            <Tooltip text="在新页面打开预览" type="dark" placement={'top'}>
              <i className="fas fa-external-link-alt " />
            </Tooltip>
          </span>
          <Link to={bookingUrl} className="w-full px-2 py-2 hover:underline">
            预览
          </Link>
        </Fragment>

        <Fragment>
          <span className="w-full gentle-flex">
            <Tooltip text="复制链接地址到剪贴板" type="dark" placement={'top'}>
              <i className="fas fa-link" />
            </Tooltip>
          </span>
          <div className="cursor-pointer w-full px-2 py-2 hover:bg-blue-100 rounded">
            <span>复制链接</span>
          </div>
        </Fragment>
        <Fragment>
          <span className="w-full gentle-flex">
            <i className="far fa-clone " />
          </span>
          <div className="cursor-pointer w-full px-2 py-2 hover:bg-blue-100 rounded">
            <span>另存为</span>
          </div>
        </Fragment>
        <Fragment>
          <span className="w-full gentle-flex">
            <i className="fas fa-code " />
          </span>
          <span>嵌入</span>
        </Fragment>
        <Fragment>
          <span className="w-full gentle-flex">
            <Tooltip text="删除此链接" type="dark" placement={'top'}>
              <i className="far fa-trash-alt" />
            </Tooltip>
          </span>
          <div className="cursor-pointer w-full px-2 py-2 hover:bg-blue-100 hover:text-red-600 rounded">
            <span>删除</span>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

function CalendarSection() {
  const {
    availabilityPresetsIntervals,
    availabilityOverrides,
    updateAvailabilityOverrides,
  } = useSchedulingLink();
  return (
    <Calendar
      start={''}
      end={''}
      availabilityOverrides={availabilityOverrides}
      availabilityPresetsIntervals={availabilityPresetsIntervals}
      updateAvailabilityOverrides={updateAvailabilityOverrides}
    />
  );
}

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
                path="/links/:id/edit"
                component={() => (
                  <div className="w-full h-full flex flex-col bg-white pt-8">
                    <CalendarSection />
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

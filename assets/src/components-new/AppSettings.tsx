import React, {useEffect, useState} from 'react';
import {Switch, Route, Link, useLocation, Redirect} from 'react-router-dom';
import {useAppData} from '../hooks/AppDataProvider';
import {Button, Input, Spacer, Text} from '@geist-ui/react';
import {
  convertMinToHrsMin,
  convertMinToHrsMinString,
  dayConvertToZh,
} from '../utils';
import dayjs from 'dayjs';
import NavSidebar from './NavSidebar';

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
  return <div className="text-xl">{props.title}</div>;
}

function AvailabilitySection() {
  const {availabilityPresets, createSchedule} = useAppData();

  const format = (minutes: number) => {
    if (minutes) return convertMinToHrsMinString(minutes);
  };

  const add = () => {
    createSchedule();
  };

  console.log('availabilityPresets', availabilityPresets);

  return (
    <SettingSection>
      <SectionTitle title={'时间管理'} />
      <div className="border-primary border-b border-solid py-2">
        {availabilityPresets &&
          availabilityPresets.map((preset) => {
            return (
              <div
                key={preset.id}
                className="border-primary border-t border-solid  py-6 flex flex-row justify-between"
              >
                <div className="flex flex-col">
                  <Text h3 className="font-medium">
                    <Link
                      to={`/availabilities/${preset.id}/edit`}
                      className={'hover:underline'}
                    >
                      {preset.name}
                    </Link>
                  </Text>
                  <div className="pt-2">
                    {preset.rules.map((rule: any) => {
                      return (
                        <div key={rule.id} className="grid grid-cols-2">
                          <div className="flex flex-row">
                            {rule.byday.map((byday: string) => {
                              return (
                                <span
                                  key={byday}
                                  className="mr-1 text-sm text-gray-600"
                                >
                                  {dayConvertToZh(byday)}
                                </span>
                              );
                            })}
                          </div>
                          <div className="text-sm text-gray-600 pl-4">
                            <label className="mx-1">
                              {format(rule.startTime)}
                            </label>
                            -
                            <label className="mx-1">
                              {format(rule.endTime)}
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-2 flex flex-row">
                  <Link
                    to={`/availabilities/${preset.id}/edit`}
                    // className="btn-draft"
                  >
                    <Button size={'mini'}>编辑</Button>
                  </Link>
                  <Button size={'mini'} className="ml-4">
                    删除
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <Spacer y={1.5} />
      <Button size={'small'} onClick={add}>
        新建
      </Button>
    </SettingSection>
  );
}

function LinksSettingsSection() {
  return (
    <div className="flex flex-col">
      <AvailabilitySection />
      <SettingSection>
        <SectionTitle title={'Buffer'} />
        <div></div>
      </SettingSection>
      <SettingSection>
        <SectionTitle title={'提醒'} />
        <div></div>
      </SettingSection>
      <SettingSection>
        <SectionTitle title={'品牌'} />
        <div></div>
      </SettingSection>
    </div>
  );
}

const URL = 'http://localhost:3000';

function SlugSection() {
  const {profile, updateSlug} = useAppData();
  const [slug, setSlug] = useState<string>('');

  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (profile) {
      setSlug(profile.slug);
    }
  }, [profile]);

  console.log('slug', profile);

  return (
    <SettingSection>
      <SectionTitle title={'链接地址'} />
      <div className="pt-4 flex flex-row justify-between">
        {editing ? (
          <Input
            label={URL + '/@'}
            initialValue={slug}
            autoFocus={true}
            onChange={(e) => {
              setSlug(e.target.value);
            }}
          />
        ) : (
          <div className="my-auto">{URL + '/@' + slug} </div>
        )}
        {editing ? (
          <div className="flex flex-row">
            <div className="ml-1">
              <Button
                size={'small'}
                type={'success'}
                auto
                onClick={() => {
                  updateSlug(slug);
                  setEditing(false);
                }}
              >
                保存
              </Button>
            </div>
            <div className="ml-1">
              <Button
                size={'small'}
                auto
                onClick={() => {
                  setSlug(profile.slug);
                  setEditing(false);
                }}
              >
                取消
              </Button>
            </div>
          </div>
        ) : (
          // <div className="flex flex-row">
          //   <div
          //     className="btn-draft"
          //     onClick={() => {
          //       updateSlug(slug);
          //       setEditing(false);
          //     }}
          //   >
          //     保存
          //   </div>
          //   <div
          //     className="btn-draft"
          //     onClick={() => {
          //       setSlug(settings.slug);
          //       setEditing(false);
          //     }}
          //   >
          //     取消
          //   </div>
          // </div>
          <Button size={'small'} onClick={() => setEditing(true)}>
            编辑
          </Button>
        )}
      </div>
    </SettingSection>
  );
}

function LinkUrlSection() {
  const {profile, settings, updateDisplayName, updateSlug} = useAppData();

  const [editing, setEditing] = useState<boolean>(false);
}

function EmailSection() {
  const {profile, settings, updateDisplayName, updateSlug} = useAppData();

  const [editing, setEditing] = useState<boolean>(false);

  return (
    <SettingSection>
      <SectionTitle title={'邮件地址'} />
      <div className="pt-4">{profile?.email}</div>
    </SettingSection>
  );
}

function NameSection() {
  const {profile, settings, updateDisplayName, updateSlug} = useAppData();

  return (
    <SettingSection>
      <SectionTitle title={'姓名'} />
      <div className="pt-4">
        <Input
          className="focus:outline-none"
          initialValue={profile?.display_name}
          onChange={(e) => {
            updateDisplayName(e.target.value);
          }}
        />
      </div>
    </SettingSection>
  );
}

function ProfileSection() {
  const {profile, settings, updateDisplayName, updateSlug} = useAppData();

  return (
    <div className={'flex flex-col'}>
      <NameSection />
      <SlugSection />
      <EmailSection />
      <SettingSection>
        <SectionTitle title={'密码'} />
        <div className="pt-4">
          <div className="btn-draft">重设密码</div>
        </div>
      </SettingSection>
    </div>
  );
}

export function AppSettings() {
  const {pathname} = useLocation();

  return (
    <div className="w-full flex flex-row">
      <NavSidebar />
      <div className="w-full">
        <div className="Header">设置</div>
        <div className="border-primary border-b border-solid">
          <div className="mx-auto w-128">
            <div className={'flex flex-row'}>
              {[
                {
                  url: '/settings/profile',
                  name: '账号',
                },
                {
                  url: '/settings/links',
                  name: '链接',
                },
                {
                  url: '/settings/teams',
                  name: '团队',
                },
              ].map(({url, name}) => {
                return (
                  <Link to={url} key={url}>
                    <div
                      className={`${
                        pathname === url ||
                        pathname.startsWith(url) ||
                        (pathname === '/' && url === '/links')
                          ? 'border-primary border-b-4 border-pink-400 text-black'
                          : 'opacity-75'
                      } px-4 py-2`}
                    >
                      {name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <Switch>
          <Route
            exact
            path="/settings"
            component={() => <Redirect to={'/settings/profile'} />}
          />
          <Route exact path="/settings/profile" component={ProfileSection} />
          <Route
            exact
            path="/settings/links"
            component={LinksSettingsSection}
          />
          <Route
            exact
            path="/settings/teams"
            component={() => <div>teams</div>}
          />
        </Switch>
      </div>
    </div>
  );
}

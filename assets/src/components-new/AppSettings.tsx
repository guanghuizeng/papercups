import React, {useEffect, useState} from 'react';
import {Switch, Route, Link, useLocation, Redirect} from 'react-router-dom';
import {useAppData} from '../hooks/AppDataProvider';

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
  const {availabilityPresets} = useAppData();
  console.log('ava', availabilityPresets);
  return (
    <SettingSection>
      <SectionTitle title={'可选择时间'} />
      <div className="border-primary border-b border-solid py-2">
        {availabilityPresets &&
          availabilityPresets.map((preset) => {
            return (
              <div
                key={preset.id}
                className="border-primary border-t border-solid py-2"
              >
                <label>{preset.name}</label>
                <div>
                  {preset.rules.map((rule: any) => {
                    return (
                      <div key={`${rule.startTime}-${rule.endTime}`}>
                        <div className="flex flex-row">
                          {rule.byday.map((byday: string) => {
                            return (
                              <div className="mx-2 underline" key={byday}>
                                {byday}
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <label className="mx-2">{rule.startTime}</label>
                          <label className="mx-2">{rule.endTime}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <Link
                    to={`/availabilities/${preset.id}/edit`}
                    className="btn-draft"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      <div className="btn-draft my-2 ">Add</div>
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

function SlugSection() {
  const {settings, updateSlug} = useAppData();
  const [slug, setSlug] = useState<string>('');

  const [edited, setEdited] = useState(false);
  useEffect(() => {
    if (settings) {
      setSlug(settings.slug);
    }
  }, [settings]);

  return (
    <SettingSection>
      <SectionTitle title={'链接地址'} />
      <div className="pt-4 flex flex-row">
        <span>https://timepage.com/</span>
        <input
          className="border-primary border-2 border-solid w-24"
          value={slug}
          type={'text'}
          onChange={(e) => {
            setSlug(e.target.value);
            setEdited(true);
          }}
        />
        {edited && (
          <div className="flex flex-row">
            <div
              className="btn-draft"
              onClick={() => {
                updateSlug(slug);
                setEdited(false);
              }}
            >
              保存
            </div>
            <div
              className="btn-draft"
              onClick={() => {
                setSlug(settings.slug);
                setEdited(false);
              }}
            >
              取消
            </div>
          </div>
        )}
      </div>
    </SettingSection>
  );
}

function ProfileSection() {
  const {profile, settings, updateDisplayName, updateSlug} = useAppData();

  console.log('Profile', profile, settings);
  return (
    <div className={'flex flex-col'}>
      <SettingSection>
        <SectionTitle title={'姓名'} />
        <div className="pt-4">
          <input
            className="border-primary border-2 border-solid"
            defaultValue={profile?.display_name}
            type={'text'}
            onChange={(e) => {
              updateDisplayName(e.target.value);
            }}
          />
        </div>
      </SettingSection>
      <SlugSection />
      <SettingSection>
        <SectionTitle title={'邮件地址'} />
        <div className="pt-4">{profile?.email}</div>
      </SettingSection>
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
    <div className="w-full">
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
                        ? 'bg-gray-200 text-black'
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
        <Route exact path="/settings/links" component={LinksSettingsSection} />
        <Route
          exact
          path="/settings/teams"
          component={() => <div>teams</div>}
        />
      </Switch>
    </div>
  );
}

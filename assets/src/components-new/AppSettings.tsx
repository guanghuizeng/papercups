import React, {useEffect, useState} from 'react';
import {Switch, Route, Link, useLocation, Redirect} from 'react-router-dom';
import {useAppData} from '../hooks/AppDataProvider';

function SettingSection(props: any) {
  return (
    <div className="border-primary border-b border-solid py-8">
      <div className="mx-auto">{props.children}</div>
    </div>
  );
}

function LinksSettingsSection() {
  return (
    <div className="flex flex-col">
      <SettingSection>
        <h2>可选择时间</h2>
        <div></div>
      </SettingSection>
      <SettingSection>
        <h2>Buffer</h2>
        <div></div>
      </SettingSection>
      <SettingSection>
        <h2>提醒</h2>
        <div></div>
      </SettingSection>
      <SettingSection>
        <h2>品牌</h2>
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
      <h2>链接地址</h2>
      <div className="flex flex-row">
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
        <h2>姓名</h2>
        <div>
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
        <h2>邮件地址</h2>
        <div>{profile?.email}</div>
      </SettingSection>
      <SettingSection>
        <h2>密码</h2>
        <div className="btn-draft">重设密码</div>
      </SettingSection>
    </div>
  );
}

export function AppSettings() {
  const {pathname} = useLocation();

  return (
    <div>
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

import React from 'react';
import {Switch, Route, Link, useLocation, Redirect} from 'react-router-dom';

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

function ProfileSection() {
  return (
    <div className={'flex flex-col'}>
      <SettingSection>
        <h2>姓名</h2>
        <div></div>
      </SettingSection>
      <SettingSection>
        <h2>链接地址</h2>
        <div></div>
      </SettingSection>
      <SettingSection>
        <h2>邮件地址</h2>
        <div></div>
      </SettingSection>
      <SettingSection>
        <h2>密码</h2>
        <div></div>
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

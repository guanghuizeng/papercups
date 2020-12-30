import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import {useAuth} from '../components/auth/AuthProvider';

function StyledItem(props: any) {
  return (
    <DropdownMenu.Item
      {...props}
      className="cursor-pointer hover:bg-gray-300 focus:outline-none"
    />
  );
}

export default function Header() {
  const auth = useAuth();

  return (
    <header
      className="text-white body-font"
      style={{backgroundColor: '#393034'}}
    >
      <div className="container mx-auto inner-container flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <div className="w-8 h-8 border-white border rounded-lg text-white text-center align-middle" />
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">Home</a>
          <a className="mr-5 hover:text-gray-900">Availability</a>
          <a className="mr-5 hover:text-gray-900">Integration</a>
          <a className="mr-5 hover:text-gray-900">Help</a>
        </nav>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <div className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
              <i className="far fa-user-circle fa-1x" />
              <span className="mx-2">Account</span>
              <i className="fas fa-caret-down" />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="p-3"
            style={{
              minWidth: 200,
              backgroundColor: 'white',
              borderRadius: 6,
              boxShadow: '0px 5px 15px -5px hsla(206,22%,7%,.15)',
            }}
          >
            <div className="mb-2">
              <StyledItem onSelect={() => console.log('cut')}>
                账号设置
              </StyledItem>
              <StyledItem onSelect={() => console.log('copy')}>
                链接日历
              </StyledItem>
            </div>
            <div className="border-t border-gray-200 border-solid">
              <StyledItem onSelect={auth.logout}>Logout</StyledItem>
            </div>
            {/*<StyledArrow />*/}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}

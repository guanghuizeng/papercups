import React from 'react';

export default function Header() {
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
        <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
          <i className="far fa-user-circle fa-1x" />
          <span className="mx-2">Account</span>
          <i className="fas fa-caret-down" />
        </button>
      </div>
    </header>
  );
}

import React from 'react';

export default function GeneralSectionCollapsed({eventType, onOpen}: any) {
  return (
    <div
      data-section="general"
      className="mt-2 border-b lg:border  hover:border-blue-500 border-black lg:rounded"
      onClick={onOpen}
    >
      <div
        className="flex flex-row justify-between cursor-pointer"
        onClick={() => {
          // setEditing(!editing);
        }}
      >
        <div className="flex flex-row p-2 ">
          <div className="px-3">
            <i className="fas fa-circle text-red-500" />
          </div>
          <div>
            <div className="text-lg">What event is this?</div>
            <div className="text-gray-700">{eventType.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

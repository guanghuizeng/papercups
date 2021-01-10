import React from 'react';
import moment from 'moment';

function TimeOption({value, checked, onCheck, onConfirm}: any) {
  return (
    <>
      {!checked ? (
        <div
          onClick={() => onCheck(value)}
          style={{width: 230, height: 52}}
          className="cursor-pointer mb-3 px-2 py-2 bg-white text-lightblue-500 font-bold border hover:shadow-blue-outline border-lightblue-500 rounded text-center"
        >
          {value ? moment(value).format('HH:mm') : ''}
        </div>
      ) : (
        <div
          style={{width: 230, height: 52}}
          className="grid grid-cols-2 gap-2"
        >
          <div className="cursor-pointer mb-3 px-2 py-2 bg-gray-600 text-white font-bold  rounded text-center">
            {value ? moment(value).format('HH:mm') : ''}
          </div>
          <div
            className="cursor-pointer mb-3 px-2 py-2 bg-lightblue-500 text-white font-bold border border-lightblue-500 rounded text-center"
            onClick={onConfirm}
          >
            {/*<Redirect to="/@ycy">*/}
            Confirm
            {/*</Redirect>*/}
          </div>
        </div>
      )}
    </>
  );
}

export default TimeOption;

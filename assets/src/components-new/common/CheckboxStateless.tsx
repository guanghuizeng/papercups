import React, {useState} from 'react';

export default function CheckboxStateless({value}: any) {
  return (
    <>
      {value ? (
        <i className="fas fa-check-square text-blue-500" />
      ) : (
        <i className="far fa-square" />
      )}
    </>
  );
}

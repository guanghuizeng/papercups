import React, {useState} from 'react';

export default function DotCheckStateless({value}: any) {
  return (
    <>
      {value ? (
        <i className="fas fa-dot-circle text-blue-500" />
      ) : (
        <i className="far fa-circle" />
      )}
    </>
  );
}

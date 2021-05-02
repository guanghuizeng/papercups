import React, {useState} from 'react';

export default function Checkbox({initialValue}: any) {
  const [value, setValue] = useState(initialValue);
  return (
    <div onClick={() => setValue(!value)}>
      {value ? (
        <i className="far fa-check-square" />
      ) : (
        <i className="far fa-square" />
      )}
    </div>
  );
}

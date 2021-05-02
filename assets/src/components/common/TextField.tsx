import React from 'react';

interface TextFieldProps {
  defaultValue: string | number | readonly string[] | undefined;
  onChange: (value: string) => void;
  className?: string;
}

export default function TextField(props: TextFieldProps) {
  return (
    <input
      defaultValue={props.defaultValue}
      className={`rounded border-gray-200 border-2 border-solid focus:border-3 ${props.className}`}
    />
  );
}

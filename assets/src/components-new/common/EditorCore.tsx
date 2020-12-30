import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditorCore({defaultValue, onChange}: any) {
  return (
    <ReactQuill
      theme={'snow'}
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
}

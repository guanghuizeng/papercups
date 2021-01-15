import React, {useState} from 'react';
import {useTransact} from '../../../store';
import CancelButton from '../CancelButton';
import SingleSelect from '../EventLocationSelect';
import Editor from '../../common/Editor';
import {
  ITextFieldStyles,
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';

export function GeneralSectionExpand({
  eventType,
  onClose,
  onSave,
  saveButtonLabel,
}: any) {
  const [eventTypeValue, setEventTypeValue] = useState(eventType);
  const [changed, setChanged] = useState(false);

  const markChanged = () => {
    if (!changed) {
      setChanged(true);
    }
  };

  const save = (eventTypeValue: any) => {
    if (changed) {
      onSave(eventTypeValue);
    }
  };

  return (
    <div data-section="general">
      <div className={`mt-2`}>
        {/*<div*/}
        {/*  className={`flex flex-row justify-between ${*/}
        {/*    changed ? '' : 'cursor-pointer'*/}
        {/*  }`}*/}
        {/*  onClick={(e) => {*/}
        {/*    if (!changed) {*/}
        {/*      onClose();*/}
        {/*      e.stopPropagation();*/}
        {/*    }*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <div className="flex flex-row p-2">*/}
        {/*    <div className="px-3">*/}
        {/*      <i className="fas fa-circle text-red-500" />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <div className="text-lg">What event is this?</div>*/}
        {/*      <div className="text-gray-700">{eventTypeValue.name}</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="flex flex-row">*/}
        {/*    <div className="gentle-flex mr-2">*/}
        {/*      <CancelButton changed={changed} close={onClose} />*/}
        {/*    </div>*/}
        {/*    <div className="gentle-flex mx-2 ">*/}
        {/*      <div*/}
        {/*        className="cursor-pointer border-gray-500 hover:border-black border px-2 bg-blue-400 text-white"*/}
        {/*        onClick={(e) => {*/}
        {/*          save(eventTypeValue);*/}
        {/*          onClose();*/}
        {/*          e.stopPropagation();*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {saveButtonLabel}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="border-t border-b border-gray-300">
          <div className="px-2 py-1 lg:py-8">
            <div className="flex flex-col">
              <div className="mb-4">
                {/*<Label className="label text-base" required>*/}
                {/*  名称*/}
                {/*</Label>*/}
                <div className="hover:outline  border-gray-400 cursor-text w-64">
                  <input
                    type="text"
                    className="w-full h-full p-3 focus:outline-none focus:shadow-outline focus:border-blue-700"
                    value={eventTypeValue.name}
                    onChange={(e) => {
                      setEventTypeValue({
                        ...eventTypeValue,
                        name: e.target.value,
                      });
                      markChanged();
                    }}
                  />
                </div>
              </div>

              <div className="mb-4 flex flex-row">
                <Label className="label text-base">方式</Label>
                <div className="w-full">
                  <SingleSelect
                    defaultValue={eventTypeValue.location}
                    onChange={(option: any) => {
                      setEventTypeValue({
                        ...eventTypeValue,
                        location: option.value,
                      });
                      markChanged();
                    }}
                  />
                </div>
              </div>

              <div className="mb-4 flex flex-row">
                <Label className="label text-base">方式</Label>
                <div className="w-full">
                  <SingleSelect
                    defaultValue={eventTypeValue.location}
                    onChange={(option: any) => {
                      setEventTypeValue({
                        ...eventTypeValue,
                        location: option.value,
                      });
                      markChanged();
                    }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label className="label text-base">描述/建议</Label>
                <Editor
                  defaultValue={eventTypeValue.description}
                  onChange={(value: any) => {
                    setEventTypeValue({
                      ...eventTypeValue,
                      description: value,
                    });
                    markChanged();
                  }}
                />
              </div>

              {/*<div className="mb-4">*/}
              {/*  <Label className="label text-base" required>*/}
              {/*    链接*/}
              {/*  </Label>*/}
              {/*  <div className="flex flex-row">*/}
              {/*    <div className="mr-3">mytime.com/ycy/</div>*/}
              {/*    <div className="border border-gray-400 cursor-text ">*/}
              {/*      <input*/}
              {/*        type="text"*/}
              {/*        className="w-full lg:w-48 p-1 lg:p-3 focus:outline-none focus:shadow-outline focus:border-blue-700"*/}
              {/*        value={eventTypeValue.url}*/}
              {/*        onChange={(e) => {*/}
              {/*          setEventTypeValue({*/}
              {/*            ...eventTypeValue,*/}
              {/*            url: e.target.value,*/}
              {/*          });*/}
              {/*          markChanged();*/}
              {/*        }}*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              <div className="mb-4">
                <Label className="label text-base">标签</Label>
                <div className="flex flex-row">
                  {['red', 'green', 'blue'].map((color) => {
                    return (
                      <div
                        className="mr-2 cursor-pointer"
                        key={color}
                        onClick={() => {
                          setEventTypeValue({
                            ...eventTypeValue,
                            color,
                          });
                          markChanged();
                        }}
                      >
                        <i
                          className={`fas ${
                            color === eventTypeValue.color
                              ? 'fa-check-circle'
                              : 'fa-circle'
                          }  fa-2x text-${color}-500`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/*<div className="flex flex-row justify-end border-t border-gray-300 py-4">*/}
          {/*  <div className="gentle-flex mr-2">*/}
          {/*    <CancelButton changed={changed} close={onClose} />*/}
          {/*  </div>*/}
          {/*  <div className="gentle-flex mx-2 ">*/}
          {/*    <div*/}
          {/*      className="cursor-pointer border-gray-500 hover:border-black border px-2 bg-blue-400 text-white"*/}
          {/*      onClick={(e) => {*/}
          {/*        save(eventTypeValue);*/}
          {/*        onClose();*/}
          {/*        e.stopPropagation();*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      {saveButtonLabel}*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}

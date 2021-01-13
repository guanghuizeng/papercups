import React, {useCallback, useEffect, useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ITextFieldStyles,
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';

import SingleSelect from './EventLocationSelect';
import Editor from '../common/Editor';
import {useDebouncedTransact, useQueryOne, useTransact} from '../../store';
import CancelButton from './CancelButton';
import {EditingContext} from '../../hooks/EditingContext';

export function EventGeneralEdit({eventType, open, close}: any) {
  const transact = useTransact();
  const [eventTypeValue, setEventTypeValue] = useState(eventType);
  const [changed, setChanged] = useState(false);

  const markChanged = () => {
    if (!changed) {
      setChanged(true);
    }
  };

  const save = (eventTypeValue: any) => {
    const tx: any = {};
    Object.keys(eventTypeValue).forEach((key) => {
      tx[`:eventType/${key}`] = eventTypeValue[key];
    });
    console.log('Tx', tx);
    transact([tx]);
  };

  return (
    <>
      <div
        className={`flex flex-row justify-between ${
          changed ? '' : 'cursor-pointer'
        }`}
        onClick={(e) => {
          if (!changed) {
            close();
            e.stopPropagation();
          }
        }}
      >
        <div className="flex flex-row p-2">
          <div className="px-3">
            <i className="fas fa-circle text-red-500" />
          </div>
          <div>
            <div className="text-lg">What event is this?</div>
            <div className="text-gray-700">{eventTypeValue.name}</div>
          </div>
        </div>
        <div className="flex flex-row">
          <CancelButton changed={changed} close={close} />
          <div
            className="gentle-flex mx-2 cursor-pointer"
            onClick={() => {
              console.log('Value', eventTypeValue, changed);
              save(eventTypeValue);
              close();
            }}
          >
            Save & Close
          </div>
        </div>
      </div>
      <div className="border-t border-b border-gray-300">
        <div className="px-2 py-1 lg:px-10 lg:py-8">
          <div className="flex flex-col">
            <div className="mb-4">
              <Label className="my-3" required>
                名称
              </Label>
              <div className="border border-gray-400 cursor-text w-64">
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

            <div className="mb-4">
              <div className="my-3">Location</div>
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

            <div className="mb-4">
              <div className="my-3">Description/Instructions</div>
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

            <div className="mb-4">
              <div className="my-3">Event link *</div>
              <div className="flex flex-row">
                <div className="mr-3">mytime.com/ycy/</div>
                <div className="border border-gray-400 cursor-text ">
                  <input
                    type="text"
                    className="w-full lg:w-48 p-1 lg:p-3 focus:outline-none focus:shadow-outline focus:border-blue-700"
                    value={eventTypeValue.url}
                    onChange={(e) => {
                      setEventTypeValue({
                        ...eventTypeValue,
                        url: e.target.value,
                      });
                      markChanged();
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="my-3">Event color</div>
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
        <div className="flex flex-row justify-end border-t border-gray-300 py-4">
          <div className="mx-2 cursor-pointer">Cancel</div>
          <div className="mx-2 cursor-pointer">Save & Close</div>
        </div>
      </div>
    </>
  );
}

export default function EventGeneralSection(props: any) {
  const {eventTypeId: id} = props;

  const eventType = useQueryOne(
    '[:find ?i ?n ?d ?loc ?url ?c ?last_edited :in $ ?i :where [?e ":eventType/uid" ?i] [?e ":eventType/name" ?n] [?e ":eventType/description" ?d] [?e ":eventType/location" ?loc] [?e ":eventType/url" ?url] [?e ":eventType/color" ?c] [?e ":eventType/last_edited" ?last_edited] ]',
    id,
    ([uid, name, description, location, url, color, editAt]: any) => ({
      uid,
      name,
      description,
      location,
      url,
      color,
      editAt,
    })
  );

  const [editing, setEditing] = useState(false);
  const close = () => {
    setEditing(false);
  };
  const open = () => {
    setEditing(true);
  };

  return (
    <div data-section="general">
      <div
        className={`mt-2 border-b lg:border  hover:border-blue-500 border-black lg:rounded `}
      >
        {editing ? (
          <EventGeneralEdit eventType={eventType} open={open} close={close} />
        ) : (
          <div
            className="flex flex-row justify-between cursor-pointer"
            onClick={() => {
              setEditing(!editing);
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
        )}
      </div>
    </div>
  );
}

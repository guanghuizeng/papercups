import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {EventGeneralEdit} from './EventGeneralSection';

const StyledOverlay = (props: any) => (
  <Dialog.Overlay
    style={{
      backgroundColor: 'rgba(0, 0, 0, .15)',
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }}
  >
    {props.child}
  </Dialog.Overlay>
);
const StyledContent = (props: any) => (
  <Dialog.Content
    className="w-1/3 "
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minWidth: 200,
      // maxWidth: 'fit-content',
      // maxHeight: '85vh',
      padding: 20,
      marginTop: '-5vh',
      backgroundColor: 'white',
      borderRadius: 6,
    }}
  >
    {props.children}
  </Dialog.Content>
);

export default function CreateEventTypeDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>+ New Event Type</Dialog.Trigger>
      <StyledOverlay />
      <StyledContent>
        <EventGeneralEdit
          eventType={{}}
          open={() => {
            console.log('open');
          }}
          close={() => {
            console.log('close');
          }}
        />
      </StyledContent>
    </Dialog.Root>
  );
}

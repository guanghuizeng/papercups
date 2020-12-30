import React, {useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export default function CancelButton({changed, close}: any) {
  const [forceCancel, setForceCancel] = useState(false);

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (forceCancel) {
          close();
        } else if (!changed) {
          close();
        }
      }}
    >
      <Dialog.Trigger>
        <div
          onClick={(e) => {
            if (!changed) {
              close();
              e.stopPropagation();
            }
          }}
        >
          Cancel
        </div>
      </Dialog.Trigger>
      <Dialog.Overlay
        style={{
          backgroundColor: 'rgba(0, 0, 0, .15)',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
      <Dialog.Content
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 200,
          maxWidth: 'fit-content',
          maxHeight: '85vh',
          padding: 20,
          marginTop: '-5vh',
          backgroundColor: 'white',
          borderRadius: 6,
        }}
        className="flex flex-col"
      >
        <div className="text-lg">Are you sure?</div>
        <p>Any unsaved changes will be lost.</p>

        <div className="flex flex-row">
          <Dialog.Close
            className="mx-4 bg-blue-500 p-2"
            onClick={() => {
              setForceCancel(true);
            }}
          >
            Yes
          </Dialog.Close>
          <Dialog.Close className="mx-4 p-2 border-gray-300 border border-solid">
            Nevermind
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

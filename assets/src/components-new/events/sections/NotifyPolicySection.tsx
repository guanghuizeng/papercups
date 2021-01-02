import React, {useState} from 'react';

export default function NotifyPolicySection(props: any) {
  const [editing, setEditing] = useState(false);
  const close = () => {
    setEditing(false);
  };
  const open = () => {
    setEditing(true);
  };
  return (
    <div
      data-section="notifications"
      className={`mt-2 border-b lg:border ${
        editing ? 'lg:border-2' : ' hover:border-blue-500'
      } border-black lg:rounded `}
    >
      <div
        className="flex flex-row justify-between cursor-pointer"
        onClick={() => {
          setEditing(!editing);
        }}
      >
        <div className="flex flex-row p-2 ">
          <div className="px-3">
            <i className="far fa-envelope" />
          </div>
          <div>
            <div className="text-lg">Notifications and Cancellation Policy</div>
            <div className="text-gray-700">
              Calendar Invitations, No Reminders
            </div>
          </div>
        </div>
        {editing && (
          <div className="flex flex-row">
            <div className="mx-2" onClick={close}>
              Cancel
            </div>
            <div className="mx-2" onClick={open}>
              Save & Close
            </div>
          </div>
        )}
      </div>
      {editing && (
        <div className="" style={{}}>
          <div className="border-t border-b border-gray-200">
            <div className="flex flex-col px-20 pb-8">
              <div className="mt-4">
                <div className="my-3">Event name *</div>
                <div className="border border-gray-400 p-3 cursor-text">
                  15 Minute Meeting
                </div>
              </div>
              <div className="mt-4">
                <div className="my-3">Location</div>
                <div className="border border-gray-400 p-3">Add a location</div>
              </div>
              <div className="mt-4">
                <div className="my-3">Description/Instructions</div>
                <div className="border border-gray-400 p-3">
                  Write a summary and any details your invitee should know about
                  the event
                </div>
              </div>
              <div className="mt-4">
                <div className="my-3">Event link *</div>
                <div className="flex flex-row">
                  <div className="mr-3">mytime.com/ycy/</div>
                  <div className="border border-gray-400 p-3 cursor-text">
                    Add a location
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="my-3">Event color</div>
                <div className="flex flex-row">
                  <div className="mr-2">red</div>
                  <div className="mr-2">red</div>
                  <div className="mr-2">red</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="mx-2 cursor-pointer" onClick={close}>
              Cancel
            </div>
            <div className="mx-2 cursor-pointer" onClick={open}>
              Save & Close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

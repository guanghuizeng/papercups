import React, {useState} from 'react';

export default function InviteeQuestionsSection(props: any) {
  const [editing, setEditing] = useState(false);
  const close = () => {
    setEditing(false);
  };
  const open = () => {
    setEditing(true);
  };
  return (
    <div data-section="invitee_questions">
      <div
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
              <i className="far fa-edit" />
            </div>
            <div>
              <div className="text-lg">Invitee Questions</div>
              <div className="text-gray-700">Name, Email + 1 question</div>
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
          <div className="border-t border-b border-gray-200">
            <div className="px-2 py-1 lg:px-10 lg:py-8">
              <div className="flex flex-col">
                <div className="mb-4">
                  <div className="my-3">Name *</div>
                  <div className="border border-gray-400 p-3 cursor-text w-64 h-12" />
                </div>
                <div className="mb-4">
                  <div className="my-3">Email *</div>
                  <div className="border border-gray-400 p-3 cursor-text w-64 h-12" />
                </div>
              </div>
              <div className="flex flex-row relative">
                <div className="drag">
                  <i className="fas fa-arrows-alt-v"></i>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <div>
                      <div className="my-3">
                        Please share anything that will help prepare for our
                        meeting.
                      </div>
                      <div className="border border-gray-400 p-3 h-32"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-6 cursor-pointer text-blue-500">
                + Add new question
              </div>
            </div>
            <div className="flex flex-row justify-end py-4">
              <div className="mx-2 cursor-pointer" onClick={close}>
                Cancel
              </div>
              <div
                className="mx-2 cursor-pointer bg-blue-500 text-white rounded px-2 py-1"
                onClick={open}
              >
                Save & Close
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

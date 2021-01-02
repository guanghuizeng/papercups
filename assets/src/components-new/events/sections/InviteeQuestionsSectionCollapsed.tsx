import React, {useState} from 'react';

export default function InviteeQuestionsSectionCollapsed({
  user,
  eventType,
  onClose,
  onSave,
  saveButtonLabel,
}: any) {
  return (
    <div
      data-section="invitee_questions"
      className={`mt-2 border-b lg:border hover:border-blue-500 border-black lg:rounded `}
    >
      <div
        className="flex flex-row justify-between cursor-pointer"
        onClick={() => {
          // setEditing(!editing);
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
      </div>
    </div>
  );
}

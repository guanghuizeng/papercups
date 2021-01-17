import * as React from 'react';

function Header() {}

function GeneralSection() {}

function ControlSection() {}

function CalendarSection() {}

/**
 * Manage scheduling link
 *
 * context:
 *  LinkContext
 *  useLink()
 *
 * LinkContext:
 *  link
 *  updateName
 *  updateDescription
 *  updateDuration
 *  updateAvailability
 *  updateLocation
 *  updateBuffer
 *  updateLimit
 *  updateCalendar
 *  ...
 *
 * Link:
 *  name
 *  description
 *  duration
 *  availability
 *  location
 *  ...
 *
 * Components:
 *   Header
 *      ViewControl
 *      Title
 *      LinkControl
 *   GeneralSection
 *   SettingSection
 *      Buffer&Limit Subsection
 *      ...
 *   ControlSection
 *   CalendarSection
 */
function SchedulingLink() {
  return <div>Scheduling Link</div>;
}

export default SchedulingLink;

import { useState } from 'react';
import ScheduleTable from './components/ScheduleTable';
import { Event } from './types/assignmentTypes';

const defaultEvents: Event[] = [
  {
    course: 'CS 241E',
    label: 'Assignment 1',
    date: '2024-08-18', // ISO date string
  },
  {
    course: 'CS 241E',
    label: 'Assignment 2',
    date: '2024-08-27',
  },
  {
    course: 'CS 241E',
    label: 'Assignment 3',
    date: '2024-09-01',
  },
];

// Utility function to create and download a file
function download(filename: string, fileBody: string) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(fileBody)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

// Convert date to ICS format (all-day event, no time component)
function convertToICSDate(dateTime: Date) {
  const year = dateTime.getFullYear().toString();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = dateTime.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

// Function to create and download an ICS file with multiple events
function createDownloadICSFile(events: Event[]) {
  // Detect the user's timezone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let icsBody =
    'BEGIN:VCALENDAR\n' +
    'VERSION:2.0\n' +
    `PRODID:-//Your App//EN\n` +
    'CALSCALE:GREGORIAN\n' +
    'METHOD:PUBLISH\n' +
    `BEGIN:VTIMEZONE\n` +
    `TZID:${userTimeZone}\n` + // Add the user's timezone
    `END:VTIMEZONE\n`;

  events.forEach((event, index) => {
    const eventDate = new Date(event.date);
    icsBody +=
      'BEGIN:VEVENT\n' +
      `SUMMARY:${event.course} - ${event.label}\n` +
      `UID:${index}@yourapp\n` +
      'SEQUENCE:0\n' +
      'STATUS:CONFIRMED\n' +
      'TRANSP:TRANSPARENT\n' +
      `DTSTART;TZID=${userTimeZone}:${convertToICSDate(eventDate)}\n` + // Set timezone for event
      `DTEND;TZID=${userTimeZone}:${convertToICSDate(eventDate)}\n` + // All-day event with timezone
      'DESCRIPTION:Assignment Due\n' +
      'END:VEVENT\n';
  });

  icsBody += 'END:VCALENDAR';

  // Download the generated ICS file
  download('schedule.ics', icsBody);
}

function App() {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  // Function to handle deleting an item
  const handleDelete = (index: number) => {
    setEvents((prevEvents) => prevEvents.filter((_, idx) => idx !== index));
  };

  // Function to handle editing an item
  const handleEdit = (index: number, updatedItem: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((item, idx) => (idx === index ? updatedItem : item))
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <ScheduleTable
        tableItems={events}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <button
        onClick={() => createDownloadICSFile(events)} // Trigger ICS file generation
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Download iCal
      </button>
    </div>
  );
}

export default App;

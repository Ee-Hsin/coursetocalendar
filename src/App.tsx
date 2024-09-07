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
    <div className="w-screen h-screen flex justify-center items-center">
      <ScheduleTable
        tableItems={events}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Event } from '../types/assignmentTypes';

interface ScheduleTableProps {
  tableItems: Event[];
  onDelete: (index: number) => void;
  onEdit: (index: number, updatedItem: Event) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  tableItems,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track which item is being edited
  const [editItem, setEditItem] = useState<Event | null>(null); // Track the edited item

  const handleEditClick = (index: number) => {
    setIsEditing(index);
    setEditItem({ ...tableItems[index] }); // Copy the item being edited
  };

  const handleSaveClick = (index: number) => {
    if (editItem) {
      onEdit(index, editItem); // Call onEdit with updated item
    }
    setIsEditing(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editItem) {
      setEditItem({
        ...editItem,
        [e.target.name]: e.target.value, // Update the edited field
      });
    }
  };

  return (
    <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
      <table className="w-full table-auto text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th className="py-3 px-6">Course</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 divide-y">
          {tableItems.map((item, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === idx ? (
                  <input
                    type="text"
                    name="course"
                    value={editItem?.course || ''}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  item.course
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === idx ? (
                  <input
                    type="text"
                    name="label"
                    value={editItem?.label || ''}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  item.label
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isEditing === idx ? (
                  <input
                    type="date"
                    name="date"
                    value={editItem?.date || ''}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  item.date
                )}
              </td>
              <td className="text-right px-6 whitespace-nowrap">
                {isEditing === idx ? (
                  <>
                    <button
                      onClick={() => handleSaveClick(idx)}
                      className="py-2 px-3 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(null)}
                      className="py-2 px-3 font-medium text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(idx)}
                      className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(idx)}
                      className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;

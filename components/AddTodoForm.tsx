'use client'
import { Todo } from '@/models/Todo';
import { useAddTodo } from '@/service/todo';
import React, { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (todo:Todo) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim() === '') {
      return;
    }
    onAdd({taskName,status:'0'});
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        className="px-2 py-1 mr-2 rounded border"
      />
      <button
        type="submit"
        className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};
export default AddTodoForm;

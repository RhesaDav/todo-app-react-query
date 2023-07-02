'use client'
import React, { useState } from 'react';
import { Todo } from '@/models/Todo';
import { useUpdateTodo } from '@/service/todo';

interface EditTodoFormProps {
  todo: Todo | null;
  onEdit: () => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo, onEdit }) => {
  const [taskName, setTaskName] = useState(todo?.taskName || '');
  const updateTodo = useUpdateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskName.trim() === '') {
      return;
    }

    if (!todo) {
      return;
    }

    updateTodo.mutate({ ...todo, taskName });

    onEdit();
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
        Update
      </button>
    </form>
  );
};

export default EditTodoForm;

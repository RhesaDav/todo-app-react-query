import { Todo } from '@/models/Todo';
import { useGetTodos, useDeleteTodo } from '@/service/todo';
import React from 'react';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
  data: Todo[] | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

const TodoList: React.FC<TodoListProps> = ({ onEdit, data, errorMessage, isError, isLoading }) => {
  const deleteTodo = useDeleteTodo();

  const handleEdit = (todo: Todo) => {
    onEdit(todo);
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {errorMessage}</div>;
  }

  return (
    <ul className="space-y-2">
      {data?.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between">
          <span>{todo.taskName}</span>
          <span>{todo.status === "0" ? "Unfinished" : "Finished"}</span>
          <span>{todo.createdOn?.seconds}</span>
          <div>
            <button
              className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => handleEdit(todo)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 ml-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => handleDelete(todo.id as string)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

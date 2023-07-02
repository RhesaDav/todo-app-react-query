"use client";
import AddTodoForm from "@/components/AddTodoForm";
import EditTodoForm from "@/components/EditTodoForm";
import { Todo } from "@/models/Todo";
import { useAddTodo, useGetTodos } from "@/service/todo";
import { data } from "autoprefixer";
import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
import TodoList from "../TodoList";

const TodoListPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const { data: todos, isLoading, isError, error } = useGetTodos();
  const addTodo = useAddTodo();

  const handleAddTodo = (todo: Todo) => {
    addTodo.mutate(todo);
  };

  const handleEditTodo = (todo: Todo) => {
    setIsEditing(true);
    setEditTodo(todo);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
    setEditTodo(null);
  };
  
  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodoForm
        onAdd={handleAddTodo}
      />
      {isEditing ? (
        <EditTodoForm todo={editTodo} onEdit={handleFinishEditing} />
      ) : (
        // <div>
         <TodoList
          data={todos || []}
          errorMessage={error?.message as string}
          isError={isError || addTodo.isError}
          isLoading={isLoading || addTodo.isLoading}
          onEdit={handleEditTodo}
        /> 
        // {/* // <Suspense fallback={<p>Loading feed...</p>}> */}
          // sleep().then(() => <TodoList data={todos || []}
          // errorMessage={error?.message as string}
          // isError={isError || addTodo.isError}
          // isLoading={isLoading || addTodo.isLoading}
          // onEdit={handleEditTodo} />)
        // </div>
        // </Suspense>
      )}
    </div>
  );
};

export default TodoListPage;

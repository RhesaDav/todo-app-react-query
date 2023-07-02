"use client";
import AddTodoForm from "@/components/AddTodoForm";
import EditTodoForm from "@/components/EditTodoForm";
import TodoList from "@/components/TodoList";
// import TodoListPage from "@/components/todo-list";
import { Todo } from "@/models/Todo";
import { useAddTodo, useGetTodos } from "@/service/todo";
import { data } from "autoprefixer";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const LazyLoadPage = dynamic(() => import('@/components/todo-list'), {
  loading: () => <p>Loading Page ...</p>,
})

const List: React.FC = () => {
  const [showTime, setShowTime] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowTime(true)
    }, 1000);
  })

  return (
    <div>
      {showTime && <LazyLoadPage/>}
      {/* <LazyLoadPage/> */}
    </div>
  )
};

export default List;

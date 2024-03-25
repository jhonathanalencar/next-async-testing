"use client";

import { useState, useEffect } from "react";

import { fetchTodos } from "@/lib/fetch-todos/fetch-todos.lib";
import type { Todo } from "@/types/todo.type";

import { AddTodoForm } from "./components/add-todo-form/add-todo-form.component";
import { TodoList } from "./components/todo-list/todo-list.component";

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodos() {
      const todosArray = await fetchTodos();
      if (todosArray?.length) setTodos(todosArray);
    }

    getTodos();
  }, []);

  return (
    <>
      <AddTodoForm setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}

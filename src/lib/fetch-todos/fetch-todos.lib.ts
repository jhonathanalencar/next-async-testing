import type { Todo } from "@/types/todo.type";

export async function fetchTodos() {
  try {
    const res = await fetch("/todos");
    const todos: Todo[] = await res.json();
    return todos;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return [];
  }
}

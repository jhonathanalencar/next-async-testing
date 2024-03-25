import type { Todo } from "@/types/todo.type";

export async function updateTodo(todo: Todo): Promise<Todo> {
  const response = await fetch(`/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...todo,
      completed: !todo.completed,
    }),
  });
  if (!response.ok) throw new Error("Failed to update todo");
  return response.json();
}

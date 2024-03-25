import type { Todo } from "@/types/todo.type";

export async function deleteTodo(todo: Todo): Promise<Partial<Todo>> {
  const response = await fetch(`/todos/${todo.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
    }),
  });
  if (!response.ok) throw new Error("Failed to delete todo");
  return response.json();
}

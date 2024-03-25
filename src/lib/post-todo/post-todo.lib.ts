import type { Todo } from "@/types/todo.type";

export async function postTodo(item: string): Promise<Todo> {
  const response = await fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      title: item,
      completed: false,
    }),
  });
  if (!response.ok) throw new Error("Failed to post new todo");
  return response.json();
}

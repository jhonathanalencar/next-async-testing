import { useState, FormEvent } from "react";

import type { Todo } from "@/types/todo.type";
import { postTodo } from "@/lib/post-todo/post-todo.lib";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export function AddTodoForm({ setTodos }: Props) {
  const [item, setItem] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item) return;

    try {
      const savedTodo = await postTodo(item);

      setTodos((prev) => [...prev, savedTodo]);

      setItem("");
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <label hidden htmlFor="title">
        New Todo
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="text-2xl p-1 rounded-lg flex-grow w-full"
        placeholder="New Todo"
        autoFocus
      />

      <button
        type="submit"
        className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400 disabled:bg-gray-300"
        disabled={!item ? true : false}
      >
        Submit
      </button>
    </form>
  );
}

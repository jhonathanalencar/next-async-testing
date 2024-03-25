import { HttpResponse, http } from "msw";

import { server } from "@/mocks/server.mock";
import { deleteTodo } from "../delete-todo.lib";

const mockTodo = {
  userId: 1,
  title: "Wave hello! 👋",
  completed: false,
  id: 1,
};

describe("deleteTodo lib function", () => {
  it("should return the deleted todo id", async () => {
    const deletedTodo = await deleteTodo(mockTodo);
    expect(deletedTodo).toEqual({
      id: 1,
    });
  });

  it("should fail with an error", async () => {
    server.use(
      http.delete("/todos/:id", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    expect.assertions(1);
    try {
      await deleteTodo(mockTodo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual("Failed to delete todo");
      }
    }
  });
});

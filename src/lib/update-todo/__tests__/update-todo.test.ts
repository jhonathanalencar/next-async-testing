import { HttpResponse, http } from "msw";

import { server } from "@/mocks/server.mock";
import { updateTodo } from "../update-todo.lib";

const mockTodo = {
  userId: 1,
  title: "Wave hello! 👋",
  completed: false,
  id: 1,
};

describe("updateTodo lib function", () => {
  it("should return the updated todo item", async () => {
    const updatedTodo = await updateTodo(mockTodo);
    expect(updatedTodo).toEqual({
      userId: 1,
      title: "Wave hello! 👋",
      completed: true,
      id: 1,
    });
  });

  it("should fail with an error", async () => {
    server.use(
      http.put(`/todos/:id`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    expect.assertions(1);
    try {
      await updateTodo(mockTodo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual("Failed to update todo");
      }
    }
  });
});

import { HttpResponse, http } from "msw";

import { server } from "@/mocks/server.mock";
import { postTodo } from "../post-todo.lib";

describe("postTodo lib function", () => {
  it("should return the posted todo item", async () => {
    const postedTodo = await postTodo("write tests");
    expect(postedTodo).toEqual({
      userId: 1,
      title: "write tests",
      completed: false,
      id: 5,
    });
  });

  it("should fail with an error", async () => {
    server.use(
      http.post("/todos", async () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    expect.assertions(1);
    try {
      await postTodo("write tests");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual("Failed to post new todo");
      }
    }
  });
});

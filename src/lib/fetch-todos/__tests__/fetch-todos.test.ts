import { HttpResponse, http } from "msw";

import { server } from "@/mocks/server.mock";
import { fetchTodos } from "../fetch-todos.lib";

describe("fetchTodos lib function", () => {
  it("should return the correct number of todo items", async () => {
    const todosArray = await fetchTodos();
    expect(todosArray).toHaveLength(4);
  });

  it("should return an empty array with an error", async () => {
    server.use(
      http.get("/todos", () => {
        return HttpResponse.error();
      })
    );
    const todosArray = await fetchTodos();
    expect(todosArray).toHaveLength(0);
  });
});

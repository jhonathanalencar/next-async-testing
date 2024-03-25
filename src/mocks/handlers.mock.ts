import { http, HttpResponse } from "msw";

const mockGetTodosResponse = [
  {
    userId: 1,
    title: "Wave hello! 👋",
    completed: false,
    id: 1,
  },
  {
    userId: 1,
    title: "Get Coffee ☕☕☕",
    completed: false,
    id: 2,
  },
  {
    userId: 1,
    title: "Go to Work ⚒",
    completed: false,
    id: 3,
  },
  {
    userId: 1,
    title: "Write Code 💻",
    completed: false,
    id: 4,
  },
];

export const handlers = [
  http.get("/todos", () => {
    return HttpResponse.json(mockGetTodosResponse, { status: 200 });
  }),
  http.post<{}, { title: string }>("/todos", async ({ request }) => {
    const { title } = await request.json();
    return HttpResponse.json(
      {
        userId: 1,
        title,
        completed: false,
        id: 5,
      },
      { status: 201 }
    );
  }),
  http.put<
    { id: string },
    { userId: number; title: string; completed: boolean }
  >("/todos/:id", async ({ request, params }) => {
    const { id } = params;
    const { userId, title, completed } = await request.json();
    return HttpResponse.json(
      {
        userId,
        title,
        completed,
        id: parseInt(id),
      },
      {
        status: 200,
      }
    );
  }),
  http.delete<{ id: string }>("/todos/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json(
      {
        id: parseInt(id),
      },
      { status: 200 }
    );
  }),
];

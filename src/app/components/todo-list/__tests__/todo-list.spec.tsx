import { getByRole, render, screen } from "@testing-library/react";
import { TodoList } from "../todo-list.component";

const mockTodos = [
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
];

const mockSetTodos = jest.fn();

describe("TodoList", () => {
  describe("Render", () => {
    it("should render 'No Todos Available' when the array is empty", () => {
      // ARRANGE
      render(<TodoList todos={[]} setTodos={mockSetTodos} />);

      // ACT
      const message = screen.getByText("No Todos Available");

      // ASSERT
      expect(message).toBeInTheDocument();
    });

    it("should render a list with the correct number of items", () => {
      // ARRANGE
      render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

      // ACT
      const todosArray = screen.getAllByRole("article");

      // ASSERT
      expect(todosArray.length).toEqual(mockTodos.length);
    });

    it("should render the todos in the correct order", () => {
      // ARRANGE
      render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);

      // ACT
      const firstItem = screen.getAllByTestId("todo-item")[0];

      // ASSERT
      expect(firstItem).toHaveTextContent("Get Coffee ☕☕☕");
    });
  });
});

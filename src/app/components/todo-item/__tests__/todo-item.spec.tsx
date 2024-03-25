import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TodoItem from "../todo-item.component";

const mockTodo = {
  userId: 1,
  title: "Wave hello! 👋",
  completed: false,
  id: 1,
};

const mockSetTodos = jest.fn();

describe("TodoItem", () => {
  describe("Render", () => {
    it("should render an article", () => {
      // ARRANGE
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />);

      // ACT
      const article = screen.getByRole("article");

      // ASSERT
      expect(article).toBeInTheDocument();
    });

    it("should render a label", () => {
      // ARRANGE
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />);

      // ACT
      const label = screen.getByTestId("todo-item");

      // ASSERT
      expect(label).toBeInTheDocument();
    });

    it("should render a checkbox", () => {
      // ARRANGE
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />);

      // ACT
      const checkbox = screen.getByRole("checkbox");

      // ASSERT
      expect(checkbox).toBeInTheDocument();
    });

    it("should render a button", () => {
      // ARRANGE
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />);

      // ACT
      const button = screen.getByRole("button");

      // ASSERT
      expect(button).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should call setTodos when checkbox clicked", async () => {
      // ARRANGE
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />);

      // ACT
      const checkbox = screen.getByRole("checkbox");
      await userEvent.click(checkbox);

      // ASSERT
      expect(mockSetTodos).toHaveBeenCalled();
    });

    it("should call setTodos when button clicked", async () => {
      // ARRANGE
      render(<TodoItem todo={mockTodo} setTodos={mockSetTodos} />);

      // ACT
      const button = screen.getByRole("button");
      await userEvent.click(button);

      // ASSERT
      expect(mockSetTodos).toHaveBeenCalled();
    });
  });
});

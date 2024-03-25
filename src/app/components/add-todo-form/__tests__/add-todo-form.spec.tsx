import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddTodoForm } from "../add-todo-form.component";

const mockSetTodos = jest.fn();

describe("AddTodoForm", () => {
  describe("Render", () => {
    it("should render the input", () => {
      // ARRANGE
      render(<AddTodoForm setTodos={mockSetTodos} />);

      // ACT
      const input = screen.getByPlaceholderText("New Todo");

      // ASSERT
      expect(input).toBeInTheDocument();
    });

    it("should render a disabled submit button", () => {
      // ARRANGE
      render(<AddTodoForm setTodos={mockSetTodos} />);

      // ACT
      const button = screen.getByRole("button", {
        name: "Submit",
      });

      // ASSERT
      expect(button).toBeDisabled();
    });
  });

  describe("Behavior", () => {
    it("should be able to add text to the input", async () => {
      // ARRANGE
      render(<AddTodoForm setTodos={mockSetTodos} />);

      // ACT
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, "hey");

      // ASSERT
      expect(input).toHaveValue("hey");
    });

    it("should enable the submit button when text is input", async () => {
      // ARRANGE
      render(<AddTodoForm setTodos={mockSetTodos} />);

      // ACT
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, "hey");
      const button = screen.getByRole("button", {
        name: "Submit",
      });

      // ASSERT
      expect(button).toBeEnabled();
    });

    it("should empty the text input when submitted", async () => {
      // ARRANGE
      render(<AddTodoForm setTodos={mockSetTodos} />);

      // ACT
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, "hey");
      const button = screen.getByRole("button", {
        name: "Submit",
      });
      await userEvent.click(button);

      // ASSERT
      await waitFor(() => {
        expect(input).toHaveValue("");
      });
    });

    it("should call setTodos when submitted", async () => {
      // ARRANGE
      render(<AddTodoForm setTodos={mockSetTodos} />);

      // ACT
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, "hey");
      const button = screen.getByRole("button", {
        name: "Submit",
      });
      await userEvent.click(button);

      // ASSERT
      expect(mockSetTodos).toHaveBeenCalled();
    });
  });
});

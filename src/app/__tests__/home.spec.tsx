import { findAllByRole, render, screen, waitFor } from "@testing-library/react";

import HomePage from "../page";
import userEvent from "@testing-library/user-event";
import { server } from "@/mocks/server.mock";
import { HttpResponse, http } from "msw";

describe("Home", () => {
  describe("Behavior", () => {
    it("should add a new todo", async () => {
      // ARRANGE
      render(<HomePage />);

      // ACT
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, "My new todo");

      // ASSERT
      expect(input).toHaveValue("My new todo");

      // ACT
      const button = screen.getByRole("button", {
        name: "Submit",
      });
      await userEvent.click(button);

      // ASSERT
      await waitFor(() => {
        expect(input).toHaveValue("");
      });

      // ACT
      const newTodo = await screen.findByText("My new todo");

      // ASSERT
      expect(newTodo).toBeInTheDocument();
    });

    it("should not add a new todo if the request fails", async () => {
      // ARRANGE
      render(<HomePage />);
      server.use(
        http.post("/todos", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      // ACT
      const input = screen.getByPlaceholderText("New Todo");
      await userEvent.type(input, "My new todo");

      // ASSERT
      expect(input).toHaveValue("My new todo");

      // ACT
      const button = screen.getByRole("button", {
        name: "Submit",
      });
      await userEvent.click(button);

      // ASSERT
      await waitFor(() => {
        expect(input).toHaveValue("My new todo");
      });

      // ACT
      const newTodo = screen.queryByText("My new todo");

      // ASSERT
      expect(newTodo).not.toBeInTheDocument();
    });

    it("should update a todo", async () => {
      // ARRANGE
      render(<HomePage />);

      // ACT
      const checkboxArray = (await screen.findAllByRole(
        "checkbox"
      )) as HTMLInputElement[];
      const checkbox = checkboxArray[0];

      // ASSERT
      expect(checkbox).not.toBeChecked();

      // ACT
      await userEvent.click(checkbox);

      // ASSERT
      await waitFor(() => {
        expect(checkbox).toBeChecked();
      });
    });

    it("should not update a todo if the request fails", async () => {
      // ARRANGE
      render(<HomePage />);
      server.use(
        http.put("/todos/:id", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      // ACT
      const checkboxArray = (await screen.findAllByRole(
        "checkbox"
      )) as HTMLInputElement[];
      const checkbox = checkboxArray[0];

      // ASSERT
      expect(checkbox).not.toBeChecked();

      // ACT
      await userEvent.click(checkbox);

      // ASSERT
      await waitFor(() => {
        expect(checkbox).not.toBeChecked();
      });
    });

    it("should delete a todo", async () => {
      // ARRANGE
      render(<HomePage />);

      // ACT
      const todoText = await screen.findByText("Write Code 💻");

      // ASSERT
      expect(todoText).toBeInTheDocument();

      // ACT
      const buttons = await screen.findAllByTestId("delete-button");
      const button = buttons[0];
      await userEvent.click(button);

      // ASSERT
      expect(todoText).not.toBeInTheDocument();
    });

    it("should not delete a todo if the request fails", async () => {
      // ARRANGE
      render(<HomePage />);
      server.use(
        http.delete("/todos/:id", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      // ACT
      const buttons = await screen.findAllByTestId("delete-button");
      const button = buttons[0];
      await userEvent.click(button);

      const todoText = await screen.findByText("Write Code 💻");

      // ASSERT
      expect(todoText).toBeInTheDocument();
    });
  });
});

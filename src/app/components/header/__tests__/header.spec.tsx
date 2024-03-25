import { render, screen } from "@testing-library/react";

import { Header } from "../header.component";

describe("Header", () => {
  describe("Render", () => {
    it("should render the 'Next Todos' heading", () => {
      // ARRANGE
      render(<Header title="Next Todos" />);

      // ACT
      const header = screen.getByRole("heading", {
        name: "Next Todos",
      });

      // ASSERT
      expect(header).toBeInTheDocument();
    });

    it("should render 'ASL' as a heading", () => {
      // ARRANGE
      render(<Header title="ASL" />);

      // ACT
      const header = screen.getByRole("heading", {
        name: "ASL",
      });

      // ASSERT
      expect(header).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CodeInput } from "./CodeInput";

describe("<CodeInput />", () => {
  test("autocompleting a code", async () => {
    const user = userEvent.setup();
    render(<CodeInput />);
    const input = screen.getByTestId("code-input");
    await user.type(input, "7-gu ");
    expect(input).toHaveValue("7-guitarist-");
    await user.type(input, "rev ");
    expect(input).toHaveValue("7-guitarist-revenge");
  });

  test("attempt to autocomplete with no suggestion", async () => {
    const user = userEvent.setup();
    render(<CodeInput />);
    const input = screen.getByTestId("code-input");
    await user.click(input);
    await user.keyboard("7-a s d f ");
    expect(input).toHaveValue("7-asdf");
  });
});

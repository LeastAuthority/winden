import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import CodeInput from "./CodeInput";
import CodeInputProvider from "./providers/CodeInputProvider";

describe("<CodeInput />", () => {
  test("autocompleting a code", async () => {
    const user = userEvent.setup();
    render(
      <CodeInputProvider>
        <CodeInput />
      </CodeInputProvider>
    );
    const input = screen.getByTestId("code-input");
    await user.type(input, "7-gu ");
    expect(input).toHaveValue("7-guitarist-");
    await user.type(input, "rev ");
    expect(input).toHaveValue("7-guitarist-revenge");
  });

  test("attempt to autocomplete with no suggestion", async () => {
    const user = userEvent.setup();
    render(
      <CodeInputProvider>
        <CodeInput />
      </CodeInputProvider>
    );
    const input = screen.getByTestId("code-input");
    await user.type(input, "7-a s d f ");
    expect(input).toHaveValue("7-asdf");
  });

  test("inputting a code not following number-word-word format", async () => {
    const user = userEvent.setup();
    render(
      <CodeInputProvider>
        <CodeInput />
      </CodeInputProvider>
    );
    const input = screen.getByTestId("code-input");
    const errorMessage = screen.getByTestId("code-error-message");
    const container = screen.getByTestId("code-input-container");
    await user.type(input, "asdf-asdf-asdf");
    await user.click(container);
    expect(errorMessage).toHaveTextContent(
      "Please use a code with the number-word-word format."
    );
  });

  test("inputting a code with a typo on the first word", async () => {
    const user = userEvent.setup();
    render(
      <CodeInputProvider>
        <CodeInput />
      </CodeInputProvider>
    );
    const input = screen.getByTestId("code-input");
    const errorMessage = screen.getByTestId("code-error-message");
    const container = screen.getByTestId("code-input-container");
    await user.type(input, "7-gitarist-revenge");
    await user.click(container);
    expect(errorMessage).toHaveTextContent(
      "First word is not recognized. Did you mean: guitarist"
    );
  });

  test("inputting a code with a typo on the second word", async () => {
    const user = userEvent.setup();
    render(
      <CodeInputProvider>
        <CodeInput />
      </CodeInputProvider>
    );
    const input = screen.getByTestId("code-input");
    const errorMessage = screen.getByTestId("code-error-message");
    const container = screen.getByTestId("code-input-container");
    await user.type(input, "7-guitarist-revege");
    await user.click(container);
    expect(errorMessage).toHaveTextContent(
      "Second word is not recognized. Did you mean: revenge"
    );
  });

  test("inputting a code with a typo on both words", async () => {
    const user = userEvent.setup();
    render(
      <CodeInputProvider>
        <CodeInput />
      </CodeInputProvider>
    );
    const input = screen.getByTestId("code-input");
    const errorMessage = screen.getByTestId("code-error-message");
    const container = screen.getByTestId("code-input-container");
    await user.type(input, "7-gitarist-revege");
    await user.click(container);
    expect(errorMessage).toHaveTextContent(
      "First word is not recognized. Did you mean: guitarist"
    );
  });
});

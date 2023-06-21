import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store";
import CodeInput from "./CodeInput";
import ThemeProvider from "./providers/ThemeProvider";

const emptyLine = String.fromCharCode(8203);

global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("../util/downloader/downloader.ts");

// Sometimes tests fails on Github CI
jest.retryTimes(1);

describe("<CodeInput />", () => {
  describe("autocompletion", () => {
    describe("when hitting space when given a suggestion", () => {
      it("will fill in the rest of the word", async () => {
        const user = userEvent.setup();
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const input = screen.getByTestId("code-input");
        await user.type(input, "7-gu ");
        expect(input).toHaveValue("7-guitarist-");
        await user.type(input, "rev ");
        expect(input).toHaveValue("7-guitarist-revenge");
      });
    });

    describe("when hitting space with no suggestion present", () => {
      it("will do nothing", async () => {
        const user = userEvent.setup();
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const input = screen.getByTestId("code-input");
        await user.type(input, "7-a s d f ");
        expect(input).toHaveValue("7-asdf");
      });
    });
  });

  describe("inputting a code not following number-word-word format", () => {
    it("will say the code has an invalid format", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Provider store={store}>
              <CodeInput />
            </Provider>
          </MemoryRouter>
        </ThemeProvider>
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
  });

  describe("inputting a code with a typo on the first word", () => {
    it("will say the first word is not recognized", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Provider store={store}>
              <CodeInput />
            </Provider>
          </MemoryRouter>
        </ThemeProvider>
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
  });

  describe("inputting a code with a typo on the second word", () => {
    it("will say the second word is not recognized", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Provider store={store}>
              <CodeInput />
            </Provider>
          </MemoryRouter>
        </ThemeProvider>
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
  });

  describe("inputting a code with a typo on both words", () => {
    it("will say the first word is not recognized", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Provider store={store}>
              <CodeInput />
            </Provider>
          </MemoryRouter>
        </ThemeProvider>
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

  describe("pressing the next button", () => {
    describe("the code is valid", () => {
      it("will call onSubmit", async () => {
        const onSubmit = jest.fn();
        const user = userEvent.setup();
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput onSubmit={onSubmit} />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const input = screen.getByTestId("code-input");
        const button = screen.getByTestId("code-input-submit");
        await user.type(input, "7-guitarist-revenge");
        await user.click(button);
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith("7-guitarist-revenge");
      });
    });

    describe("the code is invalid", () => {
      it("will not call onSubmit", async () => {
        const onSubmit = jest.fn();
        const user = userEvent.setup();
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput onSubmit={onSubmit} />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const input = screen.getByTestId("code-input");
        const button = screen.getByTestId("code-input-submit");
        await user.type(input, "asdf");
        expect(user.click(button)).rejects.toThrow();
        // await user.click(button);
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe("pressing the enter key inside the text input", () => {
    describe("the code is valid", () => {
      it("will call onSubmit", async () => {
        const onSubmit = jest.fn();
        const user = userEvent.setup();
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput onSubmit={onSubmit} />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const input = screen.getByTestId("code-input");
        await user.type(input, "7-guitarist-revenge{Enter}");
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith("7-guitarist-revenge");
      });
    });

    describe("the code is invalid", () => {
      it("will not call onSubmit", async () => {
        const onSubmit = jest.fn();
        const user = userEvent.setup();
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput onSubmit={onSubmit} />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const input = screen.getByTestId("code-input");
        await user.type(input, "asdf{Enter}");
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe("error message visibility", () => {
    describe("the initial state", () => {
      it("will not show the error", () => {
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const error = screen.getByTestId("code-error-message");
        expect(error.textContent).toEqual(emptyLine);
      });
    });

    describe("when unfocused with an invalid code", () => {
      it("will show the error", async () => {
        const user = userEvent.setup();
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const container = screen.getByTestId("code-input-container");
        const input = screen.getByTestId("code-input");
        const error = screen.getByTestId("code-error-message");
        await user.type(input, "asdf");
        await user.click(container);
        expect(error.textContent).not.toEqual(emptyLine);
      });
    });

    describe("when unfocused with valid code", () => {
      it("will not show the error", async () => {
        const user = userEvent.setup();
        render(
          <ThemeProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Provider store={store}>
                <CodeInput />
              </Provider>
            </MemoryRouter>
          </ThemeProvider>
        );
        const container = screen.getByTestId("code-input-container");
        const input = screen.getByTestId("code-input");
        const error = screen.getByTestId("code-error-message");
        await user.type(input, "7-guitarist-revenge");
        await user.click(container);
        expect(error.textContent).toEqual(emptyLine);
      });
    });

    describe("when focused with an invalid code", () => {
      describe("the user hit enter", () => {
        it("will show the error", async () => {
          const user = userEvent.setup();
          render(
            <ThemeProvider>
              <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                  <CodeInput />
                </Provider>
              </MemoryRouter>
            </ThemeProvider>
          );
          const input = screen.getByTestId("code-input");
          const error = screen.getByTestId("code-error-message");
          await user.type(input, "asdf{Enter}");
          expect(error.textContent).not.toEqual(emptyLine);
        });
      });

      describe("the user did not hit enter", () => {
        it("will not show the error", async () => {
          const user = userEvent.setup();
          render(
            <ThemeProvider>
              <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                  <CodeInput />
                </Provider>
              </MemoryRouter>
            </ThemeProvider>
          );
          const input = screen.getByTestId("code-input");
          const error = screen.getByTestId("code-error-message");
          await user.type(input, "asdf");
          expect(error.textContent).toEqual(emptyLine);
        });
      });

      describe("the user hit enter then another key", () => {
        it("will show the error then hide it", async () => {
          const user = userEvent.setup();
          render(
            <ThemeProvider>
              <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                  <CodeInput />
                </Provider>
              </MemoryRouter>
            </ThemeProvider>
          );
          const input = screen.getByTestId("code-input");
          const error = screen.getByTestId("code-error-message");
          await user.type(input, "{Enter}");
          expect(error.textContent).not.toEqual(emptyLine);
          await user.type(input, "asdf");
          expect(error.textContent).toEqual(emptyLine);
        });
      });
    });
  });
});

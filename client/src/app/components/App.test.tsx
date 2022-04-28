import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

describe("<App />", () => {
  test("the user can navigate between send and receive pages", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    expect(screen.queryByTestId("send-page-container")).not.toBeNull();
    await user.click(screen.getByTestId("go-to-receive-page"));
    expect(screen.queryByTestId("receive-page-container")).not.toBeNull();
    await user.click(screen.getByTestId("go-to-send-page"));
    expect(screen.queryByTestId("send-page-container")).not.toBeNull();
  });

  test("returning to home page from the not found page", async () => {
    render(
      <MemoryRouter initialEntries={["/non-existent-route"]}>
        <App />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    expect(screen.queryByTestId("not-found-page-container")).not.toBeNull();
    await user.click(screen.getByTestId("not-found-page-back-button"));
    expect(screen.queryByTestId("send-page-container")).not.toBeNull();
  });
});

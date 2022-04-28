import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import SendPage from "./SendPage";

describe("<SendPage />", () => {
  test("user goes to code section upon uploading a file and can cancel", async () => {
    render(
      <MemoryRouter>
        <SendPage />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("send-page-upload-section")).not.toBeNull();
    const user = userEvent.setup();
    const uploadInput = screen.getByTestId("upload-file-input");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await user.upload(uploadInput, file);
    expect(screen.queryByTestId("send-page-code-section")).not.toBeNull();
    const cancelButton = screen.getByTestId("send-page-cancel-button");
    await user.click(cancelButton);
    expect(screen.queryByTestId("send-page-upload-section")).not.toBeNull();
  });
});

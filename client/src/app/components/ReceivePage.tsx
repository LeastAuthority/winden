import React from "react";
import { Link } from "react-router-dom";
import { CodeInput } from "./CodeInput";

type Props = {};

export default function ReceivePage({}: Props) {
  return (
    <div data-testid="receive-page-container">
      ReceivePage
      <Link data-testid="go-to-send-page" to="/s">
        Receive
      </Link>
      <CodeInput />
    </div>
  );
}

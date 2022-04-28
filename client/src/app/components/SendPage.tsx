import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function SendPage({}: Props) {
  return (
    <div data-testid="send-page-container">
      SendPage
      <div>
        Hello
        <Link data-testid="go-to-receive-page" to="/r">
          Receive
        </Link>
      </div>
    </div>
  );
}

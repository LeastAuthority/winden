import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function NotFoundScreen({}: Props) {
  return (
    <div data-testid="not-found-page-container">
      NotFoundPage{" "}
      <Link data-testid="not-found-page-back-button" to="s">
        Go back
      </Link>
    </div>
  );
}

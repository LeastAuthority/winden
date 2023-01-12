import React, { ComponentProps } from "react";
import { Link as UnwrappedLink } from "react-router-dom";
import { useNavigate } from "../hooks/useNavigate";
import { onTabExit } from "../hooks/useTabExitWarning";

/**
 * A wrapper around react-router-dom's {@link UnwrappedLink | Link}.
 * It triggers a page reload if a transfer is ongoing. This allows onunload
 * events to happen, such as {@link onTabExit}
 *
 * @see {@link useNavigate}
 */
export default function Link(
  props: Omit<ComponentProps<typeof UnwrappedLink>, "href"> & { to: string }
) {
  const navigate = useNavigate();

  return (
    <a
      {...props}
      onClick={(e) => {
        e.preventDefault();
        navigate(props.to);
      }}
    />
  );
}

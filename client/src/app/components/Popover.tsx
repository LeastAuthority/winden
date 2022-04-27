import React from "react";

type Props = React.PropsWithChildren<{
  elementRef: React.Ref<HTMLElement>;
  active: boolean;
}>;

export function Popover(props: Props) {
  return (props.active && <div>{props.children}</div>) || null;
}

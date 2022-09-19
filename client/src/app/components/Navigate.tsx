import React from "react";
import { useNavigate } from "react-router-dom";

// `react-transition-group` and `<Navigate />` from `react-router` causes an
// update loop that crashes the app. Use this component instead.
export default function Navigate(props: { to: string; replace: boolean }) {
  const { to, replace } = props;
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to, { replace });
  }, []);

  return null;
}

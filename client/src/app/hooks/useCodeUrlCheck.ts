import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "./useNavigate";

export function useCodeUrlCheck() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/" && location.hash) {
      navigate("/r", {
        replace: true,
        state: {
          code: location.hash,
        },
      });
    }
  }, [location.pathname, location.hash]);
}

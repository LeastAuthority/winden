import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateCode } from "../util/validateCode";
import { useCodeInput } from "./useCodeInput";
import { useWormhole } from "./useWormhole";

export function useCodeUrlCheck() {
  const location = useLocation();
  const wormhole = useWormhole();
  const navigate = useNavigate();
  const codeInput = useCodeInput();

  useEffect(() => {
    const code = location.pathname.slice(1);
    if (!validateCode(code)) {
      codeInput?.setValue(code);
      codeInput?.setSubmitting(true);
      navigate("/r", { replace: true });
      // HACK: have a better way to wait for wormhole to initialize
      setTimeout(() => {
        wormhole?.saveFile(code);
      }, 2000);
    }
  }, [location.pathname]);
}

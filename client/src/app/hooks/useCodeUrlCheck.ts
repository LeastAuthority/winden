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
    if (location.pathname == "/" && location.hash) {
      navigate("/r", { replace: true });

      const code = location.hash.slice(1);
      codeInput?.setValue(code);

      if (!validateCode(code)) {
        codeInput?.setSubmitting(true);
        // HACK: have a better way to wait for wormhole to initialize
        setTimeout(() => {
          wormhole?.receiveFileRequest(code);
        }, 2000);
      } else {
        codeInput?.setShowError(true);
        codeInput?.setTouched(true);
      }
    } else if (location.pathname == "/") {
      navigate("/s", { replace: true });
    }
  }, [location.hash]);
}

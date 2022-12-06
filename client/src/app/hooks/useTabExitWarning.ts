import { useEffect } from "react";

export function useTabExitWarning() {
  useEffect(() => {
    function onTabExit(ev: BeforeUnloadEvent) {
      ev.preventDefault();
      return (ev.returnValue =
        "Closing this tab will cancel the ongoing transfer. Are you sure you want to close?");
    }

    window.addEventListener("beforeunload", onTabExit);

    return () => {
      window.removeEventListener("beforeunload", onTabExit);
    };
  });
}

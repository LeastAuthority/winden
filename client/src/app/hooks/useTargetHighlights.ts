import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useTargetHighlights() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document.querySelectorAll(".target-highlight").forEach((el) => {
        el.classList.remove("target-highlight");
      });

      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element?.classList.contains("highlightable-target")) {
          element?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start",
          });
          element?.classList.add("target-highlight");
        } else {
          element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
      }, 200);
    }
    console.log(location);
  }, [location.key]);
}

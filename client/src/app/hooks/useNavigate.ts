import {
  NavigateOptions,
  useNavigate as unwrappedUseNavigate,
} from "react-router-dom";
import Link from "../components/Link";
import { useWormhole } from "./useWormhole";

/**
 * A wrapper around react-router-dom's {@link unwrappedUseNavigate | useNavigate}.
 * It triggers a page reload if a transfer is ongoing. This allows onunload
 * events to happen, such as {@link onTabExit}
 *
 * @see {@link Link}
 */
export function useNavigate() {
  const unwrappedNavigate = unwrappedUseNavigate();
  const wormhole = useWormhole();

  return function (to: string, options?: NavigateOptions) {
    if (wormhole?.fileMeta) {
      window.location.href = to;
    } else {
      unwrappedNavigate(to, options);
    }
  };
}

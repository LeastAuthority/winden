// TODO: remove
import {
  NavigateOptions,
  useNavigate as unwrappedUseNavigate,
} from "react-router-dom";
import Link from "../components/Link";
import { selectWormholeStatus } from "../wormholeSlice";
import { useAppSelector } from "./redux";

/**
 * A wrapper around react-router-dom's {@link unwrappedUseNavigate | useNavigate}.
 * It triggers a page reload if a transfer is ongoing. This allows onunload
 * events to happen, such as {@link onTabExit}
 *
 * @see {@link Link}
 */
export function useNavigate() {
  const unwrappedNavigate = unwrappedUseNavigate();
  const wormholeStatus = useAppSelector(selectWormholeStatus);

  return function (to: string, options?: NavigateOptions) {
    const isRedirectingHashUrlToReceivePage = Boolean(options?.state?.code);
    if (
      !isRedirectingHashUrlToReceivePage &&
      wormholeStatus !== "idle" &&
      wormholeStatus !== "done"
    ) {
      window.location.href = to;
    } else {
      unwrappedNavigate(to, options);
    }
  };
}

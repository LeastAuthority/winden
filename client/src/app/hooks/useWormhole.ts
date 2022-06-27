import { useContext } from "react";
import { WormholeContext } from "../components/providers/WormholeProvider";

export function useWormhole() {
  const wormhole = useContext(WormholeContext);
  return wormhole;
}

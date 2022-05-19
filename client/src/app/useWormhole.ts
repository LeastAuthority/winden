import { useContext } from "react";
import { WormholeContext } from "./WormholeProvider";

export function useWormhole() {
  const wormhole = useContext(WormholeContext);
  return wormhole;
}

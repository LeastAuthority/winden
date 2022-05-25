import { useContext } from "react";
import { WormholeContext } from "../components/WormholeProvider";

export function useWormhole() {
  const wormhole = useContext(WormholeContext);
  return wormhole;
}

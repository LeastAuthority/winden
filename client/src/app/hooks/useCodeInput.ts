import { useContext } from "react";
import { CodeInputContext } from "../components/providers/CodeInputProvider";

export function useCodeInput() {
  return useContext(CodeInputContext);
}

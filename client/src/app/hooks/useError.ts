import { useContext } from "react";
import { ErrorContext } from "../components/providers/ErrorProvider";

export function useError() {
  const error = useContext(ErrorContext);
  return error;
}

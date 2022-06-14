import { useContext } from "react";
import { ErrorContext } from "../components/ErrorProvider";

export function useError() {
  const error = useContext(ErrorContext);
  return error;
}

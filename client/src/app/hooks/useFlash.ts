import React, { useContext } from "react";

export type Flash = {
  title: string;
  content: string;
};

export const FlashContext = React.createContext<{
  value: Flash | null;
  set: React.Dispatch<React.SetStateAction<Flash | null>>;
} | null>(null);

export function useFlash() {
  const state = useContext(FlashContext);

  return state;
}

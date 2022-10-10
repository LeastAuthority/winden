import { useRef, useState } from "react";

// Like setState, but prevents a value from being updated faster than the
// specified rate limit to prevent a decrease in performance. Useful for items
// that frequently update their state.
export function useRateLimitedState<T>(
  initialState: T,
  rateLimitMs: number
): [T, (nextState: T) => void] {
  const [state, setState] = useState(initialState);
  const lastUsed = useRef(0);

  const rateLimitedSetState = (nextState: T) => {
    const now = Date.now();
    if (now - lastUsed.current > rateLimitMs) {
      setState(nextState);
      lastUsed.current = now;
    }
  };

  return [state, rateLimitedSetState];
}

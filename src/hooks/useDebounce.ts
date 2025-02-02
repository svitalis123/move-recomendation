import { useCallback, useRef } from 'react';

// Define a more specific type for the debounced function
type DebounceFunctionArgs = string | number | boolean | object;

export function useDebounce<T extends DebounceFunctionArgs>(
  callback: (arg: T) => void,
  delay: number
) {
  const timeoutRef = useRef<number | undefined>(undefined);

  return useCallback(
    (arg: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callback(arg);
      }, delay);
    },
    [callback, delay]
  );
}
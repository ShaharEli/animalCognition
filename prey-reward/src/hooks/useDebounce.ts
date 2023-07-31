import { useEffect } from "react";
import { useImmer } from "use-immer";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useImmer<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, setDebouncedValue]);

  return debouncedValue;
}

import { useEffect, useState } from "react";

// Returns `value`, but only after it has stopped changing for `delay` ms.
//
// How it works with the event loop: setTimeout hands the callback to the browser's timer,
// and when the delay is over the callback waits in the task queue until the call stack is
// empty. Every time `value` changes, React runs this effect's cleanup first, which cancels
// the previous timer, so only the timer from the last change survives and fires.
export default function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

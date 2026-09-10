/**
 * Exercises `react`, `a11y`, `stylisticJsx` and the TypeScript rules together.
 */

import type { JSX } from 'react';
import { useCallback, useState } from 'react';

export interface CounterProps {
  readonly label: string;
  readonly onChange?: (value: number) => void;
  readonly start?: number;
}

export function Counter({ label, onChange, start = 0 }: CounterProps): JSX.Element {
  const [count, setCount] = useState(start);

  const handleClick = useCallback(() => {
    setCount((current) => {
      const next = current + 1;

      onChange?.(next);

      return next;
    });
  }, [onChange]);

  return (
    <section aria-label={label}>
      <h2>{label}</h2>
      <p>{count}</p>
      <button
        type="button"
        onClick={handleClick}
      >
        Increment
      </button>
    </section>
  );
}

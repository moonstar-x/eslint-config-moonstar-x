/**
 * A module that should satisfy `base` + `typescript` + `stylistic` + `sorted`.
 */

export interface Point {
  readonly x: number;
  readonly y: number;
}

const ORIGIN: Point = { x: 0, y: 0 };

export const distanceFromOrigin = (point: Point): number => {
  const dx = point.x - ORIGIN.x;
  const dy = point.y - ORIGIN.y;

  return Math.hypot(dx, dy);
};

export const describe = (point: Point): string => {
  if (point.x === 0 && point.y === 0) {
    return 'origin';
  }

  return `(${point.x.toString()}, ${point.y.toString()})`;
};

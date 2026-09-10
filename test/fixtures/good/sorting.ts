/**
 * Exercises every rule in the `sorted` module.
 */

import path from 'node:path';
import type { Point } from './typed.js';
import { distanceFromOrigin } from './typed.js';

export enum Direction {
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Up = 'up'
}

export interface Shape {
  area: number;
  name: string;
  origin?: Point;
}

export type Primitive = boolean | number | string;

export type Labelled = Shape & { label: string };

export class Registry {
  public static readonly kind = 'registry';

  private readonly items: readonly string[];

  constructor(items: readonly string[]) {
    this.items = items;
  }

  public get size(): number {
    return this.items.length;
  }

  public describe(): string {
    return this.items.join(', ');
  }
}

const ALLOWED = new Set(['alpha', 'beta']);
const WEIGHTS = new Map([['alpha', 1], ['beta', 2]]);

export const isAllowed = (value: string): boolean => ALLOWED.has(value);

export const weightOf = (value: string): number => WEIGHTS.get(value) ?? 0;

export const isKnown = (value: string): boolean => ['alpha', 'beta'].includes(value);

export const resolve = (segment: string): string => path.join('/tmp', segment);

export const originDistance = (point: Point): number => distanceFromOrigin(point);

export const label = (direction: Direction): string => {
  switch (direction) {
    case Direction.Down:
      return 'down';
    case Direction.Left:
      return 'left';
    case Direction.Right:
      return 'right';
    case Direction.Up:
      return 'up';
  }
};

export { Registry as Store };

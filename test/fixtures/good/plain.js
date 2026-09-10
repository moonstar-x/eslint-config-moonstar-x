/**
 * A module that should satisfy `base` + `stylistic` + `sorted` without complaint.
 */

const SEPARATOR = ', ';

/**
 * @param {readonly string[]} values
 * @returns {string}
 */
export function join(values) {
  return values.join(SEPARATOR);
}

/**
 * @param {number} total
 * @param {number} count
 * @returns {number}
 */
export function average(total, count) {
  if (count === 0) {
    return 0;
  }

  return total / count;
}

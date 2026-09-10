/**
 * Exercises the `node` module: node globals, protocol imports and promise APIs.
 */

import { readFile } from 'node:fs/promises';
import process from 'node:process';

/**
 * @param {string} target
 * @returns {Promise<string>}
 */
export async function readUtf8(target) {
  const contents = await readFile(target, 'utf8');

  return contents.trim();
}

/**
 * @returns {string}
 */
export function currentPlatform() {
  return process.platform;
}

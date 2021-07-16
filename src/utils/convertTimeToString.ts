/*
 Copyright (c) Folly Systems.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/

/**
 * Normalize time to the format required for the video player
 * @param {num} seconds
 * @returns {string} For minutes and seconds E.g. 3 minutes and 45 secs = 03:45
 * or 25 secs = 00:25
 * For hour 4 hours = 04:00:00
 */
export const convertTimeToString = (secs) => {
  const isMinutes = secs >= 60;
  const val = (secs / (isMinutes ? 60 : 100)).toFixed(2);
  let [minutes, seconds] = val.split('.');

  minutes = minutes.length === 1 ? `0${minutes}` : minutes;
  seconds = isMinutes ? `${(secs % 60).toFixed()}` : seconds;
  seconds = `${seconds.length === 1 ? 0 : ''}${seconds}`;

  // TODO: Pending for Hour format 01:32:02

  return `${minutes}:${seconds}`;
};

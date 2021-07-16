/*
 Copyright (c) Folly Systems.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/

export const isVideoCustomizable =
  !!document.createElement('video').canPlayType;

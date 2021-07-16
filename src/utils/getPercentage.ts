/*
 Copyright (c) Folly Systems.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/
const getPercentage = (value, total) => {
  return (value / total) * 100;
};

export default getPercentage;

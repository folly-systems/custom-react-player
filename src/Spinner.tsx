/*
 Copyright (c) Folly Systems.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import styles from './styles/Spinner.module.css';

const Spinner: React.FC = () => {
  return (
    <div className={styles.videoSpinner}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;

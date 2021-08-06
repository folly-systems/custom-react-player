/*
 Copyright (c) Folly Systems.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/

import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/ProgressBar.module.css';
import { ProgressBarProps } from './types/ProgressBar';
import { getPercentage } from './utils';

const ProgressBar: React.FC<ProgressBarProps> = ({
  total,
  value,
  onChange,
  bufferValue,
}) => {
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [bufferProgressPercentage, setBufferProgressPercentage] =
    useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial and total value only if the value is greater than 0
    // If initial is less than 0 set it to 0
    // If total is less than 0 set it to 100
    const initProgressVal = value > 0 ? value : 0;
    const totalProgressVal = total > 0 ? total : 100;

    if (initProgressVal > totalProgressVal) {
      // If initial value is greater than total set initial progress to 100%
      setProgressPercentage(100);
    } else {
      setProgressPercentage((initProgressVal / totalProgressVal) * 100);
    }

    setTotalProgress(totalProgressVal);
  }, [value, total]);

  useEffect(() => {
    let bufferPercent = 0;
    if (bufferValue < total || bufferValue > 0) {
      bufferPercent = (bufferValue / total) * 100;
    }

    setBufferProgressPercentage(bufferPercent);
  }, [bufferValue]);

  /**
   *
   * @param progressPercent Percentage value of the slider progress
   * @param totalProgress Value of the total progress (Note: this is not in %)
   * @returns undefined
   *
   * If the user has passed onChange handler function calculate and
   * send the progress value as a parameter to onChange function
   */
  const handleOnChangeOfSliderValue = (progressPercent, totalProgressVal) => {
    // Pass current progress value to the parent if an onChange handler passed in the props
    if (onChange) {
      onChange((totalProgressVal * progressPercent) / 100);
    }
  };

  /**
   *
   * @param ev Click event for the slider
   * @returns undefined
   */
  const handleClick = (ev) => {
    // Get x coordinate and width for the slider
    const { x, width } = ev.target.getBoundingClientRect();
    const clickDistance = ev.clientX - x;
    const progressPercent = getPercentage(clickDistance, width);
    setProgressPercentage(progressPercent);

    handleOnChangeOfSliderValue(progressPercent, totalProgress);
  };

  /**
   *
   * @param ev Mousemove event for the cursor
   * @returns undefined
   */
  const handleMouseMove = (ev: MouseEvent): void => {
    // Get x coordinate and width for the slider
    const { x: sliderLeft, width: sliderWidth } =
      sliderRef.current?.getBoundingClientRect();
    // Get x coordinate for current mouse cursor
    const mousePointerLeft = ev.clientX;
    let progressPercent = getPercentage(
      mousePointerLeft - sliderLeft,
      sliderWidth,
    );

    if (progressPercent < 0 || progressPercent >= 100) {
      // If the calculated progress is less than 0 change it to 0
      // Dragging the mouse pointer beyond the slider(to the left) will make the
      // mousePointerLeft value less than sliderLeft value
      // If the calculated progress is greater than 100 change it to 100
      // Dragging the mouse pointer beyond the slider(to the right) will make the
      // progress percentage greater than 100
      progressPercent = progressPercent < 0 ? 0 : 100;
    }

    setProgressPercentage(progressPercent);

    handleOnChangeOfSliderValue(progressPercent, totalProgress);
  };

  /**
   *
   * @param ev Mouse click event for the slider handle
   * @returns undefined
   */
  const handleDraggerClick = (ev: React.MouseEvent<HTMLElement>): void => {
    // Stop bubbling of event in the slider
    ev.stopPropagation();
    ev.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);

    // Remove the mouse move event when the mouse click is released
    // Until the mouse is released the mouse move event will be listening
    // and changing the progress value of the progress bar
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', handleMouseMove);
      },
      { once: true },
    );
  };

  return (
    <div
      onClick={handleClick}
      role="progressbar"
      tabIndex={0}
      onKeyPress={() => {
        // Do nothing when user press any button from the keyboard
      }}
      ref={sliderRef}
      className={styles.slider}>
      <div
        className={styles.bufferProgressBar}
        style={{ width: `${bufferProgressPercentage}%` }}
      />

      <div
        className={styles.sliderProgressBar}
        style={{ width: `${progressPercentage}%` }}
      />

      <div
        className={styles.sliderHandle}
        style={{ left: `${progressPercentage - 1}%` }}
        onClick={(ev) => {
          // On click of handle do nothing
          // stopPropagation is added here to avoid bubbling of this event and triggering parent elements click event
          ev.stopPropagation();
        }}
        role="none"
        onMouseDown={handleDraggerClick}
      />
    </div>
  );
};

ProgressBar.defaultProps = {
  total: 100,
  value: 0,
  bufferValue: 0,
  onChange: undefined,
};

export default ProgressBar;

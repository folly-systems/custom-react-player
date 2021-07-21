/*
 Copyright (c) Folly Systems.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/

import React, { useEffect, useRef, useState } from 'react';
import { PauseIcon, FullScreenIcon, PlayIcon } from './assets/icons';
import styles from './styles/VideoPlayer.module.css';

import { convertTimeToString, isVideoCustomizable } from './utils';
import {
  BufferInfoProps,
  CustomVideoController,
  CustomVideoPlayerProps,
  PlaybackSpeeds,
  VideoPlayerEvents,
} from './types/VideoPlayer';
import Spinner from './Spinner';
import Slider from './ProgressBar';

export const CustomVideoPlayer: React.FunctionComponent<CustomVideoPlayerProps> =
  ({
    url,
    handleFullscreen,
    height = 400,
    width = 500,
    controls,
    playing,
    rounded,
    playerType,
    getVideoProgressDetails,
    onVideoProgress,
  }) => {
    const videoRef: any = useRef<HTMLVideoElement>(null);
    const [bufferProgress, setBufferProgress] = useState<number>(0);
    const [isVideoSeeking, setIsVideoSeeking] = useState<boolean>(false);
    const [videoDuration, setVideoDuration] = useState({
      totalTime: '00:00',
      currentTime: '00:00',
    });
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(
      PlaybackSpeeds['1x'],
    );

    const videoContainerStyle = {
      height,
      width,
    };
    const videoControlStyle = {
      width,
    };
    // Object with functions that returns information about the video speed, current time and playing status
    const customVideoController: CustomVideoController = {
      getPlaybackSpeed: () => videoRef.current.playbackRate,
      getCurrentTime: () => {
        return videoRef.current.currentTime;
      },
      getPlayingStatus: () =>
        !videoRef.current.paused && !videoRef.current.ended,
    };

    useEffect(() => {
      const currentVideo = videoRef.current;
      // If the current browser do not support video customization do not add custom controls
      if (!isVideoCustomizable) {
        setIsVideoLoaded(true);

        return;
      }

      // Disable the default video player controls
      currentVideo.controls = false;

      /**
       * Checks all the video buffer chunk and if current time exists inside any
       * of the buffer range return end time of how much video is buffered
       * @param {num} currentPlayingTime
       * @param {functions} bufferInfoProvider
       * @returns {number} End time for the buffered video chunk
       * Percentage of how much video is buffered with regards to the current video duration
       * Returns zero if nothing found
       */
      const returnBufferProgressTime = (
        currentPlayingTime: number,
        bufferInfoProvider: BufferInfoProps,
      ): number => {
        for (
          let timeRangeCounter = 0;
          timeRangeCounter < bufferInfoProvider.length;
          timeRangeCounter += 1
        ) {
          const currentBufferEndTime = bufferInfoProvider.end(timeRangeCounter);
          const currentBufferStartTime =
            bufferInfoProvider.start(timeRangeCounter);

          // If any current video time falls between loaded video buffer chunk
          // return new value for the buffer progress indicator
          // Buffer data includes length(i.e. number of buffers),
          // start(index) and end(index) function that provides with start/end time of the buffer it takes buffer index as input
          if (
            currentBufferStartTime <= currentPlayingTime &&
            currentPlayingTime <= currentBufferEndTime
          ) {
            return currentBufferEndTime;
          }
        }
        return 0;
      };

      /**
       * Set value of how much of the video is buffered
       * @returns {undefined} Nothing returned from this function
       * Set value of how much video is buffered with regards to the current video duration
       */
      const showVideoBufferProgress = () => {
        if (!videoRef?.current) {
          return;
        }
        const { currentTime, duration, buffered } = videoRef?.current;
        const bufferProgressVal: number =
          currentTime !== null && duration && buffered
            ? returnBufferProgressTime(currentTime, buffered)
            : 0;

        setBufferProgress(bufferProgressVal);
      };

      /**
       * Handles change when there is progress in the video(videos timeUpdate event is fired)
       * @returns {undefined} Nothing returned from this function
       * Handles the following tasks:
       * 1. Change video current time.
       * 2. Send progress related data to the user
       * 3. Show buffer progress.
       */
      const handleProgressBarUpdate = () => {
        if (videoRef.current!.currentTime === videoRef.current!.duration) {
          // Set playing to false if the video has played entirely
          setIsPlaying(false);
        }

        setVideoDuration((prevState) => ({
          ...prevState,
          currentTime: convertTimeToString(videoRef.current!.currentTime),
        }));

        // If a custom handler is passed for getting video progress details
        // run that function and pass progress data as a parameter to it
        if (onVideoProgress) {
          onVideoProgress({
            isPlaying: customVideoController.getPlayingStatus(),
            currentTime: customVideoController.getCurrentTime(),
            speed: customVideoController.getPlaybackSpeed(),
            totalTime: videoRef.current.duration,
          });
        }

        showVideoBufferProgress();
      };

      /**
       * Set loader if the video is seeking or stalled
       * @returns {undefined} Nothing returned from this function
       */
      const showBufferingLoader = () => {
        setIsVideoSeeking(true);
      };

      /**
       * Remove loader once the video is seeked
       * @returns {undefined} Nothing returned from this function
       */
      const hideBufferingLoader = () => {
        setIsVideoSeeking(false);
      };

      currentVideo.addEventListener(
        VideoPlayerEvents.LoadedMetadata,
        () => {
          // Remove loader
          setIsVideoLoaded(true);

          // After we get the video time details update total duration and current time to the state
          setVideoDuration({
            totalTime: convertTimeToString(currentVideo!.duration),
            currentTime: '00:00',
          });

          // Show how much of the video is buffered
          currentVideo.addEventListener(
            VideoPlayerEvents.Progress,
            showVideoBufferProgress,
          );
          videoRef.current.playbackRate =
            playing?.speed || PlaybackSpeeds['1x'];
          videoRef.current.currentTime = playing?.time || 0;

          // Autoplay video
          if (playing?.status) {
            currentVideo.addEventListener(
              VideoPlayerEvents.CanPlayThrough,
              () => {
                videoRef.current?.play();
              },
              { once: true },
            );
          }

          // If a custom handler is passed for getting video progress details
          // run that function and pass progress data as a parameter to it
          if (getVideoProgressDetails) {
            getVideoProgressDetails(customVideoController);
          }

          // If the video is stalled or seeking show loader and once seeked remove the loader
          currentVideo.addEventListener(
            VideoPlayerEvents.Stalled,
            showBufferingLoader,
          );
          currentVideo.addEventListener(
            VideoPlayerEvents.Seeking,
            showBufferingLoader,
          );
          currentVideo.addEventListener(
            VideoPlayerEvents.Seeked,
            hideBufferingLoader,
          );

          // Update progress bar whenever the video time is updated
          currentVideo.addEventListener(
            VideoPlayerEvents.Timeupdate,
            handleProgressBarUpdate,
          );
        },
        { once: true },
      );

      // Cleanup all the event listeners on unmount
      return () => {
        currentVideo.removeEventListener(
          VideoPlayerEvents.Timeupdate,
          handleProgressBarUpdate,
        );
        currentVideo.removeEventListener(
          VideoPlayerEvents.Stalled,
          showBufferingLoader,
        );
        currentVideo.removeEventListener(
          VideoPlayerEvents.Seeking,
          showBufferingLoader,
        );
        currentVideo.removeEventListener(
          VideoPlayerEvents.Seeked,
          hideBufferingLoader,
        );
        currentVideo.removeEventListener(
          VideoPlayerEvents.Progress,
          showVideoBufferProgress,
        );
      };
    }, []);

    useEffect(() => {
      let playVideo;
      let speed;
      if (!videoRef.current) return;

      if (playing?.status) {
        speed = playing?.speed || PlaybackSpeeds['1x'];
        playVideo = true;
        videoRef.current?.play();
      } else {
        speed = playing?.speed || PlaybackSpeeds['1x'];
        playVideo = false;

        videoRef.current?.pause();
      }

      videoRef.current.currentTime = playing?.time || 0;
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setIsPlaying(playVideo);
    }, [playing]);

    /**
     * Play video if the video is paused
     * Pause video if the video is playing
     * Set isPlaying status as true/false depending on whether video is played/pause
     * @returns {undefined} Nothing returned from this function
     */
    const handleVideoPlayPause = () => {
      let isPlayingStatus = false;
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play();

        isPlayingStatus = true;
      } else {
        videoRef.current.pause();
      }

      setIsPlaying(isPlayingStatus);
    };

    /**
     * Change playback speed
     * Increase playback speed and if it is the highest speed
     * set to lowest speed again
     * @returns {undefined} Nothing returned from this function
     */
    const handlePlaybackSpeedChange = (): void => {
      const newSpeed =
        playbackSpeed === PlaybackSpeeds['2x']
          ? PlaybackSpeeds['1x']
          : playbackSpeed + 0.5;

      setPlaybackSpeed(newSpeed);
      videoRef.current.playbackRate = newSpeed;
    };

    /**
     * If a default fullscreen handler is passed run that function
     * or else run video players default fullscreen method
     * @returns {undefined} Nothing returned from this function
     */
    const handleDefaultFullScreen = (): void => {
      if (handleFullscreen) {
        handleFullscreen(customVideoController);
        return;
      }

      videoRef.current.requestFullscreen();
    };

    /**
     * Default handler for sliders onchange
     * @returns {undefined} Nothing returned from this function
     */
    const handleVideoTimeSliderUpdate = (value): void => {
      videoRef.current.currentTime = value;
    };

    // Handle keyboard button click when focus is on
    // any player control button
    const handleOnKeyDownForFocusedControl =
      (clickHandler) =>
      (ev): void => {
        if (ev.keyCode === 13 || ev.keyCode === 32) {
          clickHandler();
        }
      };

    return (
      <>
        <div className={styles.videoContainer} style={videoContainerStyle}>
          <video
            className={`${styles.videoContainer__videoComponent} ${
              rounded ? styles['videoContainer__videoComponent--rounded'] : ''
            }`}
            onClick={handleVideoPlayPause}
            ref={videoRef}
            src={url}
            style={videoContainerStyle}>
            <track kind="captions" />
          </video>

          {isVideoSeeking && (
            <div className={styles.videoContainer__bufferSpinner}>
              <Spinner />
            </div>
          )}

          {isVideoLoaded ? (
            <div>
              <div
                className={`${styles.videoContainer__controlShadow} ${
                  isPlaying ? styles['controls__section--showOnHover'] : ''
                } ${
                  rounded
                    ? styles['videoContainer__controlShadow--rounded']
                    : ''
                }`}
              />

              <div
                className={`${styles.videoContainer__controls} ${
                  isPlaying ? styles['controls__section--showOnHover'] : ''
                }`}
                style={videoControlStyle}>
                <div className={styles['slider-container']}>
                  <Slider
                    onChange={handleVideoTimeSliderUpdate}
                    total={videoRef.current.duration}
                    value={videoRef.current.currentTime}
                    bufferValue={bufferProgress}
                  />
                </div>

                <div
                  className={`${styles.videoContainer__controlButton} ${
                    playerType === 'big'
                      ? styles['videoContainer__controlButton--big']
                      : styles['videoContainer__controlButton--small']
                  }`}>
                  <div
                    className={`${styles.controlSection} ${styles.controlSectionOne}`}>
                    {controls?.playPause?.show === false ? null : (
                      <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={handleOnKeyDownForFocusedControl(
                          handleVideoPlayPause,
                        )}
                        className={`${styles.playerIcon} ${styles['playerIcon--left']}`}
                        onClick={handleVideoPlayPause}>
                        {isPlaying
                          ? controls?.playPause?.pauseIcon || <PauseIcon />
                          : controls?.playPause?.playIcon || <PlayIcon />}
                      </div>
                    )}

                    {controls?.time?.show === false ? null : (
                      <div
                        style={{
                          color: controls?.time?.color || 'white',
                        }}
                        className={`${styles.timeSection} ${styles['timeSection--left']}`}>
                        {videoDuration.currentTime} / {videoDuration.totalTime}
                      </div>
                    )}
                  </div>

                  <div
                    className={`${styles.controlSection} ${styles.controlSectionTwo}`}>
                    {controls?.playbackSpeed?.show === false ? null : (
                      <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={handleOnKeyDownForFocusedControl(
                          handlePlaybackSpeedChange,
                        )}
                        className={`${styles.playerIcon} ${styles['playerIcon--right']}`}
                        onClick={handlePlaybackSpeedChange}>
                        <span
                          style={{
                            color: controls?.playbackSpeed?.color || 'white',
                          }}
                          className={styles.controlSection__speed}>
                          {playbackSpeed}x
                        </span>
                      </div>
                    )}

                    {controls?.fullscreen?.show === false ? null : (
                      <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={handleOnKeyDownForFocusedControl(
                          handleDefaultFullScreen,
                        )}
                        className={`${styles.playerIcon} ${styles['playerIcon--right']}`}
                        onClick={handleDefaultFullScreen}>
                        {controls?.fullscreen?.icon || <FullScreenIcon />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`${styles.videoContainer__videoLoadingOverlay}`}>
              <Spinner />
            </div>
          )}
        </div>
      </>
    );
  };

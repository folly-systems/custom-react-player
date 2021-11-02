/*
 Copyright (c) Folly Systems.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/

export interface CustomVideoPlayerProps {
  url: string;
  handleFullscreen?: Function;
  getVideoProgressDetails?: Function;
  onVideoProgress?: Function;
  height?: number;
  width?: number;
  playing?: {
    status: boolean;
    time: number;
    speed: PlaybackSpeeds;
  };
  controls?: {
    fullscreen?: {
      show?: boolean;
      icon?: JSX.Element;
    };
    playPause?: {
      show?: boolean;
      playIcon?: JSX.Element;
      pauseIcon?: JSX.Element;
    };
    playbackSpeed?: {
      show?: boolean;
      color?: string;
    };
    volume?: {
      show?: boolean;
      icon?: JSX.Element;
    };
    time?: {
      show?: boolean;
      color?: string;
    };
  };
  rounded?: boolean;
  playerType?: 'big' | 'small';
  isVideoPlayableWithoutOptions?: boolean;
}

export enum PlaybackSpeeds {
  '1x' = 1,
  '1.5x' = 1.5,
  '2x' = 2,
}

export interface BufferInfoProps {
  start: Function;
  end: Function;
  length: number;
}

export enum VideoPlayerEvents {
  Progress = 'progress',
  Stalled = 'stalled',
  Seeking = 'seeking',
  Seeked = 'seeked',
  Timeupdate = 'timeupdate',
  LoadedMetadata = 'loadedmetadata',
  CanPlayThrough = 'canplaythrough',
}

export interface CustomVideoController {
  getPlaybackSpeed: Function;
  getCurrentTime: Function;
  getPlayingStatus: Function;
}

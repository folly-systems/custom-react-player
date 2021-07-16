/*
 Copyright (c) Folly Systems.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/

import React from 'react';

export const PauseIcon = () => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <rect
          x="3.94836"
          y="2"
          width="3.42276"
          height="15"
          rx="0.5"
          fill="white"
        />
        <rect
          x="10.6289"
          y="2"
          width="3.42276"
          height="15"
          rx="0.5"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="1.94836"
          y="0"
          width="14.1033"
          height="19"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const PlayIcon = () => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path
          d="M3.06263 17C2.89687 17 2.7379 16.9342 2.62068 16.8169C2.50347 16.6997 2.43762 16.5408 2.43762 16.375V2.62473C2.43767 2.51498 2.46662 2.40718 2.52155 2.31217C2.57649 2.21716 2.65547 2.13828 2.75056 2.08349C2.84565 2.02869 2.9535 1.99989 3.06324 2C3.17299 2.00011 3.28078 2.02911 3.37576 2.0841L15.251 8.95923C15.3457 9.01417 15.4243 9.09303 15.479 9.18791C15.5336 9.28279 15.5624 9.39036 15.5624 9.49986C15.5624 9.60936 15.5336 9.71693 15.479 9.81181C15.4243 9.90669 15.3457 9.98555 15.251 10.0405L3.37576 16.9156C3.28065 16.9709 3.17262 17 3.06263 17Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.437622"
          y="0"
          width="17.1248"
          height="19"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const FullScreenIcon = () => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <g filter="url(#filter0_d)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.80769 2C2.53368 2 1.5 3.03368 1.5 4.30769V6.78022C1.5 7.12996 1.63893 7.46537 1.88623 7.71267C2.13353 7.95997 2.46895 8.0989 2.81868 8.0989C3.16842 8.0989 3.50383 7.95997 3.75113 7.71267C3.99843 7.46537 4.13736 7.12995 4.13736 6.78022V4.63736H6.28022C6.62995 4.63736 6.96537 4.49843 7.21267 4.25113C7.45997 4.00383 7.5989 3.66842 7.5989 3.31868C7.5989 2.96895 7.45997 2.63353 7.21267 2.38623C6.96537 2.13893 6.62996 2 6.28022 2H3.80769ZM11.7198 2C11.37 2 11.0346 2.13893 10.7873 2.38623C10.54 2.63353 10.4011 2.96894 10.4011 3.31868C10.4011 3.66842 10.54 4.00383 10.7873 4.25113C11.0346 4.49843 11.37 4.63736 11.7198 4.63736H13.8626V6.78022C13.8626 7.12996 14.0016 7.46537 14.2489 7.71267C14.4962 7.95997 14.8316 8.0989 15.1813 8.0989C15.5311 8.0989 15.8665 7.95997 16.1138 7.71267C16.3611 7.46537 16.5 7.12996 16.5 6.78022V4.30769C16.5 3.03368 15.4663 2 14.1923 2H11.7198ZM2.81868 10.9011C2.46894 10.9011 2.13353 11.04 1.88623 11.2873C1.63893 11.5346 1.5 11.87 1.5 12.2198V14.6923C1.5 15.3043 1.74313 15.8913 2.17591 16.3241C2.60868 16.7569 3.19565 17 3.80769 17H6.28022C6.62996 17 6.96537 16.8611 7.21267 16.6138C7.45997 16.3665 7.5989 16.0311 7.5989 15.6813C7.5989 15.3316 7.45997 14.9962 7.21267 14.7489C6.96537 14.5016 6.62996 14.3626 6.28022 14.3626H4.13736V12.2198C4.13736 11.87 3.99843 11.5346 3.75113 11.2873C3.50383 11.04 3.16842 10.9011 2.81868 10.9011ZM15.1813 10.9011C14.8316 10.9011 14.4962 11.04 14.2489 11.2873C14.0016 11.5346 13.8626 11.87 13.8626 12.2198V14.3626H11.7198C11.37 14.3626 11.0346 14.5016 10.7873 14.7489C10.54 14.9962 10.4011 15.3316 10.4011 15.6813C10.4011 16.0311 10.54 16.3665 10.7873 16.6138C11.0346 16.8611 11.37 17 11.7198 17H14.1923C14.8043 17 15.3913 16.7569 15.8241 16.3241C16.2569 15.8913 16.5 15.3043 16.5 14.6923V12.2198C16.5 11.87 16.3611 11.5346 16.1138 11.2873C15.8665 11.04 15.5311 10.9011 15.1813 10.9011Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="-0.5"
          y="0"
          width="19"
          height="19"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <clipPath id="clip0">
          <rect width="18" height="19" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

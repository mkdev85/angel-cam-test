import React from 'react';

import type { CircularProgressProps } from '@mui/material';
import { CircularProgress } from '@mui/material';

import { colors } from '@angel/ui-kit/theme';

import { LoaderWrapper } from './Loader.styles';

export const Loader: React.FC<CircularProgressProps> = props => {
  return (
    <LoaderWrapper>
      <div className="hide-svg">
        <svg>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.gradient_2} />
              <stop offset="100%" stopColor={colors.gradient_1} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} {...props} />
    </LoaderWrapper>
  );
};

Loader.displayName = 'Loader';

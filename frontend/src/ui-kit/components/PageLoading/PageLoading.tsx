import React from 'react';

import { Loader } from '../Loader/Loader';

import type { PageLoadingProps } from './PageLoading.props';
import { PageLoadingWrapper } from './PageLoading.styles';

export const PageLoading: React.FC<PageLoadingProps> = props => {
  const { size = 100 } = props;

  return (
    <PageLoadingWrapper>
      <Loader disableShrink size={size} />
    </PageLoadingWrapper>
  );
};

PageLoading.displayName = 'PageLoading';

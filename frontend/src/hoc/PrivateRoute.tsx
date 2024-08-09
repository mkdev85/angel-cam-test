import React from 'react';

import { useAuth } from '@angel/hooks/useAuth';
import { PageLoading } from '@angel/ui-kit/components/PageLoading/PageLoading';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = props => {
  const { children } = props;
  const isAllowed = useAuth();

  if (isAllowed) {
    return children;
  }

  return <PageLoading />;
};

PrivateRoute.displayName = 'PrivateRoute';

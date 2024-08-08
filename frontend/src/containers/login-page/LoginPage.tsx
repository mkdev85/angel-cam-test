import React from 'react';

import type { LoginPageProps } from './LoginPage.props';
import { LoginPageWrapper } from './LoginPage.styles';

export const LoginPage: React.FC<LoginPageProps> = props => {

  return (
    <LoginPageWrapper>
      Hello LoginPage!
    </LoginPageWrapper>
  );
};

LoginPage.displayName = 'LoginPage';

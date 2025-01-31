import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useSignupMutation } from '@angel/queries/useSignInMutation';
import { Button } from '@angel/ui-kit/components/Button/Button';

import type { LoginPageProps } from './LoginPage.props';
import { LoginPageWrapper } from './LoginPage.styles';

const SigninSchema = Yup.object().shape({
  pat: Yup.string().required('Please entry you personal acsess token'),
});

export const LoginPage: React.FC<LoginPageProps> = props => {
  const signinMutation = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      pat: '',
    },
    validationSchema: SigninSchema,
    onSubmit: async value => {
      await signinMutation.mutateAsync({ token: value.pat });
    },
  });

  return (
    <LoginPageWrapper>
      <Avatar className="avatar-wrapper">
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Box component="form" className="sign-in-form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="pat"
          label="PAT *"
          type="password"
          value={formik.values.pat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pat && !!formik.errors.pat}
          helperText={formik.touched.pat && formik.errors.pat}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="button"
          loading={signinMutation.isPending}
          disabled={signinMutation.isPending}
        >
          Sign In
        </Button>
      </Box>
    </LoginPageWrapper>
  );
};

LoginPage.displayName = 'LoginPage';

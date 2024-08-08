import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import type { LoginPageProps } from './LoginPage.props';
import { LoginPageWrapper } from './LoginPage.styles';

const SigninSchema = Yup.object().shape({
  pat: Yup.string().required('Please entry you personal acsess token'),
});

export const LoginPage: React.FC<LoginPageProps> = props => {
  const formik = useFormik({
    initialValues: {
      pat: '',
    },
    validationSchema: SigninSchema,
    onSubmit: value => {
      console.log(value);
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
          margin="normal"
          required
          fullWidth
          name="pat"
          label="PAT"
          type="password"
          value={formik.values.pat}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pat && !!formik.errors.pat}
          helperText={formik.touched.pat && formik.errors.pat}
        />

        <Button type="submit" fullWidth variant="contained" className="button">
          Sign In
        </Button>
      </Box>
    </LoginPageWrapper>
  );
};

LoginPage.displayName = 'LoginPage';

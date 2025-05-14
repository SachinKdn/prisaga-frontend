'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { NewPasswordSchema } from '@utils/yup';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './common/Input';
import { CustomButton } from './common/Button';
import theme from '@app/theme';
import { createPassword } from '@api/client';
import { useParams } from 'next/navigation';
import handleSuccess from '@hooks/handleSuccess';
import Link from 'next/link';

const CreateNewPasswordForm = () => {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewPassword>({
    resolver: yupResolver(NewPasswordSchema),
  });
  console.log('params', params.token);
  const onSubmit = async (data: INewPassword) => {
    setIsLoading(true);
    if (!params.token) return;
    const token = Array.isArray(params.token) ? params.token[0] : params.token;
    const result = await createPassword(token, data);
    if (result) {
      handleSuccess('New password created successfully');
      router.push('/login');
    }
    setIsLoading(false);
  };
  return (
    <Box sx={styles.sideForm} pl={5}>
      <Box sx={styles.sideFormInner}>
        <Typography sx={styles.heading}>Create Password</Typography>

        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Box
            mt={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
            }}
          >
            <Input
              label="New Password"
              placeholder="Create new password"
              type="password"
              name="password"
              register={register}
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Rewrite your password"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />
          </Box>

          <CustomButton
            type="submit"
            variant="contained"
            style={styles.submitButton}
            disabled={isLoading}
            loading={isLoading}
            btnText="Continue"
          />
        </form>

        <Typography
          component="span"
          //   onClick={() => router.push('/signup')}
          my={3}
          sx={styles.footer}
        >
          Don&apos;t want to create new password?{' '}
          <Link href={'/login'}>Log In</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateNewPasswordForm;
const styles = {
  heading: {
    fontSize: 35,
    fontWeight: 700,
    lineHeight: 1,
    [theme.breakpoints.down('md')]: {
      marginTop: '120px',
      fontSize: 30,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      fontSize: 25,
    },
  },
  sideForm: {
    width: '30%',
    padding: '0',
    margin: 'auto',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '46%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: 'unset',
      borderRadius: 0,
      position: 'relative',
      marginTop: 4,
    },
  },
  sideFormInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    maxWidth: '100%',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      alignItems: 'center',
    },
  },
  submitButton: {
    marginTop: 2,
    fontWeight: 400,
    width: '100%',
  },
  footer: {
    width: '90%',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '0.875rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
};

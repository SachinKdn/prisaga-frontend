'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import theme from '@/app/theme';
import { AppDispatch } from '@/store';
import { loginSuccess } from '@/store/slices/user';
import { LoginSchema } from '@/utils/yup';

import { Input } from '@/components/common/Input';
import { CustomButton } from '@/components/common/Button';
import { UserRole } from '@constant/enum';
import handleError from '@hooks/handleError';
import { setToken } from '@api/tokenHandler';

interface UserLogin {
  email: string;
  password: string;
}

interface LoginUserResponse {
  user: User;
  accessToken: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (formData: UserLogin) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}user/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const result: IResponse<LoginUserResponse> = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      await setToken(result.data.accessToken);
      handleAuthSuccess(result.data.user, result.data.accessToken);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (user: User, accessToken: string) => {
    localStorage.setItem('token', accessToken);
    dispatch(loginSuccess(user));
    const routeMap: Record<UserRole, string> = {
      [UserRole.SUPERADMIN]: '/resume',
      [UserRole.ADMIN]: '/resume',
      [UserRole.VENDOR]: '/vendor',
      [UserRole.USER]: '/user',
    };
    const route = routeMap[user.role as UserRole];
    router.push(route);
  };

  return (
    <Box sx={styles.sideForm} pl={5}>
      <Box sx={styles.sideFormInner}>
        <Typography sx={styles.heading}>Welcome Back 👋</Typography>

        <Typography mt={2} sx={{ fontSize: 18, lineHeight: 1 }}>
          Enter details to login
        </Typography>

        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Box mt={3} sx={{ width: '100%' }}>
            <Input
              label="Email"
              placeholder="Enter Email"
              name="email"
              register={register}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              component="span"
              onClick={() => {}}
              textAlign="right"
              width="100%"
              sx={{
                cursor: 'pointer',
                display: 'block',
                width: 'fit-content',
              }}
            >
              <strong style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                Forgot Password?
              </strong>
            </Typography>
          </Box>

          <CustomButton
            type="submit"
            variant="contained"
            style={styles.submitButton}
            disabled={isLoading}
            loading={isLoading}
            btnText="Login"
          />
        </form>

        <Typography
          component="span"
          onClick={() => router.push('/signup')}
          my={3}
          sx={styles.footer}
        >
          Don&apos;t have an account? <strong>Sign up</strong>
        </Typography>
      </Box>
    </Box>
  );
};

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
    alignItems: 'flex-start',
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

export default LoginForm;

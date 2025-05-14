'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EmailConfirmationImage from '@assets/png/emailConfirmation.png';
import Image from 'next/image';
import theme from '@/app/theme';
import { Input } from '@/components/common/Input';
import { CustomButton } from '@/components/common/Button';
import Link from 'next/link';
import { AgencySignupSchema } from '@utils/yup';
import FormControllerSelector from './common/FormControllerSelector';
import { userBusinessTypes } from '@constant/resume-data';
import { registerAgency } from '@api/client';

const AgencySignupForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AgencySignup>({
    resolver: yupResolver(AgencySignupSchema),
    defaultValues: {
      userBusinessType: 'Recruitment Agency',
    },
  });
  console.log(errors);
  const onSubmit = async (formData: AgencySignup) => {
    setIsLoading(true);
    console.log(formData);
    const result = await registerAgency(formData);
    if (result) setIsRegistrationSuccess(true);
    setIsLoading(false);
  };

  return (
    <Box sx={styles.sideForm} pl={5}>
      {!isRegistrationSuccess ? (
        <Box sx={styles.sideFormInner}>
          <Typography sx={styles.heading}>Create Agency Account</Typography>

          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <Box mt={3} sx={{ width: '100%' }}>
              <FormControllerSelector<AgencySignup>
                name="userBusinessType"
                control={control}
                required
                labelText="What best describes your business?"
                options={userBusinessTypes}
                errorMessage={errors.userBusinessType?.message}
              />
              <Input
                label="First Name"
                placeholder="Enter First Name"
                name="firstName"
                required
                register={register}
                error={errors.firstName?.message}
              />

              <Input
                label="Last Name"
                placeholder="Enter Last Name"
                name="lastName"
                register={register}
                error={errors.lastName?.message}
              />

              <Input
                label="Email"
                required
                placeholder="Enter Email"
                name="email"
                register={register}
                error={errors.email?.message}
              />
              <Input
                label="Password"
                required
                type="password"
                placeholder="Create password"
                name="password"
                register={register}
                error={errors.password?.message}
              />

              <Input
                label="Phone Number"
                required
                type="phone"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber?.message}
              />

              <Input
                label="Agency Name"
                required
                placeholder="Enter Agency Name"
                name="agencyName"
                register={register}
                error={errors.agencyName?.message}
              />
            </Box>

            <CustomButton
              type="submit"
              variant="contained"
              style={styles.submitButton}
              disabled={isLoading}
              loading={isLoading}
              btnText="Register"
            />
          </form>

          <Typography component="span" my={3} sx={styles.footer}>
            Already have an account? <Link href={'/login'}>Login</Link>
          </Typography>
        </Box>
      ) : (
        <Box sx={{ ...styles.sideFormInner, ...styles.invitationWrapper }}>
          <Box sx={styles.imgWrapper}>
            <Image
              src={EmailConfirmationImage}
              alt="email image"
              style={styles.confirmImg}
            />
          </Box>
          <Typography sx={styles.thankHeading}>
            We have just sent confirmation link to
          </Typography>
          <Typography sx={styles.email}>{watch('email')}</Typography>
        </Box>
      )}
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
    height: '100%',
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
    height: '100%',
    maxWidth: '100%',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      alignItems: 'center',
    },
  },
  invitationWrapper: {
    marginTop: '80px',
    justifyContent: 'flex-start',
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
  confirmImg: {
    width: '100%',
    height: '300px',
    margin: 'auto',
  },
  imgWrapper: {
    display: 'grid',
    placeItems: 'center',
  },
  thankHeading: {
    fontSize: '1.1rem',
    textAlign: 'center',
  },
  email: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: theme.palette.primary.main,

    textAlign: 'center',
  },
};

export default AgencySignupForm;

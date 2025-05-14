'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { permanentRedirect } from 'next/navigation';
import theme from '@/app/theme';
import Image from 'next/image';
import EmailConfirmationImage from '@assets/png/emailConfirmation.png';
import { CustomButton } from '../common/Button';

const ThankYouPage: React.FC = () => {
  const handleLogin = () => {
    return permanentRedirect('/login');
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.contentWrapper}>
        <Box sx={styles.imageContainer}>
          <Image
            src={EmailConfirmationImage}
            alt="Thank you illustration"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain' as const,
            }}
            priority
          />
        </Box>

        <Typography sx={styles.heading}>
          Thank You for Submitting Your Details!
        </Typography>

        <Typography sx={styles.subHeading}>
          Our team will review your information and connect with you shortly.
        </Typography>

        <Box sx={styles.infoContainer}>
          <Typography sx={styles.infoText}>What happens next?</Typography>
          <Box sx={styles.stepsContainer}>
            <Box sx={styles.step}>
              <Box sx={styles.stepNumber}>1</Box>
              <Typography sx={styles.stepText}>
                Our team will review your agency details
              </Typography>
            </Box>
            <Box sx={styles.step}>
              <Box sx={styles.stepNumber}>2</Box>
              <Typography sx={styles.stepText}>
                We&apos;ll verify your information
              </Typography>
            </Box>
            <Box sx={styles.step}>
              <Box sx={styles.stepNumber}>3</Box>
              <Typography sx={styles.stepText}>
                You&apos;ll receive a call from our team.
              </Typography>
            </Box>
          </Box>
        </Box>

        <CustomButton
          onClick={handleLogin}
          variant="contained"
          style={styles.button}
          btnText="Go to Login"
        />
      </Box>
    </Box>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    backgroundColor: theme.palette.background.default,
  },
  contentWrapper: {
    width: '80%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    width: '200px',
    height: '200px',
    marginBottom: '2rem',
    position: 'relative',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: '0.4rem',
  },
  subHeading: {
    fontSize: '1.1rem',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: '1rem',
    lineHeight: 1.5,
  },
  infoContainer: {
    width: '100%',
    marginBottom: '2rem',
  },
  infoText: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: '0.75rem',
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 600,
  },
  stepText: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
  button: {
    width: '100%',
    maxWidth: '300px',
    height: '48px',
    fontSize: '1rem',
    fontWeight: 500,
    marginTop: '1rem',
  },
};

export default ThankYouPage;

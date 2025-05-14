'use client';
import { Box, Typography } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import theme from '@app/theme';

const BackPage = () => {
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push('/jobs');
    } else {
      router.back();
    }
  };
  return (
    <Box sx={styles.wrapper} onClick={handleBack}>
      <ArrowLeft
        size={16}
        strokeWidth={2.5}
        color={theme.palette.text.primary}
      />
      <Typography sx={styles.text}>Go Back</Typography>
    </Box>
  );
};

export default BackPage;

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    cursor: 'pointer',
    width: 'fit-content',
    padding: '8px',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  text: {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
};

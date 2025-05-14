'use client';
import React from 'react';
import { Box } from '@mui/material';
import theme from '@app/theme';
import SubcriptionSelector from './SubscriptionSelector';
const Subscription = () => {
  return (
    <Box sx={styles.wrapper}>
      <SubcriptionSelector />
    </Box>
  );
};

export default Subscription;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '100%',
    width: '100%',
    paddingBottom: '2rem',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    marginTop: '15px',
    maxWidth: '350px',
    width: '100%',
    mx: 'auto',
    mb: '2rem',
  },
  next: {
    width: '100%',
    height: '30px',
    borderWidth: '1.5px',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      color: '#fff',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  back: {
    width: '60px',
    height: '30px',
    borderWidth: '1.5px',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
};

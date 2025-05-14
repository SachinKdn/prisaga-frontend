import theme from '@app/theme';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface Section {
  name: string;
  meta: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  steps: Section[];
  activeSectionIndex: number;
}

const ProgressTracker = (props: ProgressTrackerProps) => {
  const { steps, activeSectionIndex } = props;
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.tracker}>
        {steps.map((_, index) => (
          <Box sx={styles.step} key={index}>
            <Box
              sx={{
                ...styles.dot,
                backgroundColor: `${index <= activeSectionIndex ? '#358D9E' : '#8B8B8B'}`,
              }}
            >
              {index + 1}
            </Box>
            {index < steps.length - 1 && (
              <Box
                sx={{
                  ...styles.bar,
                  borderColor: `${index < activeSectionIndex - 1 ? '#358D9E' : '#8B8B8B'}`,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
      <Typography variant="h4" sx={styles.header}>
        {steps[activeSectionIndex].name}
      </Typography>
      <Typography variant="body2" sx={styles.subtitle}>
        {steps[activeSectionIndex].meta}
      </Typography>
    </Box>
  );
};

export default ProgressTracker;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    width: '100%',
  },
  tracker: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '35px',
    width: '100%',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
  },
  dot: {
    width: '25px',
    height: '25px',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  bar: {
    height: '2px',
    width: '132px',
    borderTop: '2px solid',
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: '48px',
    marginTop: '15px',
    color: theme.palette.primary.main,
  },
  subtitle: {
    fontSize: '0.88rem',
    fontWeight: 400,
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
  },
};

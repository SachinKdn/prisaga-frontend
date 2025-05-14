import { Box, Typography } from '@mui/material';
import React from 'react';
import theme from '@app/theme';
import JobDetails from './JobDetails';
import BackPage from './BackPage';
interface Props {
  data: IJob;
}

const Job = (props: Props) => {
  const { data } = props;
  console.log(data, 'data');
  return (
    <Box sx={styles.outerWrapper}>
      {/* TODO: Add job details content */}
      <Box sx={styles.header}>
        <BackPage />
        <Box sx={styles.adminSection}>
          <Typography sx={styles.text}>
            Account Manager: {data.createdBy.firstName}{' '}
            {data.createdBy.lastName} &nbsp; | &nbsp; Contact:{' '}
            {data.createdBy.phoneNumber} &nbsp; | &nbsp; Email:{' '}
            {data.createdBy.email}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.innerWrapper}>
        <JobDetails job={data} />
      </Box>
    </Box>
  );
};

export default Job;

const styles = {
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 150px)',
    overflowX: 'auto',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px 10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adminSection: {
    display: 'flex',
    gap: '10px',
    padding: '8px',
  },
  text: {
    fontSize: '0.88rem',
    fontWeight: '500',
    color: theme.palette.text.primary,
  },
};

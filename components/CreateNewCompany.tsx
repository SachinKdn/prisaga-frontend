import { Box } from '@mui/material';
import React from 'react';
import CompanyForm from './CompanyForm';
import BackPage from './BackPage';
const CreateNewCompany = () => {
  return (
    <Box sx={styles.wrapper}>
      <BackPage />
      <Box sx={styles.innerWrapper}>
        <CompanyForm />
      </Box>
    </Box>
  );
};

export default CreateNewCompany;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  innerWrapper: {
    maxWidth: '1140px',
    mx: 'auto',
  },
};

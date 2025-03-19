import { Box } from '@mui/material';
import React from 'react';
import { DetailsHeading } from './DetailsHeading';
import CompanyForm from './CompanyForm';

const CreateNewCompany = () => {
  return (
    <Box>
      <DetailsHeading title="Basic Information" />
      <CompanyForm />
    </Box>
  );
};

export default CreateNewCompany;

'use client';
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ProgressTracker from '../ProgressTracker';
import SelectCompanyForm from './SelectCompanyForm';
import theme from '@app/theme';
import JobDetailsForm from './JobDetailsForm';
import JobDescriptionForm from './JobDescriptionForm';
import Preview from './Preview';
import VendorCompensationForm from './VendorCompensationForm';
import QuestionnaireForm from './QuestionnaireForm';
import { createJob, updateJob } from '@api/client';
import handleSuccess from '@hooks/handleSuccess';
import { useRouter } from 'next/navigation';
const AddNewJob = (props: { data?: IJob }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<IJob> | null>(
    props.data || null
  );
  const [steps] = useState([
    {
      name: 'Select company details to your job',
      meta: 'You can select or create new company',
      completed: true,
    },
    {
      name: 'Fill in All Required Information for the Job',
      meta: 'The more information you give us the more better your recruiting experience will be',
      completed: false,
    },
    {
      name: 'Provide Detailed Job Information for Better Understanding',
      meta: 'Specify all your requirements',
      completed: false,
    },
    { name: 'Compensation', meta: '', completed: false },
    { name: 'Questionnaire', meta: '', completed: false },
    {
      name: 'Preview',
      meta: 'Please verify the details before move on',
      completed: false,
    },
  ]);
  const onSubmit = async () => {
    if (!formData) return;
    setIsLoading(true);
    if (props.data) {
      const result = await updateJob(formData, props.data._id || '');
      console.log(result);
      if (result) {
        handleSuccess('Job updated successfully');
        router.push(`/jobs/${formData.referenceId}`);
      }
    } else {
      const result = await createJob(formData);
      console.log(result);
      if (result) {
        handleSuccess('New job published successfully');
        router.push('/jobs');
      }
    }
    setIsLoading(false);
  };

  return (
    <Box sx={styles.wrapper}>
      <ProgressTracker steps={steps} activeSectionIndex={activeSectionIndex} />
      {activeSectionIndex === 0 && (
        <SelectCompanyForm
          setFormData={setFormData}
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 1 && (
        <JobDetailsForm
          setFormData={setFormData}
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 2 && (
        <JobDescriptionForm
          setFormData={setFormData}
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 3 && (
        <VendorCompensationForm
          setFormData={setFormData}
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 4 && (
        <QuestionnaireForm
          setFormData={setFormData}
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 5 && (
        <Preview
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 5 && (
        <Box sx={styles.buttonsWrapper}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={isLoading}
            onClick={onSubmit}
            sx={styles.next}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddNewJob;

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

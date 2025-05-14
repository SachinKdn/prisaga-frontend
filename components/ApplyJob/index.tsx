'use client';
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ProgressTracker from '../ProgressTracker';
import theme from '@app/theme';
import { applyForJob } from '@api/client';
import handleSuccess from '@hooks/handleSuccess';
import { useRouter } from 'next/navigation';
import AddCandidateForm from './AddCandidateForm';
import CandidateDetailsForm from './CandidateDetailsForm';
import ScreeningQnAForm from './ScreeningQnAForm';
import Preview from './Preview';
const ApplyJob = (props: { data: IJob }) => {
  const { data } = props;
  console.log(data);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<IApplicationForm> | null>(
    null
  );
  const [steps] = useState([
    { name: 'Add Candidate', meta: '', completed: true },
    {
      name: 'Upload Resume & Candidate Details',
      meta: 'Please double-check and enter the information accurately',
      completed: false,
    },
    {
      name: `Questionnaire for ${data.title} role`,
      meta: 'Please double-check and enter the information accurately',
      completed: false,
    },
    {
      name: `Proposing for ${data.title} `,
      meta: 'Please verify the details before move on',
      completed: false,
    },
  ]);
  const onSubmit = async () => {
    if (!formData) return;
    setIsLoading(true);
    if (formData.isFresher) {
      delete formData.currentSalary;
    }
    const result = await applyForJob(formData);
    console.log(result);
    if (result) {
      handleSuccess('Applied successfully');
      router.push('/jobs');
    }
    setIsLoading(false);
  };

  return (
    <Box sx={styles.wrapper}>
      <ProgressTracker steps={steps} activeSectionIndex={activeSectionIndex} />
      {activeSectionIndex === 0 && (
        <AddCandidateForm
          jobId={data._id}
          setFormData={setFormData}
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 1 && (
        <CandidateDetailsForm
          setFormData={setFormData}
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 2 && (
        <ScreeningQnAForm
          jobData={data}
          setFormData={setFormData}
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 3 && (
        <Preview
          formData={formData}
          setActiveSectionIndex={setActiveSectionIndex}
        />
      )}
      {activeSectionIndex === 3 && (
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

export default ApplyJob;

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

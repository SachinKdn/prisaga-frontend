'use client';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import theme from '@app/theme';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { getResumes } from '@api/client';
import ResumeCard from './ResumeCard';
import ResumeCardSkeleton from './Skeletons/ResumeCardSkeleton';

const Resume = () => {
  const router = useRouter();

  const [resumes, setResumes] = useState<UploadedResume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const result = await getResumes();
      if (result) setResumes(result);
      setIsLoading(false);
    };
    console.log('fetch the resumes');
    fetch();
  }, []);
  return (
    <Box sx={styles.outerWrapper}>
      <Header title={`Total resumes (${resumes.length})`}>
        <Button
          sx={styles.btn}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/resume/new')}
        >
          Add Resume
        </Button>
      </Header>

      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <Box sx={styles.list}>
          {resumes.map((resume, index) => (
            <ResumeCard data={resume} key={index} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Resume;

const SkeletonLoading = () => {
  return (
    <Box sx={styles.list}>
      {new Array(3).fill(null).map((_, index) => (
        <ResumeCardSkeleton key={index} />
      ))}
    </Box>
  );
};

const styles = {
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    minHeight: 'calc(100vh - 150px)',
    overflowX: 'auto',
  },
  btn: {
    margin: '0 8px',
    width: '158px',
    height: '28px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    lineHeight: '14.52px',
    textTransform: 'capitalize',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px 10px',
  },

  submit: {
    width: '100%',
    height: '35px',
    borderWidth: '1.5px',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '19.95px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      color: '#fff',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  closeBtn: {
    width: '100%',
    height: '35px',
    borderWidth: '1.5px',
    borderColor: '#FD0015',
    color: '#FD0015',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '19.95px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      borderColor: '#FD0015',
    },
  },
};

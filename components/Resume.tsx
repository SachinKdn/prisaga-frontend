'use client';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import theme from '@app/theme';
import { useRouter } from 'next/navigation';
import { getResumes } from '@api/client';
import ResumeCard from './ResumeCard';
import ResumeCardSkeleton from './Skeletons/ResumeCardSkeleton';
import useDebounce from '@hooks/useDebounce';
import { areaOfExpertises, experienceLevels } from '@constant/resume-data';
import SingleSelect from './common/SingleSelect';
import NoDataFound from './common/noData';

const Resume = () => {
  const router = useRouter();

  const [resumes, setResumes] = useState<UploadedResume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [experience, setExperience] = useState<string>('');
  const [areaOfExpertise, setAreaOfExpertise] = useState<string>('');
  const searchValue = useDebounce(searchInput, 500);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchValue) params.append('search', searchValue);
      if (experience) params.append('experience', experience);
      if (areaOfExpertise) params.append('areaOfExpertise', areaOfExpertise);

      const result = await getResumes(params.toString());
      if (result) setResumes(result.data);
      setIsLoading(false);
    };
    console.log('fetch the resumes--searchValue>', searchValue);
    fetch();
  }, [searchValue, experience, areaOfExpertise]);
  const addNewButton = () => {
    router.push('/resume/new');
  };
  return (
    <Box sx={styles.outerWrapper}>
      <Header
        title={`Total resumes (${resumes.length})`}
        showAddButton={true}
        btnTitle="Add Resume"
        handleClick={addNewButton}
        handleOnChange={handleOnChange}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SingleSelect
            value={experience}
            setValue={setExperience}
            items={experienceLevels}
            placeholder="Select Experience"
          />
          <SingleSelect
            value={areaOfExpertise}
            setValue={setAreaOfExpertise}
            items={areaOfExpertises}
            placeholder="Select area of expertise"
          />
        </Box>
      </Header>

      {isLoading ? (
        <SkeletonLoading />
      ) : resumes.length === 0 ? (
        <NoDataFound />
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

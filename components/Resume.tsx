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
import SearchInput from './common/SearchInput';
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

  return (
    <Box sx={styles.outerWrapper}>
      <Header title={`Total resumes (${resumes.length})`}>
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
          <SearchInput onChange={handleOnChange} sx={styles.searchBar} />
        </Box>
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
  searchBar: {
    height: '28px !important',
    '& .MuiOutlinedInput-root': {
      fontSize: '0.75rem !important',
      height: '100%',
      color: '#757897',
      fontWeight: 500,
      paddingLeft: '5px',
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

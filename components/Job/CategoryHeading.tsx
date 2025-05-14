import { Box, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import theme from '@app/theme';
import { RootState } from '@store';
import { useSelector } from 'react-redux';
import SearchInput from '@components/common/SearchInput';
import { SlidersHorizontal } from 'lucide-react';
import { areaOfExpertises } from '@constant/resume-data';
import SingleSelect from '@components/common/SingleSelect';

interface Props {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  handleExperienceChange: (experience: string) => void;
  handleAreaOfExpertiseChange: (areaOfExpertise: string) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
}

const CategoryHeading = (props: Props) => {
  const {
    activeCategory,
    setActiveCategory,
    handleOnChange,
    searchInput,
    handleExperienceChange,
    handleAreaOfExpertiseChange,
  } = props;
  const user = useSelector((state: RootState) => state.auth.user);
  const [isShowFilter, setIsShowFilter] = useState(false);

  const [experience, setExperience] = useState<string>('');
  const [areaOfExpertise, setAreaOfExpertise] = useState<string>('');
  const handleAreaOfExpertise = (areaOfExpertise: string) => {
    setAreaOfExpertise(areaOfExpertise);
    handleAreaOfExpertiseChange(areaOfExpertise);
  };
  const handleExperience = (experience: string) => {
    setExperience(experience);
    handleExperienceChange(experience);
  };
  const categoriesWithCount = useMemo(() => {
    if (!user) return [];

    return [
      {
        heading: 'All Jobs',
      },
      {
        heading: 'Allocated Jobs',
        count: user.agency?.allocatedJobIds.length || 0,
      },
      {
        heading: 'Unallocated Jobs',
      },
      {
        heading: 'Deallocated Jobs',
        count: user.agency?.deallocatedJobIds.length || 0,
      },
      {
        heading: 'Engaged Jobs',
        count: user.agency?.engagedJobIds.length || 0,
      },
    ];
  }, [user]);
  const experienceLevelsWithCount = useMemo(() => {
    return Array.from({ length: 13 }, (_, i) => ({
      label: `${i}+ year${i !== 1 ? 's' : ''}`,
      value: i.toString(),
    }));
  }, []);
  return (
    <Box sx={styles.outerWrapper}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.categoryWrapper}>
          {categoriesWithCount.map((category, index) => (
            <Box
              key={index}
              sx={{
                ...styles.category,
                borderBottom:
                  activeCategory === category.heading
                    ? `2px solid ${theme.palette.primary.main}`
                    : 'none',
                color:
                  activeCategory === category.heading
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
              }}
              onClick={() => setActiveCategory(category.heading)}
            >
              <Typography variant="subtitle1" sx={styles.categoryText}>
                {category.heading}{' '}
                {typeof category.count === 'number'
                  ? `(${category.count})`
                  : null}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={styles.filterWrapper}>
          <SearchInput
            value={searchInput}
            onChange={handleOnChange}
            sx={styles.searchBar}
            placeholder="Search by Job, Job ID, Location, etc."
          />
          <Box
            sx={styles.filterIconWrapper}
            onClick={() => setIsShowFilter(!isShowFilter)}
          >
            <SlidersHorizontal size={18} strokeWidth={2.5} />
          </Box>
        </Box>
      </Box>
      {isShowFilter && (
        <Box sx={styles.filterWrapper}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <SingleSelect
              value={experience}
              setValue={handleExperience}
              items={experienceLevelsWithCount}
              placeholder="Select Experience"
            />
            <SingleSelect
              value={areaOfExpertise}
              setValue={handleAreaOfExpertise}
              items={areaOfExpertises}
              placeholder="Select area of expertise"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CategoryHeading;

const styles = {
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  categoryWrapper: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
  category: {
    cursor: 'pointer',
    p: 0.5,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  categoryText: {
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  filterWrapper: {
    display: 'flex',
    gap: 1.5,
    alignItems: 'center',
  },
  filterIconWrapper: {
    cursor: 'pointer',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
  searchBar: {
    height: '35px !important',
    width: '310px',
    '& .MuiOutlinedInput-root': {
      fontSize: '0.75rem !important',
      height: '100%',
      color: '#757897',
      fontWeight: 500,
      paddingLeft: '8px',
    },
  },
};

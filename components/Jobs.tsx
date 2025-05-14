'use client';
import { Box } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import useDebounce from '@hooks/useDebounce';
import theme from '@app/theme';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { UserRole } from '@constant/enum';
import { useRouter } from 'next/navigation';
import NoDataFound from './common/noData';
import JobCard from './JobCard';
import CategoryHeading from './Job/CategoryHeading';
import { getAllocatedJobs, getEngagedJobs, getJobsList } from '@api/client';
import JobCardSkeleton from './Skeletons/JobCardSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
interface Props {
  data: ITableResponse<IJob[]>;
}

const Jobs = (props: Props) => {
  const { data } = props;
  const [jobs, setJobs] = useState<IJob[]>(data.data);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Jobs');
  const [searchInput, setSearchInput] = useState('');
  const [experience, setExperience] = useState<string>('');
  const [areaOfExpertise, setAreaOfExpertise] = useState<string>('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const searchValue = useDebounce(searchInput, 800);
  console.log(searchValue);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
  };
  const fetchJobsByCategory = async (
    category: string,
    searchValue: string = '',
    experience: string = '',
    areaOfExpertise: string = '',
    page: number = 1
  ) => {
    let res: ITableResponse<IJob[]> | undefined;
    switch (category) {
      case 'Allocated Jobs':
        res = await getAllocatedJobs(
          `search=${searchValue}&experienceFrom=${experience}&areaOfExpertise=${areaOfExpertise}&page=${page}`
        );
        break;
      case 'Engaged Jobs':
        res = await getEngagedJobs(
          `search=${searchValue}&experienceFrom=${experience}&areaOfExpertise=${areaOfExpertise}&page=${page}`
        );
        break;
      case 'All Jobs':
      default:
        res = await getJobsList(
          `search=${searchValue}&experienceFrom=${experience}&areaOfExpertise=${areaOfExpertise}&page=${page}`
        );
        break;
    }
    if (page === 1) setJobs(res?.data || []);
    else setJobs((prev) => [...prev, ...(res?.data || [])]);
    setIsLoading(false);
    if (res) {
      console.log(res?.totalCount, page * 5, 'count');
      setHasMore(res?.totalCount > page * 5);
    } else setHasMore(false);
  };
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  const handleExperienceChange = (experience: string) => {
    setExperience(experience);
  };
  const handleAreaOfExpertiseChange = (areaOfExpertise: string) => {
    setAreaOfExpertise(areaOfExpertise);
  };

  const isShowAddUserButton = useMemo(() => {
    if (!user) return false;
    const isSuperAdmin = user.role === UserRole.SUPERADMIN;
    const isAdmin = user.role === UserRole.ADMIN;
    return isSuperAdmin || isAdmin;
  }, [user]);

  const isShowCategoryHeading = useMemo(() => {
    if (!user) return false;
    return user.role === UserRole.VENDOR;
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    fetchJobsByCategory(
      activeCategory,
      searchValue,
      experience,
      areaOfExpertise
    );
    setPage(1);
  }, [searchValue, activeCategory, experience, areaOfExpertise]);

  return (
    <Box sx={styles.outerWrapper} id="jobListContainer">
      <Box sx={styles.headerWrapper}>
        {isShowAddUserButton && (
          <Header
            title={`Total jobs (${data.totalCount || 0})`}
            showAddButton={isShowAddUserButton}
            btnTitle="New Job"
            handleClick={() => router.push('/jobs/new')}
            handleOnChange={handleOnChange}
          />
        )}
        {isShowCategoryHeading && (
          <CategoryHeading
            searchInput={searchInput}
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
            handleOnChange={handleOnChange}
            handleExperienceChange={handleExperienceChange}
            handleAreaOfExpertiseChange={handleAreaOfExpertiseChange}
          />
        )}
      </Box>
      {isLoading ? (
        <SkeletonLoading />
      ) : jobs.length === 0 ? (
        <NoDataFound />
      ) : (
        <InfiniteScroll
          dataLength={jobs.length}
          next={() => {
            console.log('count', page);
            setPage((prev) => prev + 1);
            fetchJobsByCategory(
              activeCategory,
              searchValue,
              experience,
              areaOfExpertise,
              page + 1
            );
          }}
          hasMore={hasMore}
          style={{ overflow: 'hidden', width: '100%' }}
          loader={
            <Box sx={styles.loader}>
              {new Array(3).fill(null).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </Box>
          }
          scrollableTarget="jobListContainer"
          scrollThreshold={0.8}
          // endMessage={<p style={{ textAlign: 'center' }}>No more jobs to show.</p>}
        >
          <Box sx={styles.list}>
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </Box>
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default Jobs;

const SkeletonLoading = () => {
  return (
    <Box sx={styles.list}>
      {new Array(3).fill(null).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </Box>
  );
};

const styles = {
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    height: 'calc(100vh - 60px)',
    // minHeight: 'calc(100vh - 150px)',
    overflowX: 'auto',
    position: 'relative',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    position: 'sticky',
    top: '0',
    zIndex: '100',
    backgroundColor: '#fafafa',
    width: '100%',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px 10px',
    paddingBottom: '20px',
  },
  btn: {
    margin: '0 8px',
    width: '138px',
    height: '36px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    lineHeight: '14.52px',
    textTransform: 'capitalize',
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
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
  loader: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    alignItems: 'center',
    px: '10px',
  },
};

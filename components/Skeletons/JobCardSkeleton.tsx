import theme from '@app/theme';
import './index.css';
import { Box, Typography } from '@mui/material';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  Briefcase,
  Calendar,
  BookOpen,
  IndianRupee,
  MapPin,
} from 'lucide-react';

const JobCardSkeleton = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.innerWrapper}>
        <Box sx={styles.row}>
          <Box sx={styles.companyLogo}>
            <Skeleton width={40} height={40} />
          </Box>
          <Box sx={styles.jobHeader}>
            <Box sx={styles.jobTitleWrapper}>
              <Skeleton
                width={120}
                height={12}
                containerClassName="line-height-0"
              />
              <Skeleton
                width={180}
                height={15}
                containerClassName="line-height-0"
              />
            </Box>
          </Box>
        </Box>

        <Box sx={styles.jobDetailsWrapper}>
          <Box sx={styles.infoItem}>
            <MapPin color={theme.palette.primary.main} size={16} />
            <Skeleton width={100} height={16} />
          </Box>
          <Box sx={styles.infoItem}>
            <Briefcase color={theme.palette.primary.main} size={16} />
            <Skeleton width={80} height={16} />
          </Box>
          <Box sx={{ ...styles.infoItem, justifyContent: 'center' }}>
            <BookOpen color={theme.palette.primary.main} size={16} />
            <Skeleton width={100} height={16} />
          </Box>
          <Box sx={{ ...styles.infoItem, justifyContent: 'end' }}>
            <IndianRupee color={theme.palette.primary.main} size={16} />
            <Skeleton width={120} height={16} />
          </Box>
          <Box sx={{ ...styles.infoItem, justifyContent: 'end' }}>
            <Calendar color={theme.palette.primary.main} size={16} />
            <Skeleton width={100} height={16} />
          </Box>
        </Box>

        <Box sx={styles.jobSkillsWrapper}>
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Skills</Typography>
            <Box sx={styles.skillTags}>
              <Skeleton borderRadius={40} width={80} height={18} />
              <Skeleton borderRadius={40} width={80} height={18} />
              <Skeleton borderRadius={40} width={80} height={18} />
            </Box>
          </Box>
          <Box sx={styles.section}>
            <Skeleton width={100} height={20} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobCardSkeleton;

const styles = {
  wrapper: {
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyLogo: {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    overflow: 'hidden',
    lineHeight: '0',
  },
  jobHeader: {
    flex: 1,
    display: 'flex',
    gap: '0.25rem',
    justifyContent: 'space-between',
  },
  jobTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.35rem',
  },
  jobReferenceWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.25rem',
  },
  jobDetailsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '1rem',
    width: '100%',
  },
  jobSkillsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: theme.palette.text.primary,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
  },
  editIcons: {
    display: 'flex',
    gap: '0.15rem',
  },
};

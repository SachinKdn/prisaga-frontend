import { Box, Typography } from '@node_modules/@mui/material';
import Image from 'next/image';
import React, { useMemo } from 'react';
import DefaultCompanyLogo from '@assets/png/default-company-logo.png';
import theme from '@app/theme';
import {
  Briefcase,
  Calendar,
  ChevronRight,
  BookOpen,
  IndianRupee,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import Tooltip from './Job/Tooltip';
import EditIconWithTooltip from './EditIconWithTooltip';
import { useSelector } from '@node_modules/react-redux/dist/react-redux';
import { RootState } from '@store';
import { UserRole } from '@constant/enum';
import MicroChip from './MicroChip';
interface Props {
  job: IJob;
}

const JobCard = (props: Props) => {
  const { job } = props;
  const user = useSelector((state: RootState) => state.auth.user);
  const isAllocated = useMemo(() => {
    return user?.agency?.allocatedJobIds.includes(job._id);
  }, [user, job]);

  const isDeallocated = useMemo(() => {
    return user?.agency?.deallocatedJobIds.includes(job._id);
  }, [user, job]);

  const isEngaged = useMemo(() => {
    return user?.agency?.engagedJobIds.includes(job._id);
  }, [user, job]);
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.innerWrapper}>
        <Box sx={styles.row}>
          <Box sx={styles.companyLogo}>
            <Image
              src={DefaultCompanyLogo}
              alt="company"
              objectFit="contain"
              layout="fill"
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box sx={styles.jobHeader}>
            <Box sx={styles.jobTitleWrapper}>
              <Typography sx={styles.jobCompany}>{job.company.name}</Typography>
              <Box sx={styles.infoItem}>
                <Typography sx={styles.jobTitle}>{job.title}</Typography>
                <Box sx={styles.editIcons}>
                  <Tooltip referenceId={job.referenceId} />
                  {(user?.role === UserRole.ADMIN ||
                    user?.role === UserRole.SUPERADMIN) && (
                    <EditIconWithTooltip
                      path={`/jobs/${job.referenceId}/edit`}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={styles.jobReferenceWrapper}>
              {/* {!isAllocated && !isDeallocated && !isEngaged && <MicroChip label='Allocated' textColor={theme.palette.text.secondary} bgColor={theme.palette.primary.light}/>} */}
              {isAllocated && !isDeallocated && !isEngaged && (
                <MicroChip
                  label="Allocated"
                  textColor="#299764"
                  bgColor="#E9F4EF"
                />
              )}
              {isEngaged && (
                <MicroChip
                  label="Engaged"
                  textColor={theme.palette.primary.main}
                  bgColor="#ebf7f9"
                />
              )}
              {/* <MicroChip label={job.referenceId} textColor={theme.palette.text.secondary} bgColor={theme.palette.primary.light}/> */}
              {/* <Typography sx={styles.jobReference}>
              Reference ID: {job.referenceId}
            </Typography> */}
            </Box>
          </Box>
        </Box>
        {/* <Divider sx={styles.divider} /> */}
        <Box sx={styles.jobDetailsWrapper}>
          <Box sx={styles.infoItem}>
            <MapPin color={theme.palette.primary.main} size={16} />
            <Typography sx={styles.text}>
              {job.location.city}, {job.location.state}
            </Typography>
          </Box>
          <Box sx={styles.infoItem}>
            <Briefcase color={theme.palette.primary.main} size={16} />
            <Typography sx={styles.text}>{job.jobType}</Typography>
          </Box>
          <Box sx={{ ...styles.infoItem, justifyContent: 'center' }}>
            <BookOpen color={theme.palette.primary.main} size={16} />
            <Typography sx={styles.text}>
              {job.experienceFrom} - {job.experienceTo} Yr.
            </Typography>
          </Box>
          <Box sx={{ ...styles.infoItem, justifyContent: 'flex-end' }}>
            <IndianRupee color={theme.palette.primary.main} size={16} />
            <Typography sx={styles.text}>
              {job.salaryFrom.toLocaleString()} -{' '}
              {job.salaryTo.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ ...styles.infoItem, justifyContent: 'flex-end' }}>
            <Calendar color={theme.palette.primary.main} size={16} />
            <Typography sx={styles.text}>
              {job.createdAt
                ? new Date(job.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : ''}
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.jobSkillsWrapper}>
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Skills</Typography>
            <Box sx={styles.skillTags}>
              {job.skills?.map((skill, index) => (
                <Box key={index} sx={styles.tag}>
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={styles.section}>
            <Link
              href={`/jobs/${job.referenceId}`}
              target="_blank"
              style={styles.link}
            >
              View Details{' '}
              <ChevronRight
                strokeWidth={2.5}
                color={theme.palette.primary.main}
                size={16}
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobCard;

const styles = {
  wrapper: {
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '8px',
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
    position: 'relative',
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
  },
  jobTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: theme.palette.text.primary,
    lineHeight: '1.2',
  },
  jobCompany: {
    fontSize: '0.7rem',
    fontWeight: '500',
    color: theme.palette.text.secondary,
  },
  jobReferenceWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.25rem',
    cursor: 'pointer',
  },
  copyIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
  },
  jobReference: {
    fontSize: '0.75rem',
    fontWeight: '400',
    color: theme.palette.text.secondary,
  },
  divider: {
    margin: '0.5rem 0',
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
  text: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: theme.palette.text.primary,
  },
  sectionContent: {
    fontSize: '0.75rem',
    fontWeight: '400',
    color: theme.palette.text.secondary,
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
  tag: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '0.68rem',
    display: 'inline-block',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '0.68rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
    marginBottom: '5px',
  },
  editIcons: {
    display: 'flex',
    gap: '0.15rem',
  },
};

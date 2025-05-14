'use client';
import React, { useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DefaultCompanyLogo from '@assets/png/default-company-logo.png';
import Image from 'next/image';
import theme from '@app/theme';
import {
  Briefcase,
  Calendar,
  IndianRupee,
  MapPin,
  BookOpen,
  Target,
  Plus,
  ArrowUpRight,
  CloudUpload,
} from 'lucide-react';
import Tooltip from './Job/Tooltip';
import QnA from './Job/QnA';
import VendorSection from './Job/VendorSection';
import { useRouter } from 'next/navigation';
import EditIconWithTooltip from './EditIconWithTooltip';
import { JobStatus, SubscriptionType, UserRole } from '@constant/enum';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import { toggleJobCategory } from '@api/client';
import handleSuccess from '@hooks/handleSuccess';
import { toggleJobCategoryInStore } from '@store/slices/user';
import MicroChip from './MicroChip';
import useCustomEventEmitter from '@hooks/useCustomEventEmmiter';
import { subscriptionPopupData } from '@constant/subscriptionPopupData';
interface Props {
  job: IJob;
}

const JobDetails = (props: Props) => {
  const { job } = props;
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const setPopupData = useCustomEventEmitter('subscription_popup');

  const isAllocated = useMemo(() => {
    return user?.agency?.allocatedJobIds.includes(job._id);
  }, [user, job]);

  const isDeallocated = useMemo(() => {
    return user?.agency?.deallocatedJobIds.includes(job._id);
  }, [user, job]);

  const isEngaged = useMemo(() => {
    return user?.agency?.engagedJobIds.includes(job._id);
  }, [user, job]);

  const handleAllocate = async (category: string) => {
    if (user?.agency?.subscriptionType === SubscriptionType.FREE) {
      const key = `resumes_basic`;
      setPopupData({
        isOpen: true,
        data: subscriptionPopupData[key],
      });
      return;
    }
    const res = await toggleJobCategory(job._id, category);
    if (res) {
      handleSuccess('Job allocated successfully');
      dispatch(
        toggleJobCategoryInStore({ jobId: job._id, category: category })
      );
    }
  };
  const handleUploadResume = () => {
    router.push(`/jobs/${job.referenceId}/apply`);
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.editSection}>
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
                {job.status === JobStatus.ACTIVE && (
                  <MicroChip
                    label={job.status}
                    textColor="#299764"
                    bgColor="#E9F4EF"
                  />
                )}
                {job.status === JobStatus.ON_HOLD && (
                  <MicroChip
                    label={job.status}
                    textColor="#FF0000"
                    bgColor="#FFE9E9"
                  />
                )}
                {job.status === JobStatus.CLOSED && (
                  <MicroChip
                    label={job.status}
                    textColor="#FF0000"
                    bgColor="#FFE9E9"
                  />
                )}
              </Box>
              <Typography sx={styles.jobCompany}>{job.company.name}</Typography>
            </Box>
            <Box sx={styles.jobApplyButton}>
              {!isAllocated && !isDeallocated && !isEngaged && (
                <Button
                  variant="outlined"
                  sx={styles.applyButton}
                  onClick={() => handleAllocate('Allocated')}
                  startIcon={<Plus size={16} strokeWidth={2.5} />}
                >
                  Allocate
                </Button>
              )}
              {isAllocated && !isDeallocated && !isEngaged && (
                <Button
                  variant="outlined"
                  sx={styles.applyButton}
                  onClick={() => handleAllocate('Engaged')}
                  startIcon={<ArrowUpRight size={16} strokeWidth={2.5} />}
                >
                  Engage & Upload Resume
                </Button>
              )}
              {isEngaged && (
                <Button
                  variant="outlined"
                  sx={styles.applyButton}
                  onClick={handleUploadResume}
                  startIcon={<CloudUpload size={16} strokeWidth={2.5} />}
                >
                  Upload Resume
                </Button>
              )}
              {user?.role === UserRole.USER && (
                <Button variant="outlined" sx={styles.applyButton}>
                  Apply Now
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={styles.jobDetailsWrapper}>
          <Box sx={styles.jobSpecs}>
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
            <Box sx={styles.infoItem}>
              <IndianRupee color={theme.palette.primary.main} size={16} />
              <Typography sx={styles.text}>
                {job.salaryFrom.toLocaleString()} -{' '}
                {job.salaryTo.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={styles.infoItem}>
              <BookOpen color={theme.palette.primary.main} size={16} />
              <Typography sx={styles.text}>
                {job.experienceFrom} - {job.experienceTo} Yr.2
              </Typography>
            </Box>
            <Box sx={styles.infoItem}>
              <Target color={theme.palette.primary.main} size={16} />
              <Typography sx={styles.text}>
                {job.noOfOpenings > 1
                  ? `${job.noOfOpenings} Openings`
                  : `${job.noOfOpenings} Openings`}
              </Typography>
              {job.noOfOpenings && job.areaOfExpertise && (
                <Typography sx={styles.text}>•</Typography>
              )}
              <Typography sx={styles.text}>{job.areaOfExpertise}</Typography>
            </Box>
            <Box sx={styles.infoItem}>
              <Calendar color={theme.palette.primary.main} size={16} />
              <Typography sx={styles.text}>
                {job.createdAt
                  ? `Posted on ${new Date(job.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : ''}
              </Typography>
            </Box>
          </Box>
          <VendorSection
            vendorData={job.vendorData}
            subscriptionType={user?.agency?.subscriptionType}
          />
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Required Skills</Typography>
            <Box sx={styles.skillTags}>
              {job.skills?.map((skill, index) => (
                <Box key={index} sx={styles.tag}>
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>
              Required Qualification
            </Typography>
            <Typography sx={styles.text}>{job.minQualification}</Typography>
          </Box>
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Job Description</Typography>
            <Typography sx={styles.text}>{job.description}</Typography>
          </Box>
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>Job Insights</Typography>
            {job.jobInsights &&
              job.jobInsights.map((insight, index) => (
                <Box key={index} sx={styles.jobInsight}>
                  <Typography sx={styles.text}>•</Typography>
                  <Typography sx={styles.jobInsightText}>{insight}</Typography>
                </Box>
              ))}
          </Box>
        </Box>

        <QnA questionnaire={job.questionnaire} />
      </Box>
    </Box>
  );
};

export default JobDetails;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  editSection: {
    py: 3,
    px: 3,
    width: '100%',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyLogo: {
    width: '50px',
    height: '50px',
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
    fontSize: '1.1rem',
    fontWeight: '600',
    color: theme.palette.text.primary,
    lineHeight: '1.2',
  },
  jobCompany: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: theme.palette.text.secondary,
  },
  jobDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    justifyContent: 'space-between',
    my: 1,
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  text: {
    fontSize: '0.85rem',
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
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
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
    fontSize: '0.78rem',
    display: 'inline-block',
  },
  sectionTitle: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: theme.palette.text.primary,
  },
  jobSpecs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem',
  },
  jobApplyButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  applyButton: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: 'white',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    borderRadius: 'px',
    minWidth: '180px',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  jobInsight: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  jobInsightText: {
    fontSize: '0.85rem',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    fontWeight: '500',
  },
  editIcon: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  editIcons: {
    display: 'flex',
    gap: '0.15rem',
  },
};

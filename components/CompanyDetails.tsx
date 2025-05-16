import { Box, Typography } from '@mui/material';
import React from 'react';
import theme from '@app/theme';
import Image from 'next/image';
import BackPage from './BackPage';
import DefaultCompanyLogo from '@assets/png/default-company-logo.png';
import Tooltip from './Job/Tooltip';
import { Briefcase, Calendar, MapPin, BookOpen, Target } from 'lucide-react';

interface Props {
  data: Company;
}

const CompanyDetails = (props: Props) => {
  const { data } = props;
  console.log(data, 'data');
  return (
    <Box sx={styles.outerWrapper}>
      <Box sx={styles.header}>
        <BackPage />
      </Box>
      <Box sx={styles.innerWrapper}>
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
                  <Typography sx={styles.jobTitle}>{data.name}</Typography>
                  <Box sx={styles.editIcons}>
                    <Tooltip referenceId={data._id || ''} />
                    {/* {(user?.role === UserRole.ADMIN ||
                    user?.role === UserRole.SUPERADMIN) && (
                    <EditIconWithTooltip
                      path={`/jobs/${job.referenceId}/edit`}
                    />
                  )} */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={styles.jobDetailsWrapper}>
            <Box sx={styles.jobSpecs}>
              <Box sx={styles.infoItem}>
                <MapPin color={theme.palette.primary.main} size={16} />
                <Typography sx={styles.text}>
                  {data.location.city}, {data.location.state}
                </Typography>
              </Box>
              <Box sx={styles.infoItem}>
                <Briefcase color={theme.palette.primary.main} size={16} />
                <Typography sx={styles.text}>
                  {data.linkedin || '--'}
                </Typography>
              </Box>
              <Box sx={styles.infoItem}>
                <BookOpen color={theme.palette.primary.main} size={16} />
                <Typography sx={styles.text}>
                  {data.website_url || '--'}
                </Typography>
              </Box>
              <Box sx={styles.infoItem}>
                <Target color={theme.palette.primary.main} size={16} />
                <Typography sx={styles.text}>
                  {data.teamSize > 1
                    ? `${data.teamSize} Memeber`
                    : `${data.teamSize} Memebers`}
                </Typography>
              </Box>
              <Box sx={styles.infoItem}>
                <Calendar color={theme.palette.primary.main} size={16} />
                <Typography sx={styles.text}>
                  {data.createdAt
                    ? `Posted on ${new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                    : ''}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyDetails;

const styles = {
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 150px)',
    overflowX: 'auto',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px 10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  jobSpecs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem',
  },
  editIcons: {
    display: 'flex',
    gap: '0.15rem',
  },
};

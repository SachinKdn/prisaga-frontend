import theme from '@app/theme';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ResumeCardSkeleton = () => {
  return (
    <Box sx={style.wrapper}>
      <Box sx={style.innerWrapper}>
        <Box sx={style.row}>
          <Box sx={style.nameSection}>
            <Skeleton width={180} height={20} />
          </Box>
          <Box sx={style.contactSection}>
            <Box sx={style.contactItem}>
              <EmailIcon sx={style.icon} />
              <Skeleton width={120} height={16} />
            </Box>
            <Box sx={style.contactItem}>
              <PhoneIcon sx={style.icon} />
              <Skeleton width={110} height={20} />
            </Box>
          </Box>
        </Box>

        <Divider sx={style.divider} />

        <Box sx={style.row}>
          <Box sx={style.infoItem}>
            <LocationOnIcon sx={style.icon} />
            <Skeleton width={90} height={20} />
          </Box>
          <Box sx={style.infoItem}>
            <WorkIcon sx={style.icon} />
            <Skeleton width={100} height={20} />
          </Box>
        </Box>

        <Divider sx={style.divider} />

        <Box sx={style.skillsRow}>
          <Box sx={style.skillSection}>
            <Box sx={style.skillHeader}>
              <BuildIcon sx={style.icon} />
              <Typography sx={style.subHeading}>Expertise</Typography>
            </Box>
            <Box sx={style.skillTags}>
              <Skeleton borderRadius={40} width={110} height={16} />
              <Skeleton borderRadius={40} width={110} height={16} />
              <Skeleton borderRadius={40} width={110} height={16} />
            </Box>
          </Box>

          <Box sx={style.skillSection}>
            <Box sx={style.skillHeader}>
              <BusinessCenterIcon sx={style.icon} />
              <Typography sx={style.subHeading}>Summary</Typography>
            </Box>
            <Skeleton count={1} />
          </Box>
        </Box>

        {/* Download Button */}
        <Box sx={style.downloadSection}>
          <Skeleton width={160} height={27} />
        </Box>
      </Box>
    </Box>
  );
};

export default ResumeCardSkeleton;

const style = {
  wrapper: {
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    width: '100%',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '4px 8px',
  },
  nameSection: {
    display: 'flex',
    alignItems: 'center',
  },
  contactSection: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  skillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    padding: '4px 8px',
  },
  skillSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: '1 1 200px',
  },
  skillHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
  heading: {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  subHeading: {
    fontSize: '0.88rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  text: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '1rem',
  },
  divider: {
    margin: '2px 0',
  },
  downloadSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
  downloadBtn: {
    borderRadius: '4px',
    textTransform: 'none',
    color: 'white',
    height: '28px',
    fontSize: '0.68rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
  },
};

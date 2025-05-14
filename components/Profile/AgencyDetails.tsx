'use client';
import { Box, Typography, Chip } from '@mui/material';
import SectionHeader from './SectionHeader';
import theme from '@app/theme';
import { useRouter } from 'next/navigation';
import UploadAgencyLogo from './UploadAgencyLogo';
import { experienceLevels } from '@constant/resume-data';

const AgencyDetails = ({
  agency,
  isEditable = true,
}: {
  agency: Agency;
  isEditable?: boolean;
}) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push('/profile/edit-agency');
  };

  return (
    <Box sx={styles.editSection}>
      <SectionHeader
        title="Agency Information"
        handleEdit={handleEdit}
        isEditable={isEditable}
      />
      <Box sx={styles.detailWrapper}>
        <UploadAgencyLogo
          readOnly
          defaultSrc={agency.logo}
          agencyId={agency._id!}
        />
        <Box sx={styles.detailInnerWrapper}>
          <Box sx={styles.detail}>
            <Typography variant="body2" sx={styles.detailHeading}>
              Agency Name
            </Typography>
            <Typography variant="body2" sx={styles.detailSubHeading}>
              {agency?.agencyName}
            </Typography>
          </Box>
          <Box sx={styles.detail}>
            <Typography variant="body2" sx={styles.detailHeading}>
              Phone Number
            </Typography>
            <Typography variant="body2" sx={styles.detailSubHeading}>
              {agency?.phoneNumber}
            </Typography>
          </Box>
          <Box sx={styles.detail}>
            <Typography variant="body2" sx={styles.detailHeading}>
              Website URL
            </Typography>
            <Typography variant="body2" sx={styles.detailSubHeading}>
              {agency?.website_url}
            </Typography>
          </Box>
          <Box sx={styles.detail}>
            <Typography variant="body2" sx={styles.detailHeading}>
              LinkedIn URL
            </Typography>
            <Typography variant="body2" sx={styles.detailSubHeading}>
              {agency?.linkedin}
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Team Size
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {agency?.teamSize}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Bulk Hiring
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {agency?.isBulkHiring ? 'Yes' : 'No'}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Active Users
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {agency?.activeUsers || 0}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Total Requests
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {agency?.totalRequest || 0}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Spent Requests
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {agency?.spentRequest || 0}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Charge to Candidate
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {agency?.isChargeToCandidate ? 'Yes' : 'No'}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Description
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {agency?.description || 'No description provided'}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Location
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {`${agency?.location?.area ? agency?.location?.area + ',' : ''} ${agency?.location?.city || ''}, ${agency?.location?.state || ''}, ${agency?.location?.postalCode || ''}`}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Areas of Expertise
          </Typography>
          <Box sx={styles.chipContainer}>
            {agency?.areaOfExpertise?.map((expertise, index) => (
              <Chip key={index} label={expertise} sx={styles.chip} />
            ))}
          </Box>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Target Job Levels
          </Typography>
          <Box sx={styles.chipContainer}>
            {agency?.targetJobLevel?.map((level, index) => (
              <Chip
                key={index}
                label={
                  experienceLevels.find((item) => item.value === level)?.label
                }
                sx={styles.chip}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AgencyDetails;

const styles = {
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
  detailWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 2,
    padding: 2,
  },
  detailInnerWrapper: {
    display: 'grid',
    gridColumn: 'span 2',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 2,
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailHeading: {
    fontWeight: 500,
    fontSize: '0.88rem',
    color: theme.palette.primary.contrastText,
  },
  detailSubHeading: {
    fontWeight: 500,
    fontSize: '0.88rem',
    color: theme.palette.primary.dark,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  chip: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    fontSize: '0.75rem',
    height: '24px',
  },
};

'use client';
import { Box, Typography } from '@mui/material';
import SectionHeader from './SectionHeader';
import theme from '@app/theme';
import UpdateProfileModal from './UpdateProfileModal';
import { useState } from 'react';

const PersonalDetails = ({
  user,
  title,
  isEditable = true,
}: {
  user: User;
  title: string;
  isEditable?: boolean;
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const handleEdit = () => {
    setIsOpenEditModal(true);
  };
  const handleClose = () => {
    setIsOpenEditModal(false);
  };
  return (
    <Box sx={styles.editSection}>
      <SectionHeader
        title={title}
        handleEdit={handleEdit}
        isEditable={isEditable}
      />
      <Box sx={styles.detailWrapper}>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            First Name
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {user?.firstName}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Last Name
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {user?.lastName}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Username
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {user?.username}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Email
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {user?.email}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Mobile Number
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {user?.phoneNumber}
          </Typography>
        </Box>
        <Box sx={styles.detail}>
          <Typography variant="body2" sx={styles.detailHeading}>
            Role
          </Typography>
          <Typography variant="body2" sx={styles.detailSubHeading}>
            {user?.role}
          </Typography>
        </Box>
      </Box>
      {isOpenEditModal && (
        <UpdateProfileModal
          open={isOpenEditModal}
          onClose={handleClose}
          initialData={user!}
        />
      )}
    </Box>
  );
};
export default PersonalDetails;
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
};

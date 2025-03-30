'use client';
import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from './UploadImage';
import { AppDispatch, RootState } from '@store';
// import { ChartColumn, Ellipsis, UserRound } from 'lucide-react';
// import { CountCard } from './VendorDetails';
// import SubmittedIcon from '@assets/svg/submitted-icon.svg';
// import SuccessIcon from '@assets/svg/success-icon.svg';
// import RejectedIcon from '@assets/svg/rejected-icon.svg';
// import ProfileIcon from '@assets/svg/profile-icon.svg';
import DiamondIcon from '@assets/svg/diamond-icon.svg';
import theme from '@app/theme';
import SectionHeader from './Profile/SectionHeader';
import { UserRole } from '@constant/enum';
import { setUserInStore } from '@store/slices/user';
import UpdateProfileModal from './Profile/UpdateProfileModal';

interface Props {
  data: User;
}
const Profile = (props: Props) => {
  const { data } = props;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  useEffect(() => {
    dispatch(setUserInStore(data));
  }, [data]);
  const handleEdit = () => {
    setIsOpenEditModal(true);
  };
  const handleClose = () => {
    setIsOpenEditModal(false);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '8px',
      }}
    >
      <Box sx={styles.section}>
        <UploadImage defaultSrc={user?.image} />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 1,
            }}
          >
            <Typography variant="body2" sx={styles.username}>
              {user?.firstName || 'NA'} {user?.lastName ?? ''}
            </Typography>
            <Typography variant="body2" sx={styles.text}>
              {user?.role ? user?.role : '--'}
            </Typography>
            <Typography variant="body2" sx={styles.text}>
              {user?.email ? user?.email : '--'}
            </Typography>
          </Box>
        </Box>
        {user?.role === UserRole.VENDOR && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              height: 'min-content',
            }}
          >
            <DiamondIcon />
            <Box sx={styles.detail}>
              <Typography variant="body2" sx={styles.detailHeading}>
                Subscription Type
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  ...styles.detailSubHeading,
                  fontWeight: 700,
                  color: theme.palette.primary.dark,
                }}
              >
                Upgrade Now
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={styles.editSection}>
        <SectionHeader title="Personal Information" handleEdit={handleEdit} />
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
      </Box>
      {isOpenEditModal && (
        <UpdateProfileModal
          open={isOpenEditModal}
          onClose={handleClose}
          initialData={user!}
        />
      )}
      {/* <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, mt: 4 }}>
        <ChartColumn size={18} />
        <Typography variant="body2" sx={{ color: '#5B617A', fontWeight: 500 }}>
          Applications Statistics
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, paddingLeft: 6 }}>
        <CountCard
          title="Requested"
          count={10}
          icon={SubmittedIcon}
          iconClass={{ width: '25px', height: '25px', color: '#0338CD' }}
          className={{ color: '#0338CD' }}
        />
        <CountCard
          title="Pending"
          count={2}
          icon={Ellipsis}
          iconClass={{ width: '25px', height: '25px' }}
          className={{ color: '#5B617A' }}
        />
        <CountCard
          title="Approved"
          count={6}
          icon={SuccessIcon}
          iconClass={{ width: '25px', height: '25px' }}
          className={{ color: '#1E4F56' }}
        />
        <CountCard
          title="Rejected"
          count={2}
          icon={RejectedIcon}
          iconClass={{ width: '25px', height: '20px' }}
          className={{ color: '#CB0000' }}
        />
      </Box> */}
    </Box>
  );
};

export default Profile;

const styles = {
  username: {
    fontWeight: 500,
    fontSize: '0.95rem',
    color: theme.palette.primary.main,
  },
  text: {
    fontWeight: 500,
    fontSize: '0.75rem',
    color: theme.palette.primary.dark,
  },
  section: {
    py: 3,
    px: 3,
    width: '100%',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
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
    fontSize: '0.75rem',
    color: theme.palette.primary.contrastText,
  },
  detailSubHeading: {
    fontWeight: 500,
    fontSize: '0.75rem',
    color: theme.palette.primary.dark,
  },
};

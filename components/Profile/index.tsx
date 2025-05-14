import { Box, Typography } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from './UploadImage';
import { AppDispatch, RootState } from '@store';
import theme from '@app/theme';
import { UserRole } from '@constant/enum';
import { setUserInStore } from '@store/slices/user';
import PersonalDetails from './PersonalDetails';
import AgencyDetails from './AgencyDetails';
import SubscriptionDetails from '../Subscription/SubscriptionDetail';

interface Props {
  data: User;
}
const Profile = (props: Props) => {
  const { data } = props;
  const dispatch = useDispatch<AppDispatch>();
  dispatch(setUserInStore(data));
  const user = useSelector((state: RootState) => state.auth.user);

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
          <SubscriptionDetails
            subscriptionType={user.agency?.subscriptionType}
          />
        )}
      </Box>

      {user && <PersonalDetails user={user} title="Personal Information" />}
      {user?.agency && user.role === UserRole.VENDOR && (
        <AgencyDetails
          agency={user.agency}
          isEditable={user._id === user.agency.createdBy._id}
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

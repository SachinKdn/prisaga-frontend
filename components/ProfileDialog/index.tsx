import React from 'react';
import { Box, Dialog, DialogContent, SxProps } from '@mui/material';
import Card from './Card';
import ProfileIcon from '@assets/svg/profile-icon.svg';
import KeyIcon from '@assets/svg/key-01.svg';
import SettingIcon from '@assets/svg/settings-02.svg';
import TrendIcon from '@assets/svg/bar-chart-07.svg';
import UploadIcon from '@assets/svg/upload-01.svg';
import NotificationIcon from '@assets/svg/bell-01.svg';
import BuildingIcon from '@assets/svg/building.svg';
import { useSelector } from 'react-redux';
import { UserRole } from '@/constant/enum';
import { RootState } from '@/store';
import theme from '@/app/theme';
interface Props {
  open: boolean;
  onClose: () => void;
}
interface ICard {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  to: string;
  access: string[];
}
export const cards: ICard[] = [
  {
    icon: ProfileIcon,
    name: 'Profile',
    to: '/profile',
    access: [
      UserRole.USER,
      UserRole.SUPERADMIN,
      UserRole.ADMIN,
      UserRole.VENDOR,
    ],
  },
  {
    icon: KeyIcon,
    name: 'Change Password',
    to: '/password',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.ADMIN, UserRole.VENDOR],
  },
  {
    icon: SettingIcon,
    name: 'Settings',
    to: '/settings',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.ADMIN, UserRole.VENDOR],
  },
  {
    icon: BuildingIcon,
    name: 'Our Organisation',
    to: '/company',
    access: [UserRole.ADMIN, UserRole.SUPERADMIN],
  },
  {
    icon: TrendIcon,
    name: 'Job Trends',
    to: '/trends',
    access: [UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.VENDOR],
  },
  {
    icon: UploadIcon,
    name: 'Upload Excel',
    to: '/upload',
    access: [UserRole.ADMIN],
  },
  {
    icon: NotificationIcon,
    name: 'Customer Support',
    to: '/notifications',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.ADMIN],
  },
];
const ProfileDialog: React.FC<Props> = ({ open, onClose }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={styles.outerWrapper as SxProps}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '15px 12px 15px 12px',
          position: 'absolute',
          top: '44px',
          right: 0,
        },
      }}
      BackdropProps={{
        style: { backgroundColor: 'transparent' },
      }}
    >
      <DialogContent
        sx={{
          padding: '0',
        }}
      >
        <Box sx={styles.innerWrapper}>
          {cards.map((card, index) => {
            if (user && user.role && card.access.includes(user.role)) {
              return (
                <Card
                  key={index}
                  icon={card.icon}
                  name={card.name}
                  href={card.to}
                  onClick={onClose}
                />
              );
            }
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;

const styles = {
  outerWrapper: {
    '& .MuiPaper-root': {
      backgroundColor: '#fff',
      boxShadow: '10px 10px 30px 0px #0000001F',
    },
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '10px',
    overflowY: 'auto',
    maxHeight: '80vh',
    minWidth: '224px',
    [theme.breakpoints.down('md')]: {
      minWidth: '165px',
    },
  },
};

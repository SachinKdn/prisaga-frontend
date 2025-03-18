import React, { useState } from 'react';
import { Drawer, useMediaQuery, Box, ListItemIcon, Typography, Button } from '@mui/material';
import theme from '@/app/theme';
import sizeConfigs from '@/configs/sizeConfigs';
import Image from 'next/image';
import logoImg from '@assets/png/hiring-icon.png';
import Logo from '@assets/svg/prisaga-svg-logo.svg'
import { ReactNode } from 'react';
import { routes } from './routes';
import SidebarItem from './SidebarItem';
import CloseBar from '@assets/svg/close-bar.svg';
import OpenBar from '@assets/svg/open-bar.svg';
import colorConfigs from '@/configs/colorConfigs';
import LogoutIcon from '@assets/svg/logout.svg';
import { usePathname } from 'next/navigation';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/user';
import CustomDialog from '../common/CustomDialog';
type Props = {
  open: boolean;
  toggleDrawer: () => void;
};
interface Routes {
  icon: ReactNode;
  text: string;
  to: string;
}
const Sidebar = (props: Props) => {
  const { toggleDrawer, open } = props;
  const dispatch = useDispatch<AppDispatch>();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const sidebarWidth = open ? sizeConfigs.sidebar.width : sizeConfigs.sidebar.closedWidth;
  const pathname = usePathname();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleClose = () => {
    setOpenDeleteDialog(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout());
    // navigate('/login', { replace: true })
    setOpenDeleteDialog(false);
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        position: 'relative',
        '& .MuiDrawer-paper': {
          // width: sidebarWidth,
          // width: "0",
          width: `${!isMd ? sidebarWidth : open ? '250px' : '0px'}`,
          position: `${!isMd ? '' : open ? 'fixed' : 'hidden'}`,
          height: '100vh',
          boxSizing: 'border-box',
          borderRight: '2px',
          borderColor: '#4E307A1A',
          borderRadius: '0px 30px 0px 0px',
          backgroundColor: colorConfigs.sidebar.bg,
          boxShadow: '0px 2px 10px 4px rgba(0, 0, 0, 0.06)',
          color: colorConfigs.sidebar.color,
          overflow: 'visible',
        },
      }}
    >
      <Box sx={styles.routeList}>
        <Box sx={styles.logoWrapper}>
          {open && <Logo style={styles.logo} />}
        </Box>

        <Box
          sx={{
            ...styles.innerWrapper,
          }}
        >
          {routes.map((route, index) => (
            <SidebarItem item={route} key={index} toggleDrawer={toggleDrawer} />
          ))}
          <Box sx={styles.wrapper} onClick={() => setOpenDeleteDialog(true)}>
            <Box
              sx={{
                color:
                  pathname === '/login'
                    ? colorConfigs.sidebar.activeBg
                    : colorConfigs.sidebar.color,
                minWidth: '40px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '2px'
              }}
            >
              <LogoutIcon />
            </Box>
            <Typography
              variant="body1"
              sx={{
                color:
                  pathname === '/login'
                    ? colorConfigs.sidebar.activeBg
                    : colorConfigs.sidebar.color,
              fontSize: '0.88rem',

              }}
            >
              Logout
            </Typography>
          </Box>
        </Box>
      </Box>
      {openDeleteDialog && (
        <CustomDialog
          open={openDeleteDialog}
          onClose={handleClose}
          title="Do you want to logout?"
          isCrossIcon={false}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              marginTop: '15px',
            }}
          >
            <Button onClick={handleClose} color="secondary" variant="outlined" sx={styles.closeBtn}>
              No
            </Button>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={styles.submit}
              onClick={handleLogout}
            >
              Yes
            </Button>
          </Box>
        </CustomDialog>
      )}
      <Box
        sx={{
          ...styles.barOpener,
          ...(isMd ? (open ? {} : { display: 'none' }) : {}),
        }}
        onClick={toggleDrawer}
      >
        {open ? <CloseBar /> : <OpenBar />}
      </Box>
    </Drawer>
  );
};

export default Sidebar;

const styles = {
  routeList: {
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  logoWrapper:{
    height: "80px",
    width: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    height: 'unset',
    borderRadius: '0',
    maxWidth: '168px',
    margin: 'auto'
  },
  barOpener: {
    position: 'absolute',
    bottom: '50%',
    // left: "94%",
    right: '-15px',
    borderRadius: '50%',
    border: '2px solid #4E307A1A',
    width: '24px',
    height: '24px',
    padding: '1px',
    backgroundColor: '#ffffff',
    '& :hover': {
      cursor: 'pointer',
    },
  },
  wrapper: {
    '&:hover': {
      backgroundColor: colorConfigs.sidebar.hoverBg,
    },
    paddingY: '9px',
    paddingX: '24px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '42px'
  },
  submit: {
    width: '100%',
    height: '35px',
    borderWidth: '1.5px',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '19.95px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
    ':hover': {
      backgroundColor: '#43afb0',
      boxShadow: 'none',
    },
    '&:disabled': {
      color: '#fff',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  closeBtn: {
    width: '100%',
    height: '35px',
    borderWidth: '1.5px',
    borderColor: '#FD0015',
    color: '#FD0015',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '19.95px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    ':hover': {
      borderColor: '#FD0015',
    },
  },
};

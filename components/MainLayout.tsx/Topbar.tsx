import React, { useRef } from 'react';
import {
  Box,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import colorConfigs from '@/configs/colorConfigs';
import theme from '@/app/theme';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Logo from '@assets/svg/prisaga-svg-logo.svg';
import ProfileImage from '@assets/png/profile-pic.png';
import { useState } from 'react';
import { cards } from '../ProfileDialog';
import { RootState } from '@store';
import { useSelector } from 'react-redux';
import Card from '@components/ProfileDialog/Card';
import { useOnClickOutside } from '@hooks/useOnClickOutside';

type Props = {
  sidebarWidth: string;
  open: boolean;
  toggleDrawer: () => void;
};
const Topbar = (props: Props) => {
  const { toggleDrawer, sidebarWidth } = props;
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const handleProfileDialog = () => {
    setOpen(!open);
  };
  return (
    <AppBar
      position="fixed"
      style={{ width: `calc(100% - ${!isMd ? sidebarWidth : '0px'})` }}
      sx={styles.root}
    >
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.headingBox}>
          {isMd && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={styles.iconBox}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4" sx={styles.secondHeading}>
            Dashboard
          </Typography>
        </Box>
        <Box sx={styles.box}>
          {/* <Image src={LogoImage} alt="logo" style={styles.logoImg} /> */}
          <Logo />
          <Image
            src={ProfileImage}
            alt="profileImg"
            style={styles.profileImg}
            onClick={handleProfileDialog}
          />

          {open && <ProfilePopup open={open} onClose={handleProfileDialog} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
const styles = {
  root: {
    height: '80px',
    width: '100%',
    boxShadow: 'unset',
    backgroundColor: colorConfigs.topbar.bg,
    color: colorConfigs.topbar.color,
  },
  toolbar: {
    height: '44px',
    minHeight: '44px !important',
    margin: 'auto 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    mr: 1,
    [theme.breakpoints.down('sm')]: {
      mr: 0,
    },
  },
  headingBox: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      minWidth: '150px',
    },
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    height: '100%',
    gap: 2,
    [theme.breakpoints.down('sm')]: {
      gap: 1,
    },
  },
  logoImg: {
    height: '44px',
    width: 'auto',
    borderRadius: '0',
    cursor: 'pointer',

    // [theme.breakpoints.down("md")]: {
    //   height: "40px",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   height: "37px",
    // },
  },
  profileImg: {
    height: '35px',
    width: '35px',
    borderRadius: '100%',
    cursor: 'pointer',

    // [theme.breakpoints.down("md")]: {
    //   height: "40px",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   height: "37px",
    // },
  },
  heading: {
    fontSize: '22px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  secondHeading: {
    fontSize: '1.1rem',
    fontWeight: 500,
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.85rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.68rem',
    },
  },
  popUpWrapper: {
    borderRadius: '12px',
    padding: '15px 12px 15px 12px',
    position: 'absolute',
    top: '44px',
    right: '24px',
    backgroundColor: '#fff',
    boxShadow: '10px 10px 30px 0px #0000001F',
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

interface ProfilePopupProps {
  open: boolean;
  onClose: () => void;
}
const ProfilePopup: React.FC<ProfilePopupProps> = ({ onClose }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  // Change the ref type to HTMLElement
  const dropdownRef = useRef<HTMLElement | null>(null);

  // Assuming useOnClickOutside works with HTMLElement type
  useOnClickOutside(dropdownRef, () => onClose());

  return (
    <Box ref={dropdownRef} sx={styles.popUpWrapper}>
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
    </Box>
  );
};

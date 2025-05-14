import React, { useMemo, useRef } from 'react';
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
import ProfileImage from '@assets/png/profile-pic-square.png';
import { useState } from 'react';
import { cards } from '../ProfileDialog';
import { RootState } from '@store';
import { useSelector } from 'react-redux';
import Card from '@components/ProfileDialog/Card';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DiamondIcon from '@assets/svg/diamond-icon.svg';
import { SubscriptionType, UserRole } from '@constant/enum';

type Props = {
  sidebarWidth: string;
  open: boolean;
  toggleDrawer: () => void;
};
const Topbar = (props: Props) => {
  const { toggleDrawer, sidebarWidth } = props;
  const user = useSelector((state: RootState) => state.auth.user);
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const handleProfileDialog = () => {
    setOpen(!open);
  };
  const pathname = usePathname();
  const pageHeading: Record<string, string> = {
    '': 'Dashboard',
    resume: 'Resume Warehouse',
    profile: 'My Profile',
    jobs: 'Job Section',
    users: 'Users',
  };

  const title = useMemo(() => {
    const route = pathname.split('/')[1];
    return pageHeading[route];
  }, [pathname]);
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
            {title}
          </Typography>
        </Box>
        <Box sx={styles.box}>
          {/* <Image src={LogoImage} alt="logo" style={styles.logoImg} /> */}
          {user?.role === UserRole.VENDOR &&
            user?.agency?.subscriptionType === SubscriptionType.FREE && (
              <Link href={'/subscription'} style={styles.subscriptionBox}>
                <DiamondIcon width="20px" height="18px" />
                Upgrade Now
              </Link>
            )}
          <Logo />
          <Box sx={styles.profileImg}>
            <Image
              src={user?.image || ProfileImage}
              alt="profileImg"
              layout="fill"
              // style={styles.profileImg}
              onClick={handleProfileDialog}
            />
          </Box>

          {open && <ProfilePopup open={open} onClose={handleProfileDialog} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
const styles = {
  root: {
    height: '60px',
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
    position: 'relative',
    border: '2px solid #358D9E',
    borderRadius: '50%',
    cursor: 'pointer',
    overflow: 'hidden',
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
    fontSize: '1.2rem',
    fontWeight: 600,
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: theme.palette.primary.main,
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.85rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.68rem',
    },
  },
  popUpWrapper: {
    borderRadius: '4px',
    padding: '6px 0px 6px 0px',
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
    overflowY: 'auto',
    maxHeight: '80vh',
    minWidth: '224px',
    [theme.breakpoints.down('md')]: {
      minWidth: '165px',
    },
  },
  subscriptionBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '40px',
    border: '2px solid #358D9E',
    padding: '4px 6px',
    fontFamily: 'Poppins',
    color: theme.palette.primary.main,
    fontSize: '0.78rem',
    fontWeight: '600',
    gap: '0.35rem',
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

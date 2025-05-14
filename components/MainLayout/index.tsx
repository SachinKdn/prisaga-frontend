'use client';

import React, { useState } from 'react';
import { Box, useMediaQuery, Toolbar } from '@mui/material';
import { usePathname } from 'next/navigation';

import sizeConfigs from '@/configs/sizeConfigs';
import theme from '@/app/theme';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { publicRoutes } from './routes';
import AuthLayout from '@components/AuthLayout';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMd);

  const sidebarWidth = open
    ? sizeConfigs.sidebar.width
    : sizeConfigs.sidebar.closedWidth;

  const toggleDrawer = () => setOpen(!open);

  // Handle public routes
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/createPassword') ||
    pathname.startsWith('/agency-signup')
  ) {
    return <AuthLayout>{children}</AuthLayout>;
  }

  return (
    <Box sx={styles.root}>
      <Topbar
        sidebarWidth={sidebarWidth}
        open={open}
        toggleDrawer={toggleDrawer}
      />

      <Box
        component="nav"
        sx={{
          width: `${!isMd ? sidebarWidth : '0'}`,
          flexShrink: 0,
        }}
      >
        <Sidebar toggleDrawer={toggleDrawer} open={open} />
      </Box>

      <Box
        component="main"
        sx={{
          ...styles.main,
          width: `calc(100% - ${!isMd ? sidebarWidth : '0px'})`,
        }}
      >
        <Toolbar sx={styles.toolbar} />
        <Box sx={styles.childWrapper}>
          <Box sx={styles.contentWrapper}>{children}</Box>
          {/* <Box sx={styles.sidebarWrapper}>
          <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7308316305089011712?collapsed=1" height="610" className="scrollbar-hide" seamless width="100%" style={{border: 'none', overflow: 'hidden', maxHeight: '610px' }}
          frameBorder="0"
            allowFullScreen  title="Embedded post">
            </iframe>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    py: 0,
    px: 2,
    minHeight: '100vh',
    boxSizing: 'border-box',
    overflow: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  childWrapper: {
    minHeight: `calc(100vh - 60px)`,
    overflow: 'auto',
    //  display: 'grid', gridTemplateColumns: '9fr 3fr'
  },
  contentWrapper: { height: '100%' },
  sidebarWrapper: {
    padding: '1rem',
    height: 'fit-content',
    overflow: 'hidden',
  },
  toolbar: { minHeight: '60px !important' },
};

export default MainLayout;

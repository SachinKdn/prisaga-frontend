'use client';

import React, { useState } from 'react';
import { Box, useMediaQuery, Toolbar } from '@mui/material';
import { redirect, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

import sizeConfigs from '@/configs/sizeConfigs';
import theme from '@/app/theme';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { publicRoutes } from './routes';
import { RootState } from '@/store';

const MainLayout = ({ children } : { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  
  const sidebarWidth = open ? sizeConfigs.sidebar.width : sizeConfigs.sidebar.closedWidth;

  const toggleDrawer = () => setOpen(!open);

  // Handle public routes
  if (publicRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  // Handle authentication
  if (!user) return redirect('/login');

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
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${!isMd ? sidebarWidth : '0px'})`,
          minHeight: '100vh',
          boxSizing: 'border-box',
          overflow: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important' }} />
        {children}
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
};

export default MainLayout;
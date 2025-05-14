import React from 'react';
import { RouteType } from './routes';
import Link from 'next/link';
import colorConfigs from '@/configs/colorConfigs';
import { Box, useMediaQuery, Typography } from '@mui/material';
import theme from '@/app/theme';
import { usePathname } from 'next/navigation';
import ActiveBarIcon from '@assets/svg/activeBar.svg';
type Props = {
  item: RouteType;
  toggleDrawer: () => void;
};
const SidebarItem = ({ item, toggleDrawer }: Props) => {
  const pathname = usePathname();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const Icon = item.icon;
  const isActive =
    item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
  return (
    <Link href={item.to} onClick={isMd ? toggleDrawer : () => {}}>
      <Box
        sx={{
          ...styles.wrapper,
          bgcolor: isActive ? colorConfigs.sidebar.activeBg : 'transparent',
        }}
      >
        {isActive && (
          <ActiveBarIcon
            style={{ position: 'absolute', left: 0, height: '70%' }}
          />
        )}
        <Box
          sx={{
            color: isActive
              ? colorConfigs.sidebar.activeColor
              : colorConfigs.sidebar.color,
            minWidth: '40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Icon />
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: isActive
              ? colorConfigs.sidebar.activeColor
              : colorConfigs.sidebar.color,
            fontSize: '0.88rem',
          }}
        >
          {item.text}
        </Typography>
      </Box>
    </Link>
  );
};

export default SidebarItem;

const styles = {
  wrapper: {
    '&:hover': {
      backgroundColor: colorConfigs.sidebar.hoverBg,
    },
    paddingY: '9px',
    paddingX: '24px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '42px',
  },
};

import DashboardOutlinedIcon from '@assets/svg/dashboard.svg';
import UsersIcon from '@assets/svg/users.svg';
import SummaryIcon from '@assets/svg/summary.svg';
import GridIcon from '@assets/svg/grid.svg';
import DensityIcon from '@assets/svg/map.svg';
import DataIcon from '@assets/svg/data-menu.svg';
import CardIcon from '@assets/svg/card-board.svg';
import SignalIcon from '@assets/svg/signal-icon.svg';
import LogoutIcon from '@assets/svg/logout.svg';
import { ReactNode } from 'react';
import { UserRole } from '@/constant/enum';

export interface RouteType {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  to: string;
  access: UserRole[];
}

export const routes: RouteType[] = [
  {
    icon: DashboardOutlinedIcon,
    text: 'Dashboard',
    to: '/dashboard',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.ADMIN],
  },
  {
    icon: UsersIcon,
    text: 'Users',
    to: '/users',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.ADMIN],
  },
  {
    icon: DataIcon,
    text: 'Vendors',
    to: '/vendor',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.ADMIN],
  },
  {
    icon: CardIcon,
    text: 'Jobs',
    to: '/jobs',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.ADMIN],
  },
  {
    icon: SummaryIcon,
    text: 'Resume Warehouse',
    to: '/resume',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN],
  },
];


export const publicRoutes = ['/login', '/signup', '/reset-password'];
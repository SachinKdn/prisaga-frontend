import DashboardOutlinedIcon from '@assets/svg/dashboard.svg';
import UsersIcon from '@assets/svg/users.svg';
import SummaryIcon from '@assets/svg/summary.svg';
import DataIcon from '@assets/svg/data-menu.svg';
import InfoIcon from '@assets/svg/info.svg';

import CardIcon from '@assets/svg/card-board.svg';
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
    access: [UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN],
  },
  {
    icon: DashboardOutlinedIcon,
    text: 'Home',
    to: '/',
    access: [UserRole.USER, UserRole.VENDOR],
  },
  {
    icon: UsersIcon,
    text: 'Users',
    to: '/users',
    access: [UserRole.VENDOR, UserRole.ADMIN, UserRole.SUPERADMIN],
  },
  {
    icon: DataIcon,
    text: 'Vendors',
    to: '/vendor',
    access: [UserRole.SUPERADMIN, UserRole.ADMIN],
  },
  {
    icon: CardIcon,
    text: 'Jobs',
    to: '/jobs',
    access: [UserRole.VENDOR, UserRole.ADMIN, UserRole.SUPERADMIN],
  },
  {
    icon: SummaryIcon,
    text: 'Resume Warehouse',
    to: '/resume',
    access: [UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN],
  },
  {
    icon: InfoIcon,
    text: 'Contact Us',
    to: '/support',
    access: [UserRole.VENDOR],
  },
];

export const publicRoutes = [
  '/login',
  '/agency-signup',
  '/createPassword',
  '/reset-password',
  '/unauthorized',
  '/support',
];

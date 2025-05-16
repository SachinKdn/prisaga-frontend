import { SubscriptionType, UserRole } from '@constant/enum';
import routes from './routes.json';
const freeVendorRoutes = [
  '/profile',
  '/unauthorized',
  '/',
  '/subscription',
  '/support',
  '/profile/edit-agency',
];
export const isRouteHasPermission = (
  role: UserRole,
  subscriptionType: SubscriptionType,
  path: string
): boolean => {
  // console.log('path---', path);
  if (
    role === UserRole.VENDOR &&
    subscriptionType === SubscriptionType.FREE &&
    !freeVendorRoutes.includes(path)
  )
    return false;
  return true;
};

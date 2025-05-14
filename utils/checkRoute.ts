import { UserRole } from '@constant/enum';
import routes from './routes.json';

export const isRouteAllowed = (role: UserRole, path: string): boolean => {
  // console.log('path---', path);
  // console.log('routes some---', routes[role]?.some((route: string) => path.startsWith(route) && route !== '/'));
  return (
    routes['All']?.includes(path) ||
    (routes[role]?.includes(path) ?? false) ||
    (routes[role]?.some(
      (route: string) => path.startsWith(route) && route !== '/'
    ) ??
      false)
  );
};

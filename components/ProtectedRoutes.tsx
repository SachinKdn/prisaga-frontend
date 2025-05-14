'use client';
import { useCallback, useEffect } from 'react';
import { publicRoutes } from './MainLayout/routes';
import { AppDispatch, RootState } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, usePathname, useRouter } from 'next/navigation';
import useLogout from '@hooks/useLogout';
import { getProfile } from '@api/server';
import { setIsAuthenticated, setUserInStore } from '@store/slices/user';
import { isRouteAllowed } from '@utils/checkRoute';
import { isRouteHasPermission } from '@utils/checkPermission';
import useCustomEventEmitter from '@hooks/useCustomEventEmmiter';
import { subscriptionPopupData } from '@constant/subscriptionPopupData';

interface ProtectedRoutesProps {
  children: React.ReactNode;
}
export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const setPopupData = useCustomEventEmitter('subscription_popup');
  const handleLogout = useLogout();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute = useCallback(
    () =>
      publicRoutes.includes(pathname) ||
      pathname.startsWith('/createPassword') ||
      pathname.startsWith('/agency-signup'),
    [pathname]
  );
  const isAllowed = useCallback(
    () => isRouteAllowed(user?.role, pathname),
    [pathname, user]
  );
  const hasPermission = useCallback(
    () =>
      isRouteHasPermission(
        user?.role,
        user?.agency?.subscriptionType,
        pathname
      ),
    [pathname, user]
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      console.log(result);
      if (!result) {
        dispatch(setIsAuthenticated(false));
        handleLogout();
        return;
      }
      dispatch(setUserInStore(result));
      dispatch(setIsAuthenticated(true));
    };
    if (isAuthenticated) fetchProfile();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute()) {
      console.log('goint to login');
      router.push('/login');
    }
  }, [isAuthenticated, isPublicRoute, router]);

  // Render nothing while redirecting
  if (!isAuthenticated && !isPublicRoute()) {
    return null;
  }

  // console.log("Checked Route - ", isAllowed())
  // console.log("isPublicRoute - ", isPublicRoute())
  if (!isPublicRoute() && !isAllowed()) {
    return redirect(`/unauthorized?type=${user?.role}`);
  }
  if (!isPublicRoute() && !hasPermission()) {
    setPopupData({
      isOpen: true,
      data: subscriptionPopupData['resumes_basic'],
    });
    router.push('/');
    return;
  }
  return <>{children}</>;
}

// const style = {
//   loaderWrapper: {
//     width: '100%',
//     height: '100vh',
//     display: 'grid',
//     placeItems: 'center',
//   },
// };

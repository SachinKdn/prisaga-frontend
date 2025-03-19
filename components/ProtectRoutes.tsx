'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

// API & Store
import { getProfile } from '@/api/user';
import { AppDispatch, RootState } from '@/store';
import { setUserInStore } from '@/store/slices/user';

// Routes configuration
import { publicRoutes } from './MainLayout.tsx/routes';
import { Box } from '@mui/material';
import useLogout from '@services/useLogout';

// Types
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = useLogout();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const token = localStorage.getItem('token');
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

  const isPublicRoute = publicRoutes.includes(pathname);
  console.log('user-->', user);
  // Early return for public routes with a user already in the store

  useEffect(() => {
    console.log('first');
    const fetchProfile = async () => {
      // Skip authentication check for public routes
      if (isPublicRoute) {
        setAuthStatus('unauthenticated');
        return;
      }

      try {
        const result = await getProfile();
        console.log(result);
        if (!result.success) {
          setAuthStatus('unauthenticated');
          handleLogout();
          return;
        }

        if (result.data) {
          dispatch(setUserInStore(result.data));
          setAuthStatus('authenticated');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setAuthStatus('unauthenticated');
        router.push('/login');
      }
    };
    if (!token && !isPublicRoute) {
      router.push('/login');
      setAuthStatus('unauthenticated');
      return;
    }
    fetchProfile();
  }, []);

  if (user && isPublicRoute) {
    return <>{children}</>;
  }
  // Show loader while checking authentication "w-full h-[96vh] flex items-center justify-center"
  if (authStatus === 'loading') {
    return (
      <Box sx={style.loaderWrapper}>
        <Oval
          ariaLabel="loading"
          height={50}
          width={50}
          color="#000"
          secondaryColor="#ccc"
          strokeWidth={5}
        />
      </Box>
    );
  }

  // Allow access to auth pages (login/sign-up) when not authenticated
  // Or any page when authenticated
  if (
    (authStatus === 'unauthenticated' &&
      (pathname === '/login' || pathname === '/sign-up')) ||
    authStatus === 'authenticated' ||
    isPublicRoute
  ) {
    return <>{children}</>;
  }

  // This should not be reached normally, but added as a fallback
  return null;
}

const style = {
  loaderWrapper: {
    width: '100%',
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
  },
};

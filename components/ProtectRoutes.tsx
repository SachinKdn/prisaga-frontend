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
import useLogout from '@hooks/useLogout';

// Types
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = useLogout();
  const { user } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const token = localStorage.getItem('token');
  const [authStatus, setAuthStatus] = useState<AuthStatus>('authenticated');

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const fetchProfile = async () => {
      // Skip authentication check for public routes
      if (isPublicRoute) {
        setAuthStatus('unauthenticated');
        return;
      }

      try {
        console.log('going to fetch profile');
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
        handleLogout();
      }
    };
    if (!token && !isPublicRoute) {
      handleLogout();
      setAuthStatus('unauthenticated');
      return;
    }
    if (!user) {
      fetchProfile();
    } else {
      setAuthStatus('authenticated');
    }
  }, [user]);

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
    if (authStatus === 'unauthenticated' && !isPublicRoute) {
      router.push('/login');
    }
  }
  console.log('authStatus', authStatus);
  console.log('unexpected!!!!');
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

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { UserRole } from '@/constant/enum';
export function useAuth(requiredRole?: UserRole[]) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log("token-", token)
  //   console.log("isAuth-", isAuthenticated)
  //   console.log("loading-", loading)
  //   if (token && !isAuthenticated && !loading) {
  //     dispatch(loadUser());
  //   }
  // }, [dispatch, isAuthenticated, loading]);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Sending to login');
      router.push('/login');
    } else if (requiredRole && !requiredRole.includes(user?.role)) {
      console.log('requiredRole-->', requiredRole);
      console.log('user?.role-->', user?.role);
      router.push('/login');
    }
  }, [isAuthenticated, requiredRole, user]);

  return { user, isAuthenticated };
}

'use client';

import { persistor, store } from '@/store';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { getProfile } from '@/api/user';
import { loginSuccess } from '@/store/slices/user';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // const dispatch = useDispatch();
  const protectedRoutes = ['/login', '/signup'];
  const pathname = usePathname();

  // useEffect(()=>{
  //   const token = localStorage.getItem('token');
  //   console.log("I can Hit the getProfile Request here----->", token)
  //     if(!token && !protectedRoutes.includes(pathname)){
  //         redirect('/signup')
  //     }
  //     const fetchUser = async ()=>{
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_API_URL}user/me`,
  //             {
  //               method: 'GET',
  //               credentials: 'include',
  //               headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${token}`
  //               },
  //             }
  //           );
  //         const result: IResponse<User> = await response.json();
  //         if (!response.ok) {
  //           throw new Error(result.message);
  //         }
  //         console.log(result,"<----here is the getMyProfile result")
  //         // dispatch(loginSuccess(result.data));
  //       } catch (error) {
  //         localStorage.removeItem('token');
  //         console.log(error)
  //         redirect('/signup')
  //       }

  //     }
  //     fetchUser();
  // },[])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

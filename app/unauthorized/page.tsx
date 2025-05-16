'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import NotFoundImage from '@assets/png/notFoundImg.png';
import theme from '@app/theme';
import Link from 'next/link';
import { UserRole } from '@constant/enum';
import { permanentRedirect, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
import { logout } from '@store/slices/user';
import { clearToken } from '@api/tokenHandler';

const Unauth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const type = params.get('type');
  const path =
    type === UserRole.ADMIN || type === UserRole.SUPERADMIN
      ? '/dashboard'
      : '/';
  const handleLogout = async () => {
    console.log('logout');
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout());
    await clearToken();
    permanentRedirect('/login');
  };
  return (
    <Box sx={style.wrapper}>
      <Image
        src={NotFoundImage}
        alt="Page Not Found"
        width={400}
        height={300}
        style={style.imgWrapper}
      />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        You&apos;re not allowed
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        The page you are looking for does not allow you to access.
      </Typography>
      <Link href={path} style={style.link}>
        Go to Homepage
      </Link>
      <Typography
        variant="body1"
        sx={{
          mt: '1rem',
          color: 'red',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 500,
        }}
        onClick={handleLogout}
      >
        Logout
      </Typography>
    </Box>
  );
};
export default Unauth;
const style = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgWrapper: {
    marginBottom: '8vh',
    marginTop: '6vh',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

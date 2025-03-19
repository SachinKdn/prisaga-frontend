import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import NotFoundImage from '@assets/png/notFoundImg.png';
import theme from './theme';

export default function NotFound() {
  return (
    <Box sx={style.wrapper}>
      <Image
        src={NotFoundImage} // Ensure you have this image in your public folder
        alt="Page Not Found"
        width={400}
        height={300}
        style={style.imgWrapper}
      />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        The page you are looking for does not exist.
      </Typography>
      <Link href="/" style={style.link}>
        Go to Homepage
      </Link>
    </Box>
  );
}

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
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
};

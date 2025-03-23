import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import NotFoundImage from '@assets/png/notFoundImg.png';
import theme from '@app/theme';

const NoDataFound = () => {
  return (
    <Box sx={style.wrapper}>
      <Image
        src={NotFoundImage}
        alt="Data Not Found"
        width={400}
        height={300}
        style={style.imgWrapper}
      />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Data Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        Try another filters.
      </Typography>
    </Box>
  );
};

export default NoDataFound;

const style = {
  wrapper: {
    flex: 1,
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

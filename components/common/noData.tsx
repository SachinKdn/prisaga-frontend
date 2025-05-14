import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import NotFoundImage from '@assets/png/notFoundImg.png';
import theme from '@app/theme';

interface Props {
  title?: string;
  subTitle?: string;
}
const NoDataFound = (props: Props) => {
  const { title = 'Data Not Found', subTitle } = props;

  return (
    <Box sx={style.wrapper}>
      <Image
        src={NotFoundImage}
        alt="Data Not Found"
        width={400}
        height={300}
        style={style.imgWrapper}
      />
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={style.title}>
        {title}
      </Typography>
      {subTitle && (
        <Typography variant="body1" color="text.secondary" mb={2}>
          {subTitle}
        </Typography>
      )}
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
  title: {
    color: theme.palette.primary.dark,
    fontSize: '1.7rem',
    fontWeight: 600,
  },
  imgWrapper: {
    marginBottom: '8vh',
    marginTop: '5vh',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
};

import { Box, CircularProgress, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { createStyles } from '@mui/styles';

interface Props {
  height?: number;
}

const useStyle = (theme: Theme, height: number) =>
  createStyles({
    loaderWrapper: {
      width: '100%',
      height: height ? `${height}vh` : '65vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      background: 'transparent',
    },
    circularLoader: {
      width: '80px',
      height: '80px',
      color: theme.palette.secondary.main,
      '.MuiCircularProgress-root': {
        width: '80px',
        height: '80px',
      },
    },
  });

const Loader = (props: Props) => {
  const { height = 0 } = props;
  const theme = useTheme();
  const styles = useStyle(theme, height);
  return (
    <Box sx={styles.loaderWrapper}>
      <CircularProgress size={60} sx={styles.circularLoader} />
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default Loader;

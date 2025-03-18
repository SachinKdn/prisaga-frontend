import { Box, Theme, Typography, useTheme } from '@mui/material';
import { createStyles } from '@mui/styles';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children?: ReactNode;
}

const useStyle = (theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100% !important',
      flexWrap: 'wrap',
      gap: '20px',
      // [theme.breakpoints.down(700)]: {
      //   flexDirection: "column",
      //   gap: "20px",
      //   alignItems: "start",
      // },
    },
    title: {
      fontFamily: theme.typography.fontFamily,
      fontSize: '0.88rem',
      fontWeight: '600',
      color: '#040404',
      lineHeight: '23.81px',
      minWidth: 'fit-content',
      flex: 1,
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
        lineHeight: 'normal',
      },
    },
    childWrapper: {
      display: 'flex',
      justifyContent: 'end',
      // flex: 1,
      alignSelf: 'end',
      alignItems: 'center',
      [theme.breakpoints.down(700)]: {
        alignSelf: 'flex-start',
      },
      [theme.breakpoints.down(400)]: {
        // flexDirection: "column",
        // width: "100%",
        gap: '5px',
        alignItems: 'flex-end',
      },
    },
  });

const Header = (props: Props) => {
  const theme = useTheme();
  const { title, children } = props;
  const styles = useStyle(theme);
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.title}>{title}</Typography>
      <Box sx={styles.childWrapper}>{children}</Box>
    </Box>
  );
};

export default Header;

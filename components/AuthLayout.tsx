import { Box } from '@mui/material';
import Logo from '@assets/svg/prisaga-svg-logo.svg';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.header}>
        <Logo />
        {/* <Image
              src={LogoImage}
              alt="Company Logo"
              width={200}
              // height={100}
              style={styles.logo}
            /> */}
      </Box>
      <Box sx={styles.formWrapper}>{children}</Box>
    </Box>
  );
};
export default AuthLayout;

const styles = {
  wrapper: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  formWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    display: 'flex',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingTop: '15px',
    paddingLeft: '15px',
  },
  logo: {
    // width: 'auto',
    marginLeft: 8,
    marginTop: 4,
  },
};

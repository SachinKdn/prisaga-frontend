import AgencySignupForm from '@components/AgencySignupForm';
import { Box } from '@mui/material';

export default function Page() {
  return (
    <Box sx={styles.wrapper}>
      <AgencySignupForm />
    </Box>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

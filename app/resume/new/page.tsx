import CreateResumeForm from '@components/CreateResumeForm';
import { Box } from '@mui/material';

export default function Page() {
  return (
    <Box sx={styles.wrapper}>
      <CreateResumeForm />
    </Box>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
};

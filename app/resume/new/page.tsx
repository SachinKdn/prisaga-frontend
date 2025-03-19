import CreateResumeForm from '@components/CreateResumeForm';
import { Box } from '@mui/material';

export default function Page() {
  return (
    <Box sx={style.wrapper}>
      <CreateResumeForm />
    </Box>
  );
}

const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
};

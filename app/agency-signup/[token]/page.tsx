import { verifyToken } from '@api/server';
import AgencySignupDetailsForm from '@components/AgencySignupDetailsForm';
import { Box } from '@mui/material';

import { permanentRedirect } from 'next/navigation';
export default async function Page(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;
  const response = await verifyToken(token);
  console.log('response', response);
  if (!response) {
    return permanentRedirect('/login');
  }
  return (
    <Box sx={{ width: '100%', height: '100%', mx: 'auto' }}>
      <AgencySignupDetailsForm userId={response._id} />
    </Box>
  );
}

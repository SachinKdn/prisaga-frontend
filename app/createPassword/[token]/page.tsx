import React from 'react';
import { verifyToken } from '@api/server';
import { permanentRedirect } from 'next/navigation';
import { Box } from '@mui/material';
import CreateNewPasswordForm from '@components/CreateNewPasswordForm';

export default async function Page(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;
  const response = await verifyToken(token);
  if (!response) {
    return permanentRedirect('/login');
  }
  return (
    <Box sx={{ width: '100%', height: '100%', mx: 'auto' }}>
      <CreateNewPasswordForm />
    </Box>
  );
}

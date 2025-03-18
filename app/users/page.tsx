import React from 'react';
import { Box } from '@mui/material';
import { getUsersList } from '@/api/user';
import Users from '@/components/Users';

const Page = async () => {
  // Server side api call to get the data ---here
  // then pass it in below page component which are client side
  const response = await getUsersList();
  console.log('response of users all---', response);
  if (!response) return <>Sorry</>;
  return (
    <>
      <Users data={response} />
    </>
  );
};

export default Page;

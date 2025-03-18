import React from 'react';
import { Box } from '@mui/material';
import { getAgencyList, getUsersList } from '@/api/user';
import Users from '@components/Users';
import Vendors from '@components/Vendors';

const Page = async () => {
  // Server side api call to get the data ---here
  // then pass it in below page component which are client side
  const response = await getAgencyList();
  console.log('response of users all---', response);
  if (!response) return <>Sorry</>;
  return (
    <>
      <Vendors data={response} />
    </>
  );
};

export default Page;

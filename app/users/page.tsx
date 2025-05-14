import React from 'react';
import Users from '@/components/Users';
import { getUsersList } from '@api/server';
import NoDataFound from '@components/common/noData';

const Page = async () => {
  // Server side api call to get the data ---here
  // then pass it in below page component which are client side
  const response = await getUsersList();
  console.log('response of users all---', response);
  if (!response) return <NoDataFound title="Something went wrong!" />;
  return <Users data={response} />;
};

export default Page;

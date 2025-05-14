import React from 'react';
import Vendors from '@components/Vendors';
import NoDataFound from '@components/common/noData';
import { getAgencyList } from '@api/server';

const Page = async () => {
  // Server side api call to get the data ---here
  // then pass it in below page component which are client side
  const response = await getAgencyList();
  console.log('response of agency all---', response);
  if (!response) return <NoDataFound title="Something went wrong!" />;
  return (
    <>
      <Vendors data={response} />
    </>
  );
};

export default Page;

import React from 'react';
import { Box } from '@mui/material';
import { getAgencyById, getAgencyList, getUsersList } from '@/api/user';
import Users from '@/components/Users';
import Vendors from '@/components/Vendors';
import VendorDetails from '@/components/VendorDetails';

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const id = (await params).id;
  const response = await getAgencyById(id);
  console.log('\n\n\n\n\response', response);
  if (!response) return <>Sorry</>;
  return (
    <>
      <VendorDetails data={response} />
    </>
  );
}

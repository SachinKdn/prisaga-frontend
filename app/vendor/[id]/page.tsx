import React from 'react';
import { getAgencyById } from '@/api/user';
import VendorDetails from '@/components/VendorDetails';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const response = await getAgencyById(id);
  if (!response) return <>Sorry</>;
  return (
    <>
      <VendorDetails data={response} />
    </>
  );
}

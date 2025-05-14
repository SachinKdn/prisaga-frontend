import React from 'react';
import VendorDetails from '@/components/VendorDetails';
import NoDataFound from '@components/common/noData';
import { getAgencyById } from '@api/server';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const response = await getAgencyById(id);
  if (!response) return <NoDataFound title="Something went wrong!" />;
  return (
    <>
      <VendorDetails data={response} />
    </>
  );
}

import React from 'react';
import { getCompanyById } from '@api/server';
import NoDataFound from '@components/common/noData';
import CompanyDetails from '@components/CompanyDetails';

export default async function Page(props: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await props.params;
  const response = await getCompanyById(companyId);
  console.log('response of company---', response);
  if (!response) return <NoDataFound title="Something went wrong!" />;
  return <CompanyDetails data={response} />;
}

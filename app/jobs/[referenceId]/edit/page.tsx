import React from 'react';
import { getJobByReferenceId } from '@api/server';
import NoDataFound from '@components/common/noData';
import AddNewJob from '@components/AddNewJob';

export default async function Page(props: {
  params: Promise<{ referenceId: string }>;
}) {
  const { referenceId } = await props.params;
  const response = await getJobByReferenceId(referenceId);
  console.log('response of job---', response);
  if (!response) return <NoDataFound title="Something went wrong!" />;
  return <AddNewJob data={response} />;
}

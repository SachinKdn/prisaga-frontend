import React from 'react';
import Jobs from '@components/Jobs';
import { getJobsList } from '@api/server';
import NoDataFound from '@components/common/noData';

export default async function Page() {
  const response = await getJobsList();
  console.log('response of jobs all---', response);
  if (!response) return <NoDataFound title="Something went wrong!" />;
  return <Jobs data={response} />;
}

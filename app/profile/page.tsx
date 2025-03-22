import { getProfile } from '@api/server';
import Profile from '@components/Profile';

export default async function Page() {
  const response = await getProfile();
  console.log('getProfile result', response);
  return <Profile />;
}

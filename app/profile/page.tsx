import { getProfile } from '@api/server';
import { clearToken } from '@api/tokenHandler';
import Profile from '@components/Profile';
import { permanentRedirect } from 'next/navigation';

export default async function Page() {
  const user = await getProfile();

  console.log('getProfile result', user);
  if (!user) {
    await clearToken();
    permanentRedirect('/login');
  }
  return <Profile data={user} />;
}

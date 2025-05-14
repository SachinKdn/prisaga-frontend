import { getProfile } from '@api/server';
import { clearToken } from '@api/tokenHandler';
import UpdateAgencyDetails from '@components/Profile/UpdateAgencyDetails';
import { permanentRedirect } from 'next/navigation';

export default async function Page() {
  const user = await getProfile();

  console.log('getProfile result', user);
  if (!user || !user.agency) {
    await clearToken();
    permanentRedirect('/login');
  }
  return <UpdateAgencyDetails agency={user.agency} />;
}

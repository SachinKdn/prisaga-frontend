import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/user';
import { clearToken } from '@api/tokenHandler';
const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      logout();
      await clearToken();
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return handleLogout;
};

export default useLogout;

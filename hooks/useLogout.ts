import { useRouter } from 'next/navigation';
import { logout, setIsAuthenticated } from '@/store/slices/user';
import { clearToken } from '@api/tokenHandler';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

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

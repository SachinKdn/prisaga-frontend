import { useRouter } from 'next/navigation'; 
import { logout } from '@/store/slices/user';
const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return handleLogout; 
};

export default useLogout;

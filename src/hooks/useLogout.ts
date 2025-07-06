import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { clearToken, clearUser } from '@/store/userSlice';
import userApis from '@/api/user';

export const useLogout = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = useCallback(() => {
    userApis.logout();
    dispatch(clearToken());
    dispatch(clearUser());
    router.replace('/login');
  }, [dispatch, router]);

  return {
    handleLogout
  };
}; 
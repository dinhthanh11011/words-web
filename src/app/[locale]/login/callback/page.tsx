
"use client";
import { AppDispatch } from '@/store';
import { setToken } from '@/store/userSlice';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

export default function LoginCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const t = useTranslations('LoginCallback');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      dispatch(setToken(token));
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [router, searchParams, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-lg font-semibold">{t('loggingIn')}</div>
      </div>
    </div>
  );
} 
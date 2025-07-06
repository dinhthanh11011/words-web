"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoginCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('LoginCallback');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-semibold">{t('loggingIn')}</div>
    </div>
  );
} 
'use client'
import { useEffect } from 'react';
import store from '@/store';
import { Provider } from 'react-redux';
import { initializeTheme } from '@/store/themeSlice';
import './globals.css';
import AuthProvider from '@/components/common/AuthProvider';

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
}
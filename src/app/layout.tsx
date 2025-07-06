'use client'
import store from '@/store';
import { Provider } from 'react-redux';
import './globals.css';
import AuthProvider from '@/components/common/AuthProvider';

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
}
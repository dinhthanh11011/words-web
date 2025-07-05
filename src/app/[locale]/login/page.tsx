import React from 'react'
import styles from './login.module.scss'
import { useTranslations } from 'next-intl';

export default function Login() {
  const t = useTranslations('LoginPage');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo/Icon */}
        <div className={styles.logo}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#6366F1" />
            <text x="50%" y="56%" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold" fontFamily="Arial" dy=".3em">W</text>
          </svg>
        </div>
        <h2 className={styles.title}>{t('title')} </h2>
        <p className={styles.subtitle}>
          Welcome back! Please sign in to continue.
        </p>
        <a
          href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}
          className={styles.googleButton}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.367 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.625c-1.703-1.57-3.898-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.656z" fill="#FFC107"></path>
              <path d="M3.152 7.345l3.281 2.406c.891-1.789 2.672-2.953 4.617-2.953 1.125 0 2.188.391 3.008 1.164l2.844-2.766c-1.703-1.57-3.898-2.523-6.656-2.523-3.797 0-7.031 2.484-8.406 5.953z" fill="#FF3D00"></path>
              <path d="M12 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.844.633-2.016 1.078-3.516 1.078-2.789 0-5.148-1.883-5.992-4.453l-3.242 2.5c1.359 3.422 4.594 5.773 8.234 5.773z" fill="#4CAF50"></path>
              <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.367 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.625c-1.703-1.57-3.898-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.656z" fill="#1976D2"></path>
            </g>
          </svg>
          Continue with Google
        </a>
      </div>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Words App
      </footer>
    </div>
  );
}

"use client";
import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/themeSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { useLocale } from '@/hooks/useLocale';
import { useLogout } from '@/hooks/useLogout';

export function Navbar({
  currentLocale = 'en',
}: {
  readonly currentLocale?: string;
}) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.info as { name: string; image?: string } | null);
  const theme = useSelector((state: RootState) => state.theme.value);
  const t = useTranslations('Navbar');
  
  const { handleLocaleChange, locales } = useLocale();
  const { handleLogout } = useLogout();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 border-b bg-white/80 dark:bg-black/60 backdrop-blur z-50">
      <div className="font-bold text-lg tracking-tight">Words</div>
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <Select value={currentLocale} onValueChange={handleLocaleChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locales.map(locale => (
              <SelectItem key={locale.value} value={locale.value}>
                {locale.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Theme Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">🌞</span>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={v => handleThemeChange(v ? 'dark' : 'light')}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">🌙</span>
        </div>
        {/* User Avatar + Popover */}
        {!user && (
          <Button
            variant="outline"
            onClick={() => router.push('/login')}
            className="ml-2"
          >
            {t('login')}
          </Button>
        )}
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="ml-2 cursor-pointer">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name?.[0] || '?'}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-2">
              <div className="flex flex-col items-center gap-2">
                <button
                  className="w-full text-sm font-medium text-gray-900 dark:text-white text-center hover:underline"
                  onClick={() => router.push('/profile')}
                >
                  {user.name}
                </button>
                <button
                  className="w-full mt-2 px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
                  onClick={handleLogout}
                >
                  {t('logout')}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
} 
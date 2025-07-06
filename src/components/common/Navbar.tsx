'use client';
import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/themeSlice';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { useLocale } from '@/hooks/useLocale';
import { useLogout } from '@/hooks/useLogout';

export function Navbar({
  currentLocale = 'en',
}: {
  readonly currentLocale?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(
    (state: RootState) =>
      state.user.info as { name: string; image?: string } | null
  );
  const theme = useSelector((state: RootState) => state.theme.value);
  const t = useTranslations('Navbar');

  const { handleLocaleChange, locales } = useLocale();
  const { handleLogout } = useLogout();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Auto close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleThemeChange = (newTheme: string) => {
    dispatch(setTheme(newTheme));
  };

  const handleProfileClick = () => {
    setIsPopoverOpen(false);
    router.push('/profile');
  };

  const handleLogoutClick = () => {
    setIsPopoverOpen(false);
    handleLogout();
  };

  const handleLanguageChange = (locale: string) => {
    handleLocaleChange(locale);
  };

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  const navigationItems = [
    { href: '/home', label: t('home') },
    { href: '/courses', label: t('courses') },
  ];

  return (
    <nav className='w-full flex items-center justify-between px-4 py-2 border-b bg-white/80 dark:bg-black/60 backdrop-blur z-50'>
      {/* Logo */}
      <button
        className='font-bold text-lg tracking-tight cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0'
        onClick={() => router.push('/home')}
        aria-label='Go to home page'
      >
        Words
      </button>

      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center space-x-6'>
        {navigationItems.map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right side controls */}
      <div className='flex items-center gap-4'>
        {/* Language Switcher - Desktop only */}
        <div className='hidden md:block'>
          <Select value={currentLocale} onValueChange={handleLocaleChange}>
            <SelectTrigger className='w-32'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locales.map((locale) => (
                <SelectItem key={locale.value} value={locale.value}>
                  {locale.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Theme Switcher - Desktop only */}
        <div className='hidden md:flex items-center gap-2'>
          <span className='text-xs text-gray-500 dark:text-gray-400'>🌞</span>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(v) => handleThemeChange(v ? 'dark' : 'light')}
          />
          <span className='text-xs text-gray-500 dark:text-gray-400'>🌙</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={mobileMenuButtonRef}
          className='md:hidden p-2 rounded-md text-foreground hover:bg-accent'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label='Toggle mobile menu'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>

        {/* User Avatar + Popover */}
        {!user && (
          <Button
            variant='outline'
            onClick={() => router.push('/login')}
            className='ml-2'
          >
            {t('login')}
          </Button>
        )}
        {user && (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Avatar className='ml-2 cursor-pointer'>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name?.[0] || '?'}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-48 p-2'>
              <div className='flex flex-col items-center gap-2'>
                <button
                  className='w-full text-sm font-medium text-gray-900 dark:text-white text-center hover:underline'
                  onClick={handleProfileClick}
                >
                  {user.name}
                </button>
                <button
                  className='w-full mt-2 px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm'
                  onClick={handleLogoutClick}
                >
                  {t('logout')}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className='absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 md:hidden'
        >
          <div className='px-4 py-2 space-y-2'>
            {/* Mobile Navigation */}
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Language Switcher */}
            <div className='flex items-center justify-between px-3 py-2'>
              <span className='text-sm text-foreground'>Language</span>
              <div className='flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1'>
                {locales.map((locale) => (
                  <button
                    key={locale.value}
                    onClick={() => handleLanguageChange(locale.value)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      locale.value === currentLocale
                        ? 'bg-white dark:bg-gray-900 text-foreground shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-foreground'
                    }`}
                  >
                    {locale.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Theme Switcher */}
            <div className='flex items-center justify-between px-3 py-2'>
              <span className='text-sm text-foreground'>Theme</span>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  🌞
                </span>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(v) =>
                    handleThemeChange(v ? 'dark' : 'light')
                  }
                />
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  🌙
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

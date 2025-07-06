"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';

const locales = [
  { value: 'en', label: 'English' },
  { value: 'vn', label: 'Tiếng Việt' },
];

export function Navbar({
  currentLocale = 'en',
}: {
  readonly currentLocale?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Theme state: dark/light
  const [theme, setTheme] = React.useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') ?? 'light' : 'light'
  );

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Handle language change
  const handleLocaleChange = (value: string) => {
    // Replace the locale in the pathname (assuming /[locale]/... structure)
    const segments = pathname.split('/');
    if (locales.some(l => l.value === segments[1])) {
      segments[1] = value;
    } else {
      segments.splice(1, 0, value);
    }
    router.push(segments.join('/') || '/');
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
          <Switch checked={theme === 'dark'} onCheckedChange={v => setTheme(v ? 'dark' : 'light')} />
          <span className="text-xs text-gray-500 dark:text-gray-400">🌙</span>
        </div>
      </div>
    </nav>
  );
} 
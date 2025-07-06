import { useRouter, usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';

const locales = [
  { value: 'en', label: 'English' },
  { value: 'vn', label: 'Tiếng Việt' },
];

export const useLocale = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [currentLocale] = useState(() => {
    const segments = pathname.split('/');
    return locales.some(l => l.value === segments[1]) ? segments[1] : 'en';
  });

  const handleLocaleChange = useCallback((value: string) => {
    const segments = pathname.split('/');
    if (locales.some(l => l.value === segments[1])) {
      segments[1] = value;
    } else {
      segments.splice(1, 0, value);
    }
    router.push(segments.join('/') || '/');
  }, [router, pathname]);

  return {
    currentLocale,
    handleLocaleChange,
    locales
  };
}; 
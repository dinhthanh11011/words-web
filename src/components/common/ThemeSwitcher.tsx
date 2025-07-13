'use client';
import { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '../ui/switch';

interface ThemeSwitcherProps {
  showLabels?: boolean;
  className?: string;
}

export function ThemeSwitcher({ showLabels = true, className = '' }: ThemeSwitcherProps) {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.value);

  const handleThemeChange = (newTheme: string) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabels && (
        <span className='text-xs text-gray-500 dark:text-gray-400'>🌞</span>
      )}
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(v) => handleThemeChange(v ? 'dark' : 'light')}
      />
      {showLabels && (
        <span className='text-xs text-gray-500 dark:text-gray-400'>🌙</span>
      )}
    </div>
  );
} 
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from 'next-intl';

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  total: number;
  currentPage: number;
}

const pageSizeOptions = [6, 12, 24, 48];

export default function PageSizeSelector({ 
  pageSize, 
  onPageSizeChange, 
  total,
  currentPage 
}: PageSizeSelectorProps) {
  const t = useTranslations('Courses');

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {t('showing')} {startItem}-{endItem} {t('of')} {total} {t('items')}
      </div>
      
      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {t('itemsPerPage')}:
        </label>
        <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations('Courses');

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const addRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) pages.push(i);
    };

    if (currentPage <= 3) {
      addRange(1, 4);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      addRange(totalPages - 3, totalPages);
    } else {
      pages.push(1);
      pages.push('...');
      addRange(currentPage - 1, currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className='flex items-center justify-center space-x-2 mt-8'>
      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        {t('first')}
      </Button>

      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t('previous')}
      </Button>

      {getPageNumbers().map((page) => (
        <React.Fragment key={page}>
          {page === '...' ? (
            <span className='px-3 py-2 text-gray-500'>...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size='sm'
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t('next')}
      </Button>

      <Button
        variant='outline'
        size='sm'
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {t('last')}
      </Button>
    </div>
  );
}

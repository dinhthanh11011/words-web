import React from 'react';
import { Language } from '@/api/course';
import { useTranslations, useLocale } from 'next-intl';

interface LanguageFilterProps {
  readonly languages: Language[];
  readonly selectedLanguage: string;
  readonly onLanguageChange: (languageCode: string) => void;
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
  readonly onPageChange: (page: number) => void;
}

export default function LanguageFilter({
  languages,
  selectedLanguage,
  onLanguageChange,
  page,
  pageSize,
  total,
  onPageChange,
}: LanguageFilterProps) {
  const t = useTranslations('Courses');
  const locale = useLocale();

  const getLanguageName = (language: Language) => {
    const found = language.names.find((n) => n.locale === locale);
    if (found) return found.name;
    // fallback to English
    const en = language.names.find((n) => n.locale === 'en');
    return en ? en.name : '';
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
        {t('languages')}
      </h3>
      {languages.length === 0 ? (
        <div className='text-gray-500 dark:text-gray-400 text-sm'>
          {t('noLanguages')}
        </div>
      ) : (
        <>
          <div className='space-y-2'>
            <button
              onClick={() => onLanguageChange('all')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedLanguage === 'all'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {t('allCourses')}
            </button>
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => onLanguageChange(language.locale)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${selectedLanguage === language.locale
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {language.flag && (
                  <span className='text-lg'>{language.flag}</span>
                )}
                <span>{getLanguageName(language)}</span>
              </button>
            ))}
          </div>
          {totalPages > 1 && (
            <div className='flex justify-between mt-4'>
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className='px-2 py-1 text-sm rounded disabled:opacity-50'
              >
                Prev
              </button>
              <span className='text-sm'>
                {page} / {totalPages}
              </span>
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className='px-2 py-1 text-sm rounded disabled:opacity-50'
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

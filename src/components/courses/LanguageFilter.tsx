import React from 'react';
import { Language } from '@/api/course';
import { useTranslations } from 'next-intl';

interface LanguageFilterProps {
 readonly languages: Language[];
 readonly selectedLanguage: string;
 readonly onLanguageChange: (languageCode: string) => void;
}

export default function LanguageFilter({ 
  languages, 
  selectedLanguage, 
  onLanguageChange 
}: LanguageFilterProps) {
  const t = useTranslations('Courses');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('languages')}
      </h3>
      <div className="space-y-2">
        <button
          onClick={() => onLanguageChange('all')}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            selectedLanguage === 'all'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {t('allCourses')}
        </button>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
              selectedLanguage === language.code
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {language.flag && (
              <span className="text-lg">{language.flag}</span>
            )}
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 
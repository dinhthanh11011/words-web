import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Course } from '@/api/course';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface CourseCardProps {
  readonly course: Course;
  readonly onClick?: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const t = useTranslations('Courses');
  const locale = useLocale();
  
  // Get language name in current locale, fallback to English
  const getLanguageName = () => {
    const found = course.language.names?.find(n => n.locale === locale);
    if (found) return found.name;
    const en = course.language.names?.find(n => n.locale === 'en');
    return en ? en.name : '';
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <Image
          src={course.image || '/public/next.svg'}
          alt={course.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {course.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            {course.language.flag && (
              <span className="flex items-center">
                <span className="text-lg mr-1">{course.language.flag}</span>
                {getLanguageName()}
              </span>
            )}
            {course.user && (
              <span className="flex items-center">
                <Image
                  src={course.user.image}
                  alt={course.user.name}
                  width={24}
                  height={24}
                  className="rounded-full mr-1"
                />
                {course.user.name}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
'use client';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  fetchCourses,
  fetchLanguages,
  setSelectedLanguage,
  setPage,
  setPageSize,
} from '@/store/courseSlice';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/courses/CourseCard';
import LanguageFilter from '@/components/courses/LanguageFilter';
import Pagination from '@/components/courses/Pagination';
import PageSizeSelector from '@/components/courses/PageSizeSelector';
import AuthGuard from '@/components/common/AuthGuard';
import { useRouter } from 'next/navigation';

export default function Courses() {
  const t = useTranslations('Courses');
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const { courses, languages, selectedLanguage, loading, error, pagination } =
    useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      language: selectedLanguage === 'all' ? undefined : selectedLanguage,
    };
    dispatch(fetchCourses(params));
  }, [dispatch, selectedLanguage, pagination.page, pagination.limit]);

  const handleLanguageChange = (languageCode: string) => {
    dispatch(setSelectedLanguage(languageCode));
    dispatch(setPage(1)); // Reset to first page when changing language
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handlePageSizeChange = (size: number) => {
    dispatch(setPageSize(size));
  };

  const handleCreateCourse = () => {
    router.push('/courses/create');
  };

  const handleCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const renderCourseContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {t('loading')}
          </p>
        </div>
      );
    }

    if (courses.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            {t('noCourses')}
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
        </div>
        
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  if (error) {
    return (
      <AuthGuard>
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
          <div className='max-w-7xl mx-auto px-4'>
            <div className='text-center'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                {t('error')}
              </h2>
              <Button onClick={() => dispatch(fetchCourses({}))}>
                {t('tryAgain')}
              </Button>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
        <div className='max-w-7xl mx-auto px-4'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                {t('title')}
              </h1>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>
                {t('subtitle')}
              </p>
            </div>
            <Button onClick={handleCreateCourse} className='mt-4 sm:mt-0'>
              {t('createCourse')}
            </Button>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* Left Sidebar - Language Filter */}
            <div className='lg:col-span-1'>
              <LanguageFilter
                languages={languages}
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            {/* Right Side - Course List */}
            <div className='lg:col-span-3'>
              <PageSizeSelector
                pageSize={pagination.limit}
                onPageSizeChange={handlePageSizeChange}
                total={pagination.total}
                currentPage={pagination.page}
              />

              {renderCourseContent()}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

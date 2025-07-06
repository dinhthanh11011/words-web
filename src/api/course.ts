import axios from '@/lib/axios';

export interface LanguageName {
  id: number;
  languageId: number;
  locale: string;
  name: string;
}

export interface CourseLanguage {
  id: number;
  locale: string;
  flag: string;
  names: LanguageName[];
}

export interface CourseUser {
  id: number;
  name: string;
  image: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  image: string;
  languageId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  language: CourseLanguage;
  user: CourseUser;
}

export interface LanguagesResponse {
  items: Language[];
  total: number;
}

export interface CoursesResponse {
  items: Course[];
  total: number;
}

export async function getCourses(params?: {
  page?: number;
  limit?: number;
  language?: string;
}) {
  const res = await axios.get('/courses', { params });
  return res.data as CoursesResponse;
}

export async function getLanguages(params?: { page?: number; limit?: number }) {
  const res = await axios.get('/languages', { params });
  return res.data as LanguagesResponse;
}

const courseApis = {
  getCourses,
  getLanguages,
};

export default courseApis;

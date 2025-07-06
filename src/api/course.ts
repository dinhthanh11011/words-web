import axios from '@/lib/axios';

export interface Course {
  id: string;
  name: string;
  description: string;
  image: string;
  language: string;
  wordCount: number;
  enrolledCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LanguageName {
  id: number;
  languageId: number;
  locale: string;
  name: string;
}

export interface Language {
  id: number;
  locale: string;
  flag: string;
  names: LanguageName[];
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const dummyCourses: Course[] = [
  {
    id: '1',
    name: 'Basic English Vocabulary',
    description: 'Learn essential English words for everyday communication',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
    language: 'en',
    wordCount: 500,
    enrolledCount: 1250,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Vietnamese for Beginners',
    description: 'Master basic Vietnamese phrases and pronunciation',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    language: 'vn',
    wordCount: 300,
    enrolledCount: 890,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Spanish Conversation',
    description: 'Improve your Spanish speaking skills with practical conversations',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    language: 'es',
    wordCount: 750,
    enrolledCount: 2100,
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z',
  },
  {
    id: '4',
    name: 'French Grammar Essentials',
    description: 'Learn French grammar rules and sentence structure',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    language: 'fr',
    wordCount: 600,
    enrolledCount: 1560,
    createdAt: '2024-02-10T16:45:00Z',
    updatedAt: '2024-02-10T16:45:00Z',
  },
  {
    id: '5',
    name: 'German Business Terms',
    description: 'Essential German vocabulary for business and professional settings',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    language: 'de',
    wordCount: 400,
    enrolledCount: 980,
    createdAt: '2024-02-15T11:20:00Z',
    updatedAt: '2024-02-15T11:20:00Z',
  },
  {
    id: '6',
    name: 'Japanese Hiragana & Katakana',
    description: 'Master the Japanese writing systems step by step',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop',
    language: 'ja',
    wordCount: 200,
    enrolledCount: 3200,
    createdAt: '2024-02-20T13:10:00Z',
    updatedAt: '2024-02-20T13:10:00Z',
  },
  {
    id: '7',
    name: 'Korean Daily Expressions',
    description: 'Learn common Korean phrases used in daily life',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    language: 'ko',
    wordCount: 350,
    enrolledCount: 1450,
    createdAt: '2024-02-25T08:30:00Z',
    updatedAt: '2024-02-25T08:30:00Z',
  },
  {
    id: '8',
    name: 'Chinese Characters Basics',
    description: 'Introduction to Chinese characters and their meanings',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
    language: 'zh',
    wordCount: 250,
    enrolledCount: 2100,
    createdAt: '2024-03-01T10:45:00Z',
    updatedAt: '2024-03-01T10:45:00Z',
  },
  {
    id: '9',
    name: 'Advanced English Writing',
    description: 'Improve your English writing skills for academic and professional purposes',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    language: 'en',
    wordCount: 800,
    enrolledCount: 890,
    createdAt: '2024-03-05T15:20:00Z',
    updatedAt: '2024-03-05T15:20:00Z',
  },
  {
    id: '10',
    name: 'Vietnamese Culture & Language',
    description: 'Explore Vietnamese culture while learning the language',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    language: 'vn',
    wordCount: 450,
    enrolledCount: 670,
    createdAt: '2024-03-10T12:00:00Z',
    updatedAt: '2024-03-10T12:00:00Z',
  },
  {
    id: '11',
    name: 'Spanish Travel Phrases',
    description: 'Essential Spanish phrases for travelers and tourists',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    language: 'es',
    wordCount: 300,
    enrolledCount: 1800,
    createdAt: '2024-03-15T09:30:00Z',
    updatedAt: '2024-03-15T09:30:00Z',
  },
  {
    id: '12',
    name: 'French Pronunciation Guide',
    description: 'Master French pronunciation and accent marks',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    language: 'fr',
    wordCount: 350,
    enrolledCount: 1200,
    createdAt: '2024-03-20T14:15:00Z',
    updatedAt: '2024-03-20T14:15:00Z',
  },
];

export async function getCourses(params?: {
  page?: number;
  limit?: number;
  language?: string;
}) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 12;
  const language = params?.language;
  
  let filteredCourses = dummyCourses;
  
  // Filter by language if specified
  if (language) {
    filteredCourses = dummyCourses.filter(course => course.language === language);
  }
  
  // Calculate pagination
  const total = filteredCourses.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);
  
  return {
    courses: paginatedCourses,
    total,
    page,
    limit,
    totalPages,
  } as CoursesResponse;
}

export async function getLanguages() {
  const res = await axios.get('/languages');
  return res.data;
}

const courseApis = {
  getCourses,
  getLanguages
};

export default courseApis; 
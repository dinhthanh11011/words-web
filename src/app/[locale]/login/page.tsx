import React from 'react'
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Login() {
  const t = useTranslations('LoginPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-6 text-center pb-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">W</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {t('title')}
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                {t('subtitle')}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Button 
              asChild
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 group"
            >
              <a href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.367 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.625c-1.703-1.57-3.898-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.656z" fill="#FFC107"/>
                      <path d="M3.152 7.345l3.281 2.406c.891-1.789 2.672-2.953 4.617-2.953 1.125 0 2.188.391 3.008 1.164l2.844-2.766c-1.703-1.57-3.898-2.523-6.656-2.523-3.797 0-7.031 2.484-8.406 5.953z" fill="#FF3D00"/>
                      <path d="M12 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.844.633-2.016 1.078-3.516 1.078-2.789 0-5.148-1.883-5.992-4.453l-3.242 2.5c1.359 3.422 4.594 5.773 8.234 5.773z" fill="#4CAF50"/>
                      <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.367 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.625c-1.703-1.57-3.898-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.656z" fill="#1976D2"/>
                    </svg>
                  </div>
                  <span className="font-medium">{t('googleButton')}</span>
                </div>
              </a>
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{t('or')}</span>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              {t('termsText')}{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                {t('termsLink')}
              </a>{' '}
              {t('and')}{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                {t('privacyLink')}
              </a>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('footer', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import AuthGuard from '@/components/common/AuthGuard'
import { RootState } from '@/store'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher'
import { useLocale } from '@/hooks/useLocale'
import { useLogout } from '@/hooks/useLogout'

export default function Profile() {
  const t = useTranslations('Profile')
  
  const user = useSelector((state: RootState) => state.user.info as { name: string; email?: string; image?: string } | null)
  const loading = useSelector((state: RootState) => state.user.loading)
  const error = useSelector((state: RootState) => state.user.error)
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  
  const { currentLocale, handleLocaleChange, locales } = useLocale()
  const { handleLogout } = useLogout()

  const onLogoutConfirm = () => {
    setShowLogoutConfirm(false)
    handleLogout()
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-lg font-semibold">{t('loading')}</div>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (error) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-lg font-semibold mb-4">{t('error')}</div>
            <Button onClick={() => window.location.reload()}>
              {t('tryAgain')}
            </Button>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('personalInfo')}</CardTitle>
                  <CardDescription>{t('personalInfoDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20 !static">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback className="text-lg">{user?.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('name')}
                      </label>
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                        {user?.name || t('notAvailable')}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('email')}
                      </label>
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                        {user?.email || t('notAvailable')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('settings')}</CardTitle>
                  <CardDescription>{t('settingsDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Setting */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {t('theme')}
                    </label>
                    <ThemeSwitcher />
                  </div>

                  {/* Language Setting */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {t('language')}
                    </label>
                    <Select value={currentLocale} onValueChange={handleLocaleChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locales.map(locale => (
                          <SelectItem key={locale.value} value={locale.value}>
                            {locale.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Logout */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => setShowLogoutConfirm(true)}
                    >
                      {t('logout')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('logout')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('logoutConfirm')}
              </p>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  {t('cancel')}
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={onLogoutConfirm}
                >
                  {t('confirm')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

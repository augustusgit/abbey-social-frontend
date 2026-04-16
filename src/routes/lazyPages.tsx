import { lazy } from 'react'

export const LandingPageLazy = lazy(() => import('@/pages/LandingPage'))
export const LoginPageLazy = lazy(() => import('@/pages/LoginPage'))
export const RegisterPageLazy = lazy(() => import('@/pages/RegisterPage'))
export const DashboardPageLazy = lazy(() => import('@/pages/DashboardPage'))
export const AccountSettingsPageLazy = lazy(() => import('@/pages/AccountSettingsPage'))
export const ProfilePageLazy = lazy(() => import('@/pages/ProfilePage'))
export const FollowListPageLazy = lazy(() => import('@/pages/FollowListPage'))
export const NotFoundPageLazy = lazy(() => import('@/pages/NotFoundPage'))

import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { GuestRoute } from '@/routes/GuestRoute'
import {
  AccountSettingsPageLazy,
  DashboardPageLazy,
  FollowListPageLazy,
  LandingPageLazy,
  LoginPageLazy,
  NotFoundPageLazy,
  ProfilePageLazy,
  RegisterPageLazy,
} from '@/routes/lazyPages'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LandingPageLazy /> },
      {
        path: 'login',
        element: (
          <GuestRoute>
            <LoginPageLazy />
          </GuestRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestRoute>
            <RegisterPageLazy />
          </GuestRoute>
        ),
      },
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <DashboardPageLazy />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <AccountSettingsPageLazy />
          </ProtectedRoute>
        ),
      },
      { path: 'profile/:userId/followers', element: <FollowListPageLazy /> },
      { path: 'profile/:userId/following', element: <FollowListPageLazy /> },
      { path: 'profile/:userId', element: <ProfilePageLazy /> },
      { path: '*', element: <NotFoundPageLazy /> },
    ],
  },
])

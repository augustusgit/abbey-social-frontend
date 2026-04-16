import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePageLazy, NotFoundPageLazy } from '@/routes/lazyPages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePageLazy /> },
      { path: '*', element: <NotFoundPageLazy /> },
    ],
  },
])

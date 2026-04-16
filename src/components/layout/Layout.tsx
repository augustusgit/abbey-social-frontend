import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { PageSpinner } from '@/components/common/PageSpinner'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Suspense fallback={<PageSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

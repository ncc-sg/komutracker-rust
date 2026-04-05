import { NavLink } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

const navLinks = [
  { to: '/home', label: 'Home' },
  { to: '/activity/local', label: 'Activity' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/buckets', label: 'Buckets' },
  { to: '/trends', label: 'Trends' },
  { to: '/settings', label: 'Settings' },
  { to: '/stopwatch', label: 'Stopwatch' },
]

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold text-indigo-700">
            <span className="inline-block h-2 w-2 rounded-full bg-indigo-600" aria-hidden />
            <span>KomuTracker React</span>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-medium text-slate-600">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 transition hover:text-slate-900 ${
                    isActive ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  )
}

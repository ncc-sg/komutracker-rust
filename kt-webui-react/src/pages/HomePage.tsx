import { Page } from '../components/Page'

export function HomePage() {
  return (
    <Page
      title="Home"
      description="Landing dashboard for KomuTracker. Replace with widgets and summaries."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">Activity snapshot</h2>
          <p className="text-sm text-slate-500">Show recent activity and time spent.</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">Current tasks</h2>
          <p className="text-sm text-slate-500">Surface timers, alerts, and quick links.</p>
        </div>
      </div>
    </Page>
  )
}

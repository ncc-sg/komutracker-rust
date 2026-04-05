import { Outlet, useParams } from 'react-router-dom'
import { Page } from '../components/Page'

export function ActivityPage() {
  const { host, periodLength, date } = useParams()

  const meta = [host ? `Host: ${host}` : null, periodLength ? `Period: ${periodLength}` : null, date ? `Date: ${date}` : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <Page title="Activity" description={meta || 'Explore activity across hosts and periods.'}>
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Activity summary placeholder. Render time breakdowns, filters, and charts here.
        </div>
        <Outlet />
      </div>
    </Page>
  )
}

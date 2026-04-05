import { useParams } from 'react-router-dom'
import { Page } from '../components/Page'

export function TrendsPage() {
  const { host } = useParams()

  return (
    <Page
      title="Trends"
      description={host ? `Trends for host ${host}` : 'Compare usage across hosts or periods.'}
      footnote="Full-container route like Vue trends view."
    >
      <div className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        Trends visualization placeholder.
      </div>
    </Page>
  )
}

import { useParams } from 'react-router-dom'

export function ActivityViewPage() {
  const { viewId } = useParams()
  const label = viewId && viewId.length > 0 ? viewId : 'summary'

  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
      Activity view placeholder for “{label}”. Render timelines, charts, and filters here.
    </div>
  )
}

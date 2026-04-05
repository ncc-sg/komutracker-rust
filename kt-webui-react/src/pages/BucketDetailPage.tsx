import { useParams } from 'react-router-dom'
import { Page } from '../components/Page'

export function BucketDetailPage() {
  const { id } = useParams()

  return (
    <Page
      title="Bucket detail"
      description={id ? `Bucket ID: ${id}` : 'View bucket contents and history.'}
    >
      <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
        Bucket detail placeholder.
      </div>
    </Page>
  )
}

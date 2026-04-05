import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { Page } from './components/Page'
import { ActivityPage } from './pages/ActivityPage'
import { ActivityViewPage } from './pages/ActivityViewPage'
import { BucketDetailPage } from './pages/BucketDetailPage'
import { BucketsPage } from './pages/BucketsPage'
import { HomePage } from './pages/HomePage'
import { TimelinePage } from './pages/TimelinePage'
import { TrendsPage } from './pages/TrendsPage'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/activity/:host?/:periodLength?/:date?" element={<ActivityPage />}>
          <Route path="view/:viewId?" element={<ActivityViewPage />} />
        </Route>
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/buckets" element={<BucketsPage />} />
        <Route path="/buckets/:id" element={<BucketDetailPage />} />
        <Route path="/trends/:host?" element={<TrendsPage />} />
        <Route
          path="/settings"
          element={<Page title="Settings" description="Configure KomuTracker preferences." />}
        />
        <Route
          path="/stopwatch"
          element={<Page title="Stopwatch" description="Start and manage timers." />}
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App

import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'
import ToastContainer, { type ToastMessage, type ToastType } from './components/Toast'
import HomePage from './pages/HomePage'
import AnalyzePage from './pages/AnalyzePage'
import AnalyzingPage from './pages/AnalyzingPage'
import ResultsPage from './pages/ResultsPage'
import DetailedScorePage from './pages/DetailedScorePage'
import HistoryPage from './pages/HistoryPage'
import FeedbackPage from './pages/FeedbackPage'
import AboutPage from './pages/AboutPage'

export type Page =
  | 'home'
  | 'analyze'
  | 'analyzing'
  | 'results'
  | 'detailed'
  | 'history'
  | 'feedback'
  | 'about'

let toastCounter = 0

export function saveHistoryEntry(score: number) {
  try {
    const raw = localStorage.getItem('instarate_history')
    const entries = raw ? JSON.parse(raw) : []
    entries.unshift({
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      score,
      timestamp: Date.now(),
    })
    localStorage.setItem('instarate_history', JSON.stringify(entries.slice(0, 20)))
  } catch {}
}

const PUBLIC_PAGES: Page[] = ['home', 'feedback', 'about']
const ANALYZING_PAGES: Page[] = ['analyzing']

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const navigate = useCallback((p: Page) => {
    setPage(p)
    window.scrollTo(0, 0)
  }, [])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastCounter
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Full-screen pages with their own layout
  if (PUBLIC_PAGES.includes(page)) {
    return (
      <>
        {page === 'home' && <HomePage navigate={navigate} addToast={addToast} />}
        {page === 'feedback' && <FeedbackPage navigate={navigate} addToast={addToast} />}
        {page === 'about' && <AboutPage navigate={navigate} />}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </>
    )
  }

  if (ANALYZING_PAGES.includes(page)) {
    return <AnalyzingPage navigate={navigate} />
  }

  // App layout with sidebar
  return (
    <div className="flex h-screen bg-[#fafafa]">
      <Sidebar page={page} navigate={navigate} />
      <div className="flex-1 overflow-y-auto md:ml-64">
        <div className="pb-20 md:pb-0">
          {page === 'analyze' && <AnalyzePage navigate={navigate} addToast={addToast} />}
          {page === 'results' && <ResultsPage navigate={navigate} addToast={addToast} />}
          {page === 'detailed' && <DetailedScorePage navigate={navigate} />}
          {page === 'history' && <HistoryPage navigate={navigate} />}
        </div>
      </div>
      <MobileNav page={page} navigate={navigate} />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

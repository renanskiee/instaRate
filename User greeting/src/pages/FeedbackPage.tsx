import { useState } from 'react'
import type { Page } from '../App'
import Footer from '../components/Footer'
import type { ToastType } from '../components/Toast'
import { submitFeedback } from '../../utils/supabase/api'

interface Props {
  navigate: (p: Page) => void
  addToast: (message: string, type?: ToastType) => void
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function FeedbackPage({ navigate, addToast }: Props) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  function validate() {
    if (!message.trim()) {
      setMessageError('Please enter your feedback before submitting.')
      return false
    }
    if (message.trim().length < 10) {
      setMessageError('Feedback must be at least 10 characters.')
      return false
    }
    setMessageError('')
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await submitFeedback(name.trim() || null, message.trim())
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function handleReset() {
    setName('')
    setMessage('')
    setMessageError('')
    setStatus('idle')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 font-outfit flex flex-col">
      {/* Nav */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center gap-2" aria-label="Go to home">
            <div className="w-8 h-8 gradient-bg rounded-xl flex items-center justify-center text-white font-black text-sm">IR</div>
            <span className="font-black text-gray-900 text-lg">InstaRate</span>
          </button>
          <nav className="hidden md:flex items-center gap-6" aria-label="Site navigation">
            {[
              { label: 'Home', page: 'home' as Page },
              { label: 'Analyze', page: 'analyze' as Page },
              { label: 'About', page: 'about' as Page },
            ].map(({ label, page }) => (
              <button key={label} onClick={() => navigate(page)} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">{label}</button>
            ))}
          </nav>
          <button onClick={() => navigate('analyze')} className="hidden md:flex items-center gap-1.5 text-sm font-semibold gradient-bg text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-pink-200">
            ✨ Rate My Instagram
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5 shadow-lg shadow-pink-200">💬</div>
          <h1 className="font-black text-4xl text-gray-900 mb-3">Share Your Feedback</h1>
          <p className="text-gray-500 font-[Inter,sans-serif] max-w-md mx-auto leading-relaxed">
            Help us make InstaRate better. Your thoughts, ideas, and bug reports are genuinely valuable and read by the developer.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" className="w-8 h-8">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-black text-2xl text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-500 font-[Inter,sans-serif] mb-8 leading-relaxed max-w-sm mx-auto">
              Your feedback has been received. We read every submission and use it to improve InstaRate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={handleReset} className="px-6 py-2.5 text-sm font-semibold gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity">Submit More Feedback</button>
              <button onClick={() => navigate('analyze')} className="px-6 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Rate My Instagram</button>
            </div>
          </div>
        ) : status === 'error' ? (
          <div className="bg-white rounded-3xl p-10 border border-red-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" className="w-8 h-8">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="font-black text-2xl text-gray-900 mb-2">Something Went Wrong</h2>
            <p className="text-gray-500 font-[Inter,sans-serif] mb-8 leading-relaxed">
              We couldn't send your feedback right now. Please try again in a moment.
            </p>
            <button onClick={() => setStatus('idle')} className="px-6 py-2.5 text-sm font-semibold gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity">Try Again</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              {/* Name field */}
              <div>
                <label htmlFor="fb-name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="fb-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name or username"
                  autoComplete="name"
                  className="w-full px-4 py-3 text-sm font-[Inter,sans-serif] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-shadow placeholder-gray-400"
                />
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="fb-message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Feedback <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="fb-message"
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (messageError) setMessageError('') }}
                  onBlur={validate}
                  placeholder="What did you like? What could be better? Found a bug? Let us know..."
                  rows={6}
                  required
                  aria-describedby={messageError ? 'fb-message-error' : undefined}
                  aria-invalid={!!messageError}
                  className={`w-full px-4 py-3 text-sm font-[Inter,sans-serif] bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-shadow placeholder-gray-400 resize-none ${
                    messageError ? 'border-red-300 focus:ring-red-300' : 'border-gray-200 focus:ring-purple-300 focus:border-transparent'
                  }`}
                />
                {messageError && (
                  <p id="fb-message-error" className="mt-2 text-sm text-red-500 flex items-center gap-1.5 font-[Inter,sans-serif]" role="alert">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {messageError}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-400 font-[Inter,sans-serif]">{message.length} characters — No email required. No account needed.</p>
              </div>

              {/* Privacy note */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="text-xs text-blue-700 font-[Inter,sans-serif] leading-relaxed">
                  <strong>Privacy:</strong> Your feedback is anonymous. We don't collect your email, require an account, or store unnecessary personal information.
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 text-sm font-semibold gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-pink-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* FAQ */}
        <div className="mt-12 space-y-4">
          <h2 className="font-bold text-lg text-gray-900">Common Questions</h2>
          {[
            { q: 'Do I need an account to submit feedback?', a: 'No account, no email, no sign-up — ever. InstaRate is 100% open and free.' },
            { q: 'Will you respond to my feedback?', a: 'We read every submission, but we may not be able to respond individually. High-impact suggestions get prioritized in future updates.' },
            { q: 'What kind of feedback is most useful?', a: 'Anything helps — bug reports, feature ideas, usability issues, or just telling us what you love. Be specific if you can.' },
          ].map((faq) => (
            <div key={faq.q} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="font-semibold text-gray-900 text-sm mb-1.5">{faq.q}</div>
              <p className="text-sm text-gray-500 font-[Inter,sans-serif] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer navigate={navigate} />
    </div>
  )
}

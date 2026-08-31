import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

const NAV_LINKS: { label: string; page: Page | null; scroll?: string }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Analyze', page: 'analyze' },
  { label: 'How It Works', page: 'home', scroll: 'how-it-works' },
  { label: 'Feedback', page: 'feedback' },
  { label: 'About', page: 'about' },
  { label: 'Privacy', page: 'about', scroll: 'privacy' },
]

export default function Footer({ navigate }: Props) {
  function handleLink(item: (typeof NAV_LINKS)[number]) {
    if (item.page) navigate(item.page)
    if (item.scroll) {
      setTimeout(() => {
        document.getElementById(item.scroll!)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-sm">◎</div>
              <span className="font-outfit font-bold text-lg text-gray-900">
                Insta<span className="gradient-text">Rate</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Rate your feed. Improve your vibe.
            </p>
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3 text-green-500 flex-shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Free to use · No account required
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Navigation</div>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLink(item)}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Developer credit */}
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Developed by</div>
            <div className="text-sm font-semibold text-gray-800">Renan Alburo</div>
            <a
              href="mailto:renanalburo2004@gmail.com"
              className="text-sm gradient-text hover:opacity-80 transition-opacity mt-1 inline-block"
            >
              renanalburo2004@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© 2026 InstaRate. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { navigate('about'); setTimeout(() => document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' }), 50) }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate('feedback')}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Feedback
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

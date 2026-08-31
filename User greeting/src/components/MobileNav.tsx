import type { Page } from '../App'

interface Props {
  page: Page
  navigate: (p: Page) => void
}

export default function MobileNav({ page, navigate }: Props) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
      <div className="flex items-center justify-around py-2 px-2">
        <Tab label="Home" active={page === 'analyze'} onClick={() => navigate('analyze')} icon={<HomeIcon />} />
        <Tab label="Analyze" active={false} onClick={() => navigate('analyze')} icon={<StarIcon />} gradient />
        <Tab label="Feedback" active={page === 'feedback'} onClick={() => navigate('feedback')} icon={<MessageIcon />} />
        <Tab label="About" active={page === 'about'} onClick={() => navigate('about')} icon={<AboutIcon />} />
      </div>
    </nav>
  )
}

function Tab({ label, active, onClick, icon, gradient }: { label: string; active: boolean; onClick: () => void; icon: React.ReactNode; gradient?: boolean }) {
  if (gradient) {
    return (
      <button onClick={onClick} className="flex flex-col items-center gap-1 px-2 py-1">
        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white shadow-md shadow-pink-200">
          <span className="w-5 h-5">{icon}</span>
        </div>
        <span className="text-[10px] font-semibold gradient-text">{label}</span>
      </button>
    )
  }
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 px-2 py-1">
      <span className={`w-6 h-6 ${active ? 'text-purple-600' : 'text-gray-400'}`}>{icon}</span>
      <span className={`text-[10px] font-medium ${active ? 'text-purple-600' : 'text-gray-400'}`}>{label}</span>
    </button>
  )
}

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
}
function StarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
}
function MessageIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
}
function AboutIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
}

import type { Page } from '../App'

interface Props {
  page: Page
  navigate: (p: Page) => void
}

type NavGroup = {
  items: { label: string; icon: React.ReactNode; page: Page; active: (p: Page) => boolean }[]
}

export default function Sidebar({ page, navigate }: Props) {
  const groups: NavGroup[] = [
    {
      items: [
        { label: 'Home', icon: <HomeIcon />, page: 'analyze', active: (p) => p === 'analyze' },
        { label: 'Analyze', icon: <StarIcon />, page: 'results', active: (p) => p === 'results' || p === 'detailed' },
        { label: 'History', icon: <ClockIcon />, page: 'history', active: (p) => p === 'history' },
      ],
    },
    {
      items: [
        { label: 'How It Works', icon: <InfoIcon />, page: 'home', active: () => false },
        { label: 'Feedback', icon: <MessageIcon />, page: 'feedback', active: () => false },
        { label: 'About', icon: <AboutIcon />, page: 'about', active: () => false },
      ],
    },
  ]

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <button onClick={() => navigate('analyze')} className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-sm">◎</div>
          <span className="font-outfit font-bold text-lg text-gray-900 tracking-tight">
            Insta<span className="gradient-text">Rate</span>
          </span>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-6 pt-6 border-t border-gray-100 space-y-1' : 'space-y-1'}>
            {group.items.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                active={item.active(page)}
                onClick={() => navigate(item.page)}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* CTA */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => navigate('analyze')}
          className="w-full py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm shadow-pink-200"
        >
          <span>✨</span> Rate My Instagram
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-2">Free · No account required</p>
      </div>
    </aside>
  )
}

function NavItem({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active ? 'gradient-bg text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className="w-5 h-5 flex-shrink-0">{icon}</span>
      {label}
    </button>
  )
}

function HomeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
}
function StarIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
}
function ClockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
}
function InfoIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
}
function MessageIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
}
function AboutIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
}

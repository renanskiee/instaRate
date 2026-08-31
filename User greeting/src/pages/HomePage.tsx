import { useState } from 'react'
import type { Page } from '../App'
import type { ToastType } from '../components/Toast'
import Footer from '../components/Footer'

interface Props {
  navigate: (p: Page) => void
  addToast: (message: string, type?: ToastType) => void
}

const FEED_PHOTOS = [
  'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=200&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&auto=format',
]

const CATEGORIES = [
  { label: 'Profile', score: 91, color: '#833AB4' },
  { label: 'Aesthetic', score: 86, color: '#C13584' },
  { label: 'Content', score: 89, color: '#E1306C' },
  { label: 'Consistency', score: 79, color: '#F56040' },
  { label: 'Branding', score: 90, color: '#F77737' },
]

const FEATURES = [
  { icon: '👤', title: 'Profile Optimization', desc: 'Profile picture, username, display name, bio, and overall profile completeness.' },
  { icon: '🎨', title: 'Visual Aesthetic', desc: 'Color harmony, image quality, composition, editing style, and visual identity.' },
  { icon: '📸', title: 'Content Quality', desc: 'Content variety, relevance, originality, storytelling, and presentation quality.' },
  { icon: '🧩', title: 'Consistency', desc: 'Visual style consistency, content themes, and overall feed identity over time.' },
  { icon: '💼', title: 'Personal Branding', desc: 'Niche clarity, profile identity, memorability, and personal brand strength.' },
  { icon: '✍️', title: 'Bio & Captions', desc: 'Clarity, communication, readability, storytelling, and calls-to-action.' },
]

const NAV_LINKS = [
  { label: 'Home', action: (navigate: (p: Page) => void) => navigate('home') },
  { label: 'Analyze', action: (navigate: (p: Page) => void) => navigate('analyze') },
  { label: 'How It Works', action: (_: (p: Page) => void) => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Feedback', action: (navigate: (p: Page) => void) => navigate('feedback') },
  { label: 'About', action: (navigate: (p: Page) => void) => navigate('about') },
]

export default function HomePage({ navigate, addToast: _addToast }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-outfit">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-sm">◎</div>
            <span className="font-outfit font-bold text-lg text-gray-900 tracking-tight">
              Insta<span className="gradient-text">Rate</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => l.action(navigate)} className="hover:text-gray-900 transition-colors">
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigate('analyze')}
            className="hidden md:flex px-5 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-pink-200 items-center gap-2"
          >
            <span>✨</span> Rate My Instagram
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => { l.action(navigate); setMenuOpen(false) }}
                className="block w-full text-left text-sm font-medium text-gray-700 py-2.5 border-b border-gray-50 last:border-0"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => navigate('analyze')}
              className="w-full mt-3 px-5 py-3 text-sm font-semibold text-white gradient-bg rounded-xl flex items-center justify-center gap-2"
            >
              <span>✨</span> Rate My Instagram
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span>✨</span> AI-Powered Instagram Analysis
          </div>
          <h1 className="font-outfit font-black text-5xl md:text-6xl text-gray-900 leading-[1.05] tracking-tight mb-6">
            Rate your<br /><span className="gradient-text">Instagram.</span><br />Improve your vibe.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-4 max-w-md font-[Inter,sans-serif]">
            Get an AI-powered analysis of your Instagram profile and feed. Discover what works, what doesn't, and how you can improve.
          </p>

          {/* Trust row */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Free to use', 'No account required', 'No Instagram password needed'].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-green-500 flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('analyze')}
              className="px-7 py-3.5 font-semibold text-white gradient-bg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-pink-200 flex items-center gap-2"
            >
              <span>✨</span> Rate My Instagram
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 font-semibold text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              How It Works
            </button>
          </div>
        </div>

        {/* Hero card */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/80 overflow-hidden border border-gray-100">
              <div className="p-5 flex items-center gap-4 border-b border-gray-50">
                <div className="w-14 h-14 rounded-full gradient-ring p-0.5">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=56&h=56&fit=crop&auto=format" alt="Example profile" className="w-full h-full rounded-full object-cover bg-gray-100" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">@alex.creates</div>
                  <div className="text-xs text-gray-400 mt-0.5">Lifestyle · Travel · Aesthetic</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 text-center border-b border-gray-50">
                <div className="text-5xl font-black font-outfit gradient-text">87</div>
                <div className="text-sm text-gray-400">/100</div>
                <div className="mt-1 text-sm font-semibold text-gray-700">⭐ Very Good</div>
              </div>
              <div className="p-4 space-y-2">
                {CATEGORIES.map((cat) => (
                  <div key={cat.label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-20 font-[Inter,sans-serif]">{cat.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full"><div className="h-full rounded-full" style={{ width: `${cat.score}%`, background: cat.color }} /></div>
                    <span className="text-xs font-bold text-gray-900 w-6 text-right">{cat.score}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-0.5 p-0.5">
                {FEED_PHOTOS.map((src, i) => <img key={i} src={src} alt={`Example feed post ${i + 1}`} className="aspect-square object-cover bg-gray-100" />)}
              </div>
            </div>
            <div className="absolute -left-6 top-24 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-gray-100">
              <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center text-sm">💚</div>
              <div><div className="text-xs font-bold text-gray-900">Strong Branding</div><div className="text-[10px] text-gray-400">90/100</div></div>
            </div>
            <div className="absolute -right-4 bottom-32 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-gray-100">
              <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center text-sm">✨</div>
              <div><div className="text-xs font-bold text-gray-900">AI Analysis</div><div className="text-[10px] text-gray-400">Ready in seconds</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl text-gray-900 mb-3">How InstaRate Works</h2>
            <p className="text-gray-500 font-[Inter,sans-serif]">From link to score in under a minute. No account needed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Paste Your Profile', desc: 'Enter your Instagram profile URL. No password or login required.', icon: '🔗' },
              { num: '02', title: 'Upload Screenshots', desc: 'Upload screenshots of your profile and recent feed posts for analysis.', icon: '📷' },
              { num: '03', title: 'Get Your Rating', desc: 'Our AI analyzes your profile and provides scores, explanations, and recommendations.', icon: '✨' },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <span className="font-outfit font-black text-4xl gradient-text leading-none">{step.num}</span>
                  <div>
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <h3 className="font-outfit font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-[Inter,sans-serif]">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('analyze')}
              className="px-8 py-3.5 font-semibold text-white gradient-bg rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-200 inline-flex items-center gap-2"
            >
              <span>✨</span> Start My Analysis
            </button>
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-3xl text-gray-900 mb-3">What We Analyze</h2>
            <p className="text-gray-500 font-[Inter,sans-serif]">Six dimensions of your Instagram — scored and explained by AI.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="text-2xl mb-3">{feat.icon}</div>
                <h3 className="font-outfit font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-[Inter,sans-serif]">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example AI Review */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-outfit font-bold text-3xl text-gray-900 mb-4">Your Instagram, Explained.</h2>
          <p className="text-gray-500 font-[Inter,sans-serif] mb-8">AI-generated feedback that actually helps you grow.</p>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white">✨</div>
              <div>
                <div className="font-outfit font-bold text-gray-900">AI Review · Example</div>
                <div className="text-xs text-gray-400">Based on profile analysis</div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 font-[Inter,sans-serif]">
              "Your profile creates a strong first impression because of your consistent aesthetic and clear niche. Your photos are visually strong, and your profile has a recognizable personality. Your biggest growth opportunity is improving consistency — a unified editing style would significantly elevate your grid."
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-xl p-3">
                <div className="text-xs font-bold text-green-700 mb-2">💚 Strengths</div>
                {['Strong visual identity', 'Good photo quality', 'Clear personality'].map((s) => (
                  <div key={s} className="flex items-center gap-1.5 text-xs text-green-700 font-[Inter,sans-serif] mb-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3 flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                    {s}
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <div className="text-xs font-bold text-amber-700 mb-2">⚠️ Improvements</div>
                {['Inconsistent editing', 'Unclear content theme', 'Bio needs focus'].map((s) => (
                  <div key={s} className="flex items-center gap-1.5 text-xs text-amber-700 font-[Inter,sans-serif] mb-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3 h-3 flex-shrink-0"><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('analyze')}
            className="mt-8 px-8 py-4 font-semibold text-white gradient-bg rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-200 inline-flex items-center gap-2"
          >
            <span>✨</span> Rate My Instagram — Free
          </button>
          <p className="text-xs text-gray-400 mt-3 font-[Inter,sans-serif]">No account · No password · Instant results</p>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

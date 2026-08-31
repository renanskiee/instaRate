import { useState, useEffect } from 'react'
import type { Page } from '../App'
import { saveHistoryEntry } from '../App'
import type { ToastType } from '../components/Toast'

interface Props {
  navigate: (p: Page) => void
  addToast: (message: string, type?: ToastType) => void
}

const SCORE = 87
const SCORES = [
  { label: 'Profile Optimization', score: 91, icon: '👤', color: '#833AB4' },
  { label: 'Visual Aesthetic', score: 86, icon: '🎨', color: '#C13584' },
  { label: 'Content Quality', score: 89, icon: '📸', color: '#E1306C' },
  { label: 'Consistency', score: 79, icon: '🧩', color: '#F56040' },
  { label: 'Personal Branding', score: 90, icon: '💼', color: '#F77737' },
  { label: 'Bio & Captions', score: 84, icon: '✍️', color: '#FCAF45' },
]
const FEED_PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=300&h=300&fit=crop&auto=format', score: 88 },
  { src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&h=300&fit=crop&auto=format', score: 91 },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&auto=format', score: 84 },
  { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop&auto=format', score: 92 },
  { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&auto=format', score: 86 },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&auto=format', score: 89 },
]
const STRENGTHS = [
  'Strong profile identity and memorable username',
  'Excellent photo quality and professional composition',
  'Clear and engaging personality across posts',
  'Attractive feed composition and visual flow',
  'Strong personal branding and defined niche',
]
const IMPROVEMENTS = [
  'Feed colors are slightly inconsistent across posts',
  'Content themes could be clearer and more focused',
  'Bio could communicate your niche more directly',
]
const RECOMMENDATIONS = [
  { num: '01', icon: '🎨', title: 'Unify your editing style', desc: 'Use a more consistent editing style for your next 6–9 posts to create a cohesive visual identity.' },
  { num: '02', icon: '✍️', title: 'Rewrite your bio', desc: 'Make your bio immediately communicate who you are and what you post. Lead with your niche and end with a clear call-to-action.' },
  { num: '03', icon: '🧩', title: 'Narrow your content themes', desc: 'Focus on 2–3 major content themes to build a more recognizable and followable account.' },
]

function ScoreCircle({ score, size = 160 }: { score: number; size?: number }) {
  const [animated, setAnimated] = useState(false)
  const radius = size * 0.37
  const circumference = 2 * Math.PI * radius
  const center = size / 2
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 300); return () => clearTimeout(t) }, [])
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#833AB4" /><stop offset="50%" stopColor="#C13584" /><stop offset="100%" stopColor="#F77737" />
          </linearGradient>
        </defs>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#F3F4F6" strokeWidth="12" />
        <circle cx={center} cy={center} r={radius} fill="none" stroke="url(#scoreGrad)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (animated ? (score / 100) * circumference : circumference)}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute text-center" aria-label={`Score: ${score} out of 100`}>
        <div className="font-outfit font-black text-5xl gradient-text">{score}</div>
        <div className="text-sm text-gray-400">/100</div>
      </div>
    </div>
  )
}

function ProgressBar({ score, color }: { score: number; color: string }) {
  const [width, setWidth] = useState(0)
  useEffect(() => { const t = setTimeout(() => setWidth(score), 400); return () => clearTimeout(t) }, [score])
  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
    </div>
  )
}

export default function ResultsPage({ navigate, addToast }: Props) {
  const [shareModal, setShareModal] = useState(false)
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  useEffect(() => { saveHistoryEntry(SCORE) }, [])

  async function handleShare() {
    const shareData = {
      title: 'My InstaRate Result — 87/100',
      text: `I scored 87/100 on InstaRate! ⭐ Very Good\n\nRate your feed. Improve your vibe.\n`,
      url: window.location.href,
    }
    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        addToast('Result shared!', 'success')
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setShareModal(true)
      }
    } else {
      setShareModal(true)
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
    setShareModal(false)
    addToast('Link copied to clipboard!', 'success')
  }

  function handleCopyResult() {
    const text = `InstaRate Result\n87 / 100 ⭐ VERY GOOD\n\nProfile: 91 · Aesthetic: 86 · Content: 89 · Consistency: 79 · Branding: 90 · Bio: 84\n\nRate your feed at instarate.app`
    navigator.clipboard.writeText(text).catch(() => {})
    setShareModal(false)
    addToast('Result text copied!', 'success')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 font-outfit">
      {/* Score hero */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-6 text-center">
        <h1 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 font-[Inter,sans-serif]">Your Instagram Result</h1>
        <ScoreCircle score={SCORE} size={160} />
        <div className="mt-5">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-sm font-bold px-4 py-1.5 rounded-full">⭐ VERY GOOD</div>
        </div>
        <p className="text-gray-500 text-sm mt-4 max-w-sm mx-auto font-[Inter,sans-serif] leading-relaxed">
          Your profile has a strong visual identity and good content quality, with some opportunities to improve consistency.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <button
            onClick={handleShare}
            className="px-5 py-2.5 text-sm font-semibold gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm shadow-pink-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share Result
          </button>
          <button
            onClick={() => navigate('analyze')}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.68" />
            </svg>
            Analyze Another Profile
          </button>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl text-gray-900">Score Breakdown</h2>
          <button onClick={() => navigate('detailed')} className="text-xs font-semibold gradient-text hover:opacity-80 transition-opacity">View Detailed →</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {SCORES.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate('detailed')}
              className="p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">{item.icon}</span>
                  <span className="text-sm font-semibold text-gray-700 font-[Inter,sans-serif]">{item.label}</span>
                </div>
                <span className="font-outfit font-black text-lg" style={{ color: item.color }}>
                  {item.score}<span className="text-xs text-gray-400 font-normal">/100</span>
                </span>
              </div>
              <ProgressBar score={item.score} color={item.color} />
            </button>
          ))}
        </div>
      </div>

      {/* Profile Preview */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="font-bold text-xl text-gray-900 mb-5">Instagram Profile Preview</h2>
        <div className="flex items-start gap-5 mb-4">
          <div className="w-16 h-16 rounded-full gradient-ring p-0.5 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=64&h=64&fit=crop&auto=format" alt="Analyzed profile" className="w-full h-full rounded-full object-cover bg-gray-100" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900">@alex.creates</div>
            <div className="text-sm text-gray-600 mt-0.5">Alex Moreno</div>
            <div className="text-sm text-gray-500 mt-2 font-[Inter,sans-serif] leading-relaxed">
              ✨ Lifestyle · Travel · Creative<br />🌍 Making beauty from ordinary moments
            </div>
          </div>
        </div>
        <div className="flex gap-6 border-t border-b border-gray-100 py-4 mb-5">
          {[{ label: 'Posts', value: '284' }, { label: 'Followers', value: '18.4K' }, { label: 'Following', value: '512' }].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-outfit font-black text-lg text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 font-[Inter,sans-serif]">{stat.label}</div>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Analyzed Feed</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {FEED_PHOTOS.map((post, i) => (
            <div key={i} className="relative aspect-square group overflow-hidden rounded-xl"
              onMouseEnter={() => setHoveredPost(i)} onMouseLeave={() => setHoveredPost(null)}>
              <img src={post.src} alt={`Analyzed feed post ${i + 1}`} className="w-full h-full object-cover bg-gray-100 transition-transform duration-300 group-hover:scale-105" />
              <div className={`absolute inset-0 bg-black/50 flex items-end p-2 transition-opacity rounded-xl ${hoveredPost === i ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs font-bold text-white bg-black/40 px-2 py-1 rounded-lg">Visual: {post.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feed Analysis */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="font-bold text-xl text-gray-900 mb-5">Feed Analysis</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Color Consistency', score: '8/10', note: 'Mostly cohesive, minor variation' },
            { label: 'Composition', score: '9/10', note: 'Strong framing and subject placement' },
            { label: 'Image Quality', score: '9/10', note: 'Sharp, well-lit photographs' },
            { label: 'Grid Harmony', score: '7/10', note: 'Some posts break visual flow' },
            { label: 'Editing Style', score: '9/10', note: 'Consistent tone and mood' },
            { label: 'Content Variety', score: '8/10', note: 'Good mix of themes' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 font-[Inter,sans-serif]">{item.label}</span>
                  <span className="text-sm font-black font-outfit gradient-text">{item.score}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 font-[Inter,sans-serif]">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Review */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-6 border border-purple-100 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white text-lg">✨</div>
          <h2 className="font-bold text-xl text-gray-900">AI Review</h2>
        </div>
        <h3 className="font-semibold text-gray-700 mb-2 font-[Inter,sans-serif]">Overall Impression</h3>
        <p className="text-gray-600 font-[Inter,sans-serif] leading-relaxed">
          "Your profile creates a strong first impression because of your consistent aesthetic and defined niche. Your photos are technically strong and your profile has a recognizable personality that resonates with your audience. With a few targeted improvements — particularly in editing consistency — you could significantly accelerate your growth."
        </p>
      </div>

      {/* Strengths */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="font-bold text-xl text-gray-900 mb-5">💚 What You're Doing Well</h2>
        <ul className="space-y-3">
          {STRENGTHS.map((s) => (
            <li key={s} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <span className="text-sm text-gray-700 font-[Inter,sans-serif]">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="font-bold text-xl text-gray-900 mb-5">⚠️ What You Can Improve</h2>
        <ul className="space-y-3">
          {IMPROVEMENTS.map((s) => (
            <li key={s} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3"><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              </div>
              <span className="text-sm text-gray-700 font-[Inter,sans-serif]">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="font-bold text-xl text-gray-900 mb-5">🤖 AI Recommendations</h2>
        <div className="space-y-4">
          {RECOMMENDATIONS.map((rec) => (
            <div key={rec.num} className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all">
              <div className="gradient-bg text-white font-outfit font-black text-sm w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">{rec.num}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span aria-hidden="true">{rec.icon}</span>
                  <span className="font-semibold text-gray-900 text-sm">{rec.title}</span>
                </div>
                <p className="text-sm text-gray-500 font-[Inter,sans-serif] leading-relaxed">{rec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 text-center border border-purple-100">
        <div className="text-2xl mb-2">✨</div>
        <div className="font-bold text-gray-900 mb-1">Analyze Another Profile</div>
        <p className="text-sm text-gray-500 mb-4 font-[Inter,sans-serif]">Rate a friend's profile or try with different screenshots.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('analyze')} className="px-6 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-pink-200">
            ✨ Analyze Another Profile
          </button>
          <button onClick={() => navigate('feedback')} className="px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Leave Feedback
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShareModal(false)} role="dialog" aria-modal="true" aria-label="Share your result">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-xl text-gray-900 mb-1 text-center">Share Your InstaRate Result</h3>
            <p className="text-sm text-gray-500 text-center mb-6 font-[Inter,sans-serif]">Let others know how your Instagram rates!</p>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center mb-6 border border-purple-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-[Inter,sans-serif]">INSTARATE</div>
              <div className="font-outfit font-black text-5xl gradient-text">{SCORE}</div>
              <div className="text-sm text-gray-400">/100</div>
              <div className="text-sm font-bold text-gray-700 mt-1">⭐ Very Good</div>
              <div className="text-xs text-gray-400 mt-3 font-[Inter,sans-serif] italic">"Rate your feed. Improve your vibe."</div>
            </div>
            <div className="space-y-2">
              <button onClick={handleCopyResult} className="w-full py-2.5 text-sm font-semibold gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity">Copy Result</button>
              <button onClick={handleCopyLink} className="w-full py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Copy Link</button>
              <button onClick={() => setShareModal(false)} className="w-full py-2.5 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

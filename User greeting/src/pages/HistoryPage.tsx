import { useState, useEffect } from 'react'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

interface HistoryEntry {
  id: number
  date: string
  score: number
  timestamp: number
}

function getRating(score: number): { label: string; emoji: string } {
  if (score >= 90) return { label: 'Excellent', emoji: '🏆' }
  if (score >= 80) return { label: 'Very Good', emoji: '⭐' }
  if (score >= 70) return { label: 'Good', emoji: '👍' }
  return { label: 'Needs Work', emoji: '💪' }
}

function MiniChart({ scores }: { scores: number[] }) {
  if (scores.length < 2) return null

  const width = 360
  const height = 100
  const padding = 24
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const min = Math.max(0, Math.min(...scores) - 8)
  const max = Math.min(100, Math.max(...scores) + 8)
  const range = max - min

  const points = scores.map((val, i) => ({
    x: padding + (i / (scores.length - 1)) * chartWidth,
    y: padding + chartHeight - ((val - min) / range) * chartHeight,
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="cGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#833AB4" />
          <stop offset="100%" stopColor="#F77737" />
        </linearGradient>
        <linearGradient id="aGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C13584" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C13584" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#aGrad)" />
      <path d={pathD} fill="none" stroke="url(#cGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4.5" fill="white" stroke="url(#cGrad)" strokeWidth="2.5" />
          <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill="#111827">{scores[i]}</text>
        </g>
      ))}
    </svg>
  )
}

export default function HistoryPage({ navigate }: Props) {
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('instarate_history')
      if (raw) setEntries(JSON.parse(raw))
    } catch {}
  }, [])

  function clearHistory() {
    localStorage.removeItem('instarate_history')
    setEntries([])
  }

  const scores = [...entries].reverse().map((e) => e.score)
  const latest = entries[0]
  const oldest = entries[entries.length - 1]
  const improvement = entries.length > 1 ? latest.score - oldest.score : null

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-outfit">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-black text-3xl text-gray-900 mb-2">Recent Analyses</h1>
          <p className="text-gray-500 font-normal font-[Inter,sans-serif]">
            Stored in your browser — no account needed.
          </p>
        </div>
        {entries.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors mt-1"
          >
            Clear History
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="font-bold text-gray-900 mb-2">No analyses yet</h2>
          <p className="text-sm text-gray-400 mb-6 font-[Inter,sans-serif]">
            Your analysis history will appear here after you rate your first Instagram profile.
          </p>
          <button
            onClick={() => navigate('analyze')}
            className="px-6 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-pink-200"
          >
            ✨ Rate My Instagram
          </button>
        </div>
      ) : (
        <>
          {/* Trend chart */}
          {entries.length > 1 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-gray-900">Score Over Time</h2>
                {improvement !== null && (
                  <div className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${improvement >= 0 ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                      {improvement >= 0
                        ? <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>
                        : <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></>
                      }
                    </svg>
                    {improvement >= 0 ? '+' : ''}{improvement} pts
                  </div>
                )}
              </div>
              <MiniChart scores={scores} />
            </div>
          )}

          {/* History list */}
          <div className="space-y-4">
            {entries.map((entry, i) => {
              const { label, emoji } = getRating(entry.score)
              return (
                <div key={entry.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-xs text-gray-400 font-[Inter,sans-serif] mb-1">{entry.date}</div>
                        <div className="flex items-center gap-2">
                          <span className="font-outfit font-black text-3xl gradient-text">{entry.score}</span>
                          <span className="text-sm text-gray-400">/100</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-600 mt-0.5">{emoji} {label}</div>
                      </div>
                      {i === 0 && (
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Latest
                        </span>
                      )}
                    </div>

                    {/* Score bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                        <span className="font-[Inter,sans-serif]">Overall score</span>
                        <span className="font-bold text-gray-700">{entry.score}/100</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full gradient-bg"
                          style={{ width: `${entry.score}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('results')}
                      className="w-full py-2.5 text-sm font-semibold gradient-text border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      View Result →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Rate again CTA */}
          <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100">
            <div className="text-2xl mb-2">✨</div>
            <div className="font-bold text-gray-900 mb-1">Ready for another analysis?</div>
            <p className="text-sm text-gray-500 mb-4 font-[Inter,sans-serif]">
              Keep tracking your progress and watch your score grow.
            </p>
            <button
              onClick={() => navigate('analyze')}
              className="px-6 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-pink-200"
            >
              Rate Another Profile
            </button>
          </div>
        </>
      )}
    </div>
  )
}

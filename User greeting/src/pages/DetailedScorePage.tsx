import { useState } from 'react'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

const CATEGORIES = [
  {
    icon: '👤',
    title: 'Profile Optimization',
    score: 91,
    color: '#833AB4',
    subs: [
      { label: 'Profile Picture Quality', score: 9.5, max: 10 },
      { label: 'Username Clarity', score: 9, max: 10 },
      { label: 'Highlights Covers', score: 8.5, max: 10 },
      { label: 'Link in Bio', score: 9, max: 10 },
      { label: 'Profile Completeness', score: 9.5, max: 10 },
    ],
    why: 'Your profile makes an immediate strong impression. Your profile picture is high quality, your username is memorable, and your highlights are well-organized.',
    improve: 'Consider adding a link-in-bio tool to maximize your CTA and track clicks from your profile.',
  },
  {
    icon: '🎨',
    title: 'Visual Aesthetic',
    score: 86,
    color: '#C13584',
    subs: [
      { label: 'Color Consistency', score: 8, max: 10 },
      { label: 'Composition', score: 9, max: 10 },
      { label: 'Image Quality', score: 9, max: 10 },
      { label: 'Grid Harmony', score: 7, max: 10 },
      { label: 'Editing Style', score: 9, max: 10 },
    ],
    why: "Your individual photos are strong, but your overall feed uses several different visual styles. This creates a somewhat inconsistent grid when viewed as a whole.",
    improve: 'Pick one preset or editing style and apply it consistently to all your posts going forward.',
  },
  {
    icon: '📸',
    title: 'Content Quality',
    score: 89,
    color: '#E1306C',
    subs: [
      { label: 'Photo Sharpness', score: 9.5, max: 10 },
      { label: 'Lighting', score: 9, max: 10 },
      { label: 'Subject Clarity', score: 9, max: 10 },
      { label: 'Originality', score: 8.5, max: 10 },
      { label: 'Storytelling', score: 8, max: 10 },
    ],
    why: 'Your content is technically excellent. Photos are sharp, well-lit, and professionally composed. Storytelling through captions could be stronger.',
    improve: 'Add more context and story to your captions to deepen engagement and build connection with followers.',
  },
  {
    icon: '🧩',
    title: 'Consistency',
    score: 79,
    color: '#F56040',
    subs: [
      { label: 'Posting Frequency', score: 7.5, max: 10 },
      { label: 'Theme Coherence', score: 7.5, max: 10 },
      { label: 'Color Palette', score: 8, max: 10 },
      { label: 'Content Variety', score: 8.5, max: 10 },
      { label: 'Brand Consistency', score: 7.5, max: 10 },
    ],
    why: 'Consistency is your biggest growth opportunity. While your individual posts are strong, there are visible gaps in posting frequency and theme coherence.',
    improve: 'Create a content calendar and aim for a minimum of 4 posts per week with a clear recurring theme.',
  },
  {
    icon: '💼',
    title: 'Personal Branding',
    score: 90,
    color: '#F77737',
    subs: [
      { label: 'Niche Clarity', score: 9, max: 10 },
      { label: 'Voice & Tone', score: 9.5, max: 10 },
      { label: 'Value Proposition', score: 8.5, max: 10 },
      { label: 'Audience Connection', score: 9, max: 10 },
      { label: 'Uniqueness', score: 9, max: 10 },
    ],
    why: 'You have a strong, recognizable personal brand. Your unique perspective and voice come through clearly in every post.',
    improve: 'Strengthen your value proposition in your bio to immediately communicate why someone should follow you.',
  },
  {
    icon: '✍️',
    title: 'Bio & Captions',
    score: 84,
    color: '#FCAF45',
    subs: [
      { label: 'Bio Clarity', score: 8, max: 10 },
      { label: 'Call to Action', score: 7.5, max: 10 },
      { label: 'Caption Length', score: 9, max: 10 },
      { label: 'Hashtag Usage', score: 8.5, max: 10 },
      { label: 'Engagement Hooks', score: 8, max: 10 },
    ],
    why: 'Your captions are engaging and appropriately sized. Your bio is good but could more directly communicate your niche and invite new followers to take action.',
    improve: "Start captions with a hook sentence and end with a question or CTA to boost comment engagement.",
  },
]

export default function DetailedScorePage({ navigate }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-outfit">
      <div className="mb-8">
        <button
          onClick={() => navigate('results')}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-4 font-[Inter,sans-serif]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Results
        </button>
        <h1 className="font-black text-3xl text-gray-900 mb-2">Detailed Analysis</h1>
        <p className="text-gray-500 font-normal font-[Inter,sans-serif]">
          Deep dive into every dimension of your Instagram score.
        </p>
      </div>

      <div className="space-y-4">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.title}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50/50 transition-colors"
            >
              <span className="text-xl">{cat.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-gray-900">{cat.title}</div>
                <div className="text-xs text-gray-400 font-[Inter,sans-serif] mt-0.5">
                  {cat.subs.length} sub-categories analyzed
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-outfit font-black text-xl" style={{ color: cat.color }}>
                  {cat.score}
                  <span className="text-xs text-gray-400 font-normal">/100</span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`w-4 h-4 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {expanded === i && (
              <div className="px-6 pb-6 border-t border-gray-100">
                {/* Sub-scores */}
                <div className="space-y-3 mt-5">
                  {cat.subs.map((sub) => (
                    <div key={sub.label} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 font-[Inter,sans-serif] w-36 flex-shrink-0">{sub.label}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(sub.score / sub.max) * 100}%`, backgroundColor: cat.color }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-10 text-right">
                        {sub.score}/{sub.max}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Why section */}
                <div className="mt-5 p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Why This Score?</div>
                  <p className="text-sm text-gray-700 font-[Inter,sans-serif] leading-relaxed">{cat.why}</p>
                </div>

                {/* How to improve */}
                <div className="mt-3 p-4 rounded-xl" style={{ backgroundColor: `${cat.color}10` }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: cat.color }}>
                    How to Improve
                  </div>
                  <p className="text-sm text-gray-700 font-[Inter,sans-serif] leading-relaxed">{cat.improve}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

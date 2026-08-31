import { useEffect, useState } from 'react'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

const STEPS = [
  { label: 'Profile detected', delay: 0 },
  { label: 'Profile screenshot processed', delay: 900 },
  { label: 'Feed analyzed', delay: 1900 },
  { label: 'Evaluating visual aesthetic', delay: 3000 },
  { label: 'Checking consistency', delay: 4200 },
  { label: 'Evaluating branding', delay: 5400 },
  { label: 'Generating recommendations', delay: 6400 },
]

const REDIRECT_DELAY = 7600

export default function AnalyzingPage({ navigate }: Props) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [activeStep, setActiveStep] = useState(0)
  const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (error) return

    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((step, i) => {
      timers.push(
        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, i])
          setActiveStep(i + 1)
          setProgress(Math.round(((i + 1) / STEPS.length) * 100))
        }, step.delay + 700)
      )
    })

    timers.push(setTimeout(() => navigate('results'), REDIRECT_DELAY))

    return () => timers.forEach(clearTimeout)
  }, [navigate, error])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center px-6 font-outfit text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" className="w-10 h-10">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="font-black text-2xl text-gray-900 mb-2">We couldn't complete the analysis.</h1>
        <p className="text-gray-500 font-[Inter,sans-serif] mb-8 max-w-sm">
          Something went wrong while analyzing your profile. This may be a temporary issue. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { setError(false); setCompletedSteps([]); setActiveStep(0); setProgress(0) }}
            className="px-6 py-3 text-sm font-semibold text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('analyze')}
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back to Analyzer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center px-6 font-outfit">
      {/* Animated loader */}
      <div className="relative mb-10">
        <div
          className="w-32 h-32 rounded-full animate-spin-slow"
          style={{ background: 'conic-gradient(from 0deg, #833AB4, #C13584, #E1306C, #F56040, #F77737, #833AB4)', padding: '4px' }}
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full animate-spin-reverse"
              style={{ background: 'conic-gradient(from 180deg, #833AB4, #C13584, #E1306C, #F77737)', padding: '3px' }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="font-black text-3xl text-gray-900 mb-2 text-center">Analyzing Your Instagram</h1>
      <p className="text-gray-500 text-center mb-4 font-[Inter,sans-serif] max-w-xs">
        Our AI is reviewing your profile, feed, and visual identity.
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-8">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5 font-[Inter,sans-serif]">
          <span>Analysis progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full gradient-bg transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="w-full max-w-sm space-y-2.5">
        {STEPS.map((step, i) => {
          const done = completedSteps.includes(i)
          const active = activeStep === i && !done
          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 ${
                done ? 'bg-white shadow-sm' : active ? 'bg-white/60' : 'bg-transparent'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  done ? 'gradient-bg' : active ? 'border-2 border-purple-400 bg-purple-50' : 'border-2 border-gray-200 bg-white'
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" className="w-3.5 h-3.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : active ? (
                  <div className="w-2 h-2 rounded-full gradient-bg animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                )}
              </div>
              <span className={`text-sm font-medium font-[Inter,sans-serif] transition-colors ${done ? 'text-gray-900' : active ? 'text-purple-700' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 mt-8 font-[Inter,sans-serif]">This may take a few moments.</p>
    </div>
  )
}

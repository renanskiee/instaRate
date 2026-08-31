import type { Page } from '../App'
import Footer from '../components/Footer'

interface Props {
  navigate: (p: Page) => void
}

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '🔗',
    title: 'Submit your profile URL',
    desc: 'Paste your public Instagram profile URL — just your username, no password, no login. Optionally upload screenshots of your profile and feed.',
  },
  {
    step: '02',
    icon: '🤖',
    title: 'AI analyzes your profile',
    desc: 'Our AI evaluates six key dimensions: profile optimization, visual aesthetic, content quality, consistency, personal branding, and bio & captions.',
  },
  {
    step: '03',
    icon: '📊',
    title: 'Get your detailed results',
    desc: 'Receive a score from 0–100 with category breakdowns, AI-written insights, and specific recommendations to improve your Instagram presence.',
  },
]

const WHAT_WE_ANALYZE = [
  { icon: '👤', title: 'Profile Optimization', desc: 'Username clarity, profile photo quality, bio effectiveness, and discoverability signals.' },
  { icon: '🎨', title: 'Visual Aesthetic', desc: 'Overall feed appearance, color harmony, editing consistency, and first-impression visual appeal.' },
  { icon: '📸', title: 'Content Quality', desc: 'Photo and video technical quality, composition, lighting, and creative execution.' },
  { icon: '🧩', title: 'Consistency', desc: 'Content frequency, posting cadence, style consistency, and thematic coherence across posts.' },
  { icon: '💼', title: 'Personal Branding', desc: 'Niche clarity, unique value proposition, audience targeting, and brand voice.' },
  { icon: '✍️', title: 'Bio & Captions', desc: 'Bio copywriting, caption quality, use of hashtags, calls-to-action, and storytelling.' },
]

const FAQS = [
  {
    q: 'Is InstaRate free to use?',
    a: 'Yes — completely free. No account required, no subscription, no hidden fees.',
  },
  {
    q: 'Do you need my Instagram password?',
    a: 'Never. InstaRate only analyzes your public profile URL and any screenshots you choose to upload. We never ask for credentials.',
  },
  {
    q: 'How accurate is the AI rating?',
    a: 'InstaRate provides AI-powered analysis based on visual and content signals. Results are a guide for improvement, not a definitive judgment. Different audiences value different things — use the score as a starting point.',
  },
  {
    q: 'Do you store my screenshots or data?',
    a: 'Screenshots are used only for analysis and are not permanently stored. Your analysis history is saved locally in your browser and never sent to our servers.',
  },
  {
    q: 'Can I analyze private profiles?',
    a: "InstaRate analyzes publicly accessible information only. Private profiles can't be fully analyzed — only what's visible publicly.",
  },
  {
    q: 'How can I get a better score?',
    a: 'Follow the AI recommendations in your results. Focus on visual consistency, a clear niche, quality photography, and an optimized bio.',
  },
]

export default function AboutPage({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-white font-outfit flex flex-col">
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
              { label: 'Feedback', page: 'feedback' as Page },
            ].map(({ label, page }) => (
              <button key={label} onClick={() => navigate(page)} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">{label}</button>
            ))}
          </nav>
          <button onClick={() => navigate('analyze')} className="hidden md:flex items-center gap-1.5 text-sm font-semibold gradient-bg text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-pink-200">
            ✨ Rate My Instagram
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 gradient-bg rounded-3xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-xl shadow-pink-200">IR</div>
            <h1 className="font-black text-5xl text-gray-900 mb-4 leading-tight">
              About <span className="gradient-text">InstaRate</span>
            </h1>
            <p className="text-xl text-gray-500 font-[Inter,sans-serif] leading-relaxed max-w-2xl mx-auto">
              A free, open AI tool that helps creators, influencers, and everyday users understand and improve their Instagram presence — no account required.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3 font-[Inter,sans-serif]">Our Mission</div>
              <h2 className="font-black text-3xl text-gray-900 mb-4">Democratize Instagram insights</h2>
              <p className="text-gray-500 font-[Inter,sans-serif] leading-relaxed mb-4">
                Professional Instagram coaching and analytics tools are expensive and out of reach for most creators. InstaRate changes that — giving everyone access to meaningful, actionable feedback on their profile for free.
              </p>
              <p className="text-gray-500 font-[Inter,sans-serif] leading-relaxed">
                We built InstaRate because every creator deserves to know what's working, what isn't, and how to grow — without barriers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'Free', label: 'Always free to use' },
                { value: '0', label: 'Data sold to third parties' },
                { value: '6', label: 'Dimensions analyzed' },
                { value: '∞', label: 'Analyses allowed' },
              ].map((stat) => (
                <div key={stat.label} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100 text-center">
                  <div className="font-outfit font-black text-3xl gradient-text">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1 font-[Inter,sans-serif] leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3 font-[Inter,sans-serif]">How It Works</div>
              <h2 className="font-black text-3xl text-gray-900">Three steps to your Instagram score</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 gradient-bg rounded-xl flex items-center justify-center text-white font-black text-xs">{step.step}</div>
                    <span className="text-2xl" aria-hidden="true">{step.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 font-[Inter,sans-serif] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button onClick={() => navigate('analyze')} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold gradient-bg text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm shadow-pink-200">
                ✨ Try It Now — Free
              </button>
            </div>
          </div>
        </section>

        {/* What We Analyze */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3 font-[Inter,sans-serif]">The Rating System</div>
            <h2 className="font-black text-3xl text-gray-900">What we analyze</h2>
            <p className="text-gray-500 mt-3 font-[Inter,sans-serif]">Six dimensions, each scored 0–100 and weighted equally in your final score.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHAT_WE_ANALYZE.map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-sm transition-all">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-[Inter,sans-serif] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className="w-7 h-7" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3 font-[Inter,sans-serif]">Privacy</div>
              <h2 className="font-black text-3xl text-gray-900">Your privacy matters</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🔒', title: 'No password ever', desc: 'We never ask for your Instagram password. Only a public profile URL is needed.' },
                { icon: '📵', title: 'No account required', desc: 'No sign-up, no email, no login — InstaRate is fully open and anonymous.' },
                { icon: '🗑️', title: 'No data selling', desc: 'We do not sell or share your data with third parties. Ever.' },
                { icon: '💾', title: 'Local history only', desc: 'Your analysis history is stored in your browser\'s localStorage — never on our servers.' },
                { icon: '🖼️', title: 'Screenshots not stored', desc: 'Uploaded screenshots are used for analysis only and are not permanently stored.' },
                { icon: '🔍', title: 'Public data only', desc: 'InstaRate only accesses publicly available Instagram information — nothing private.' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-blue-100 flex gap-4">
                  <span className="text-xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900 mb-1 text-sm">{item.title}</div>
                    <p className="text-xs text-gray-500 font-[Inter,sans-serif] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3 font-[Inter,sans-serif]">FAQ</div>
            <h2 className="font-black text-3xl text-gray-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 font-[Inter,sans-serif] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black text-4xl text-white mb-4">Ready to rate your Instagram?</h2>
            <p className="text-white/80 font-[Inter,sans-serif] mb-8 text-lg">Free · No account required · Takes under a minute</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate('analyze')} className="px-8 py-3.5 text-sm font-semibold bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                ✨ Rate My Instagram
              </button>
              <button onClick={() => navigate('feedback')} className="px-8 py-3.5 text-sm font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors">
                Give Feedback
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer navigate={navigate} />
    </div>
  )
}

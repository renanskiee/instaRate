import { useState } from 'react'
import type { ToastType } from '../components/Toast'

interface Props {
  addToast: (message: string, type?: ToastType) => void
}

const SECTIONS = [
  {
    id: 'account',
    icon: '👤',
    label: 'Account',
    items: ['Username & Email', 'Change Password', 'Connected Accounts'],
  },
  {
    id: 'notifications',
    icon: '🔔',
    label: 'Notifications',
    items: ['Email Notifications', 'Push Notifications', 'Weekly Digest'],
  },
  {
    id: 'privacy',
    icon: '🔒',
    label: 'Privacy',
    items: ['Data Usage', 'Delete History', 'Export Data'],
  },
  {
    id: 'appearance',
    icon: '🎨',
    label: 'Appearance',
    items: ['Theme', 'Language', 'Display Preferences'],
  },
]

export default function SettingsPage({ addToast }: Props) {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    digest: true,
  })

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-outfit">
      <div className="mb-8">
        <h1 className="font-black text-3xl text-gray-900 mb-2">Profile & Settings</h1>
        <p className="text-gray-500 font-normal font-[Inter,sans-serif]">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full gradient-ring p-0.5">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=80&h=80&fit=crop&auto=format"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 gradient-bg rounded-full flex items-center justify-center text-white shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 text-lg">Alex Moreno</div>
            <div className="text-sm text-purple-600 font-medium">@alex.creates</div>
            <div className="text-sm text-gray-400 mt-0.5 font-[Inter,sans-serif]">alex@example.com</div>
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full">Free Plan</span>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-outfit font-black text-xl gradient-text">87</div>
            <div className="text-xs text-gray-400 font-[Inter,sans-serif]">Best Score</div>
          </div>
          <div>
            <div className="font-outfit font-black text-xl text-gray-900">3</div>
            <div className="text-xs text-gray-400 font-[Inter,sans-serif]">Analyses</div>
          </div>
          <div>
            <div className="font-outfit font-black text-xl text-green-600">+11</div>
            <div className="text-xs text-gray-400 font-[Inter,sans-serif]">Score Growth</div>
          </div>
        </div>
      </div>

      {/* Appearance — Dark Mode */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'appearance' ? null : 'appearance')}
          className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors"
        >
          <span className="text-lg">🎨</span>
          <span className="font-semibold text-gray-900 flex-1 text-left">Appearance</span>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`w-4 h-4 text-gray-400 transition-transform ${activeSection === 'appearance' ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {activeSection === 'appearance' && (
          <div className="px-6 pb-5 border-t border-gray-100 space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Dark Mode</div>
                <div className="text-xs text-gray-400 font-[Inter,sans-serif]">Switch between light and dark theme</div>
              </div>
              <button
                onClick={() => { setDarkMode(!darkMode); addToast(darkMode ? 'Light mode enabled' : 'Dark mode enabled', 'info') }}
                className={`w-11 h-6 rounded-full relative transition-colors ${darkMode ? 'gradient-bg' : 'bg-gray-200'}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Language</div>
                <div className="text-xs text-gray-400 font-[Inter,sans-serif]">English (US)</div>
              </div>
              <button className="text-xs text-purple-600 font-semibold">Change</button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'notifications' ? null : 'notifications')}
          className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors"
        >
          <span className="text-lg">🔔</span>
          <span className="font-semibold text-gray-900 flex-1 text-left">Notifications</span>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`w-4 h-4 text-gray-400 transition-transform ${activeSection === 'notifications' ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {activeSection === 'notifications' && (
          <div className="px-6 pb-5 border-t border-gray-100 space-y-4 pt-4">
            {[
              { key: 'email' as const, label: 'Email Notifications', desc: 'Get updates via email' },
              { key: 'push' as const, label: 'Push Notifications', desc: 'Receive browser push alerts' },
              { key: 'digest' as const, label: 'Weekly Digest', desc: 'A summary of your progress each week' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{label}</div>
                  <div className="text-xs text-gray-400 font-[Inter,sans-serif]">{desc}</div>
                </div>
                <button
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className={`w-11 h-6 rounded-full relative transition-colors ${notifications[key] ? 'gradient-bg' : 'bg-gray-200'}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications[key] ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'privacy' ? null : 'privacy')}
          className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors"
        >
          <span className="text-lg">🔒</span>
          <span className="font-semibold text-gray-900 flex-1 text-left">Privacy</span>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`w-4 h-4 text-gray-400 transition-transform ${activeSection === 'privacy' ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {activeSection === 'privacy' && (
          <div className="px-6 pb-5 border-t border-gray-100 pt-4 space-y-3">
            {['View Privacy Policy', 'Delete Analysis History', 'Export My Data'].map((item) => (
              <button
                key={item}
                className="w-full text-left text-sm font-[Inter,sans-serif] text-gray-700 py-2 hover:text-purple-600 transition-colors flex items-center justify-between"
              >
                {item}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
        <button
          onClick={() => setActiveSection(activeSection === 'account' ? null : 'account')}
          className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors"
        >
          <span className="text-lg">👤</span>
          <span className="font-semibold text-gray-900 flex-1 text-left">Account</span>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`w-4 h-4 text-gray-400 transition-transform ${activeSection === 'account' ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {activeSection === 'account' && (
          <div className="px-6 pb-5 border-t border-gray-100 pt-4 space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider font-[Inter,sans-serif]">Username</label>
              <input
                defaultValue="@alex.creates"
                className="w-full mt-1.5 px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 font-[Inter,sans-serif]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider font-[Inter,sans-serif]">Email</label>
              <input
                defaultValue="alex@example.com"
                className="w-full mt-1.5 px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 font-[Inter,sans-serif]"
              />
            </div>
            <button
              onClick={() => addToast('Profile updated successfully', 'success')}
              className="px-5 py-2 text-sm font-semibold text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Sign Out */}
      <button className="w-full py-3.5 text-sm font-semibold text-red-500 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sign Out
      </button>
    </div>
  )
}

import { useState, useRef } from 'react'
import type { Page } from '../App'
import type { ToastType } from '../components/Toast'

interface Props {
  navigate: (p: Page) => void
  addToast: (message: string, type?: ToastType) => void
}

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15 MB

function validateInstagramUrl(url: string): string | null {
  if (!url.trim()) return 'Instagram profile URL is required.'
  const pattern = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}\/?(\?.*)?$/i
  if (!pattern.test(url.trim())) {
    return 'Please enter a valid Instagram profile URL (e.g. instagram.com/username).'
  }
  return null
}

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Unsupported file type "${file.name}". Please upload PNG, JPG, or WEBP.`
  }
  if (file.size > MAX_FILE_SIZE) {
    return `"${file.name}" is too large. Maximum file size is 15 MB.`
  }
  return null
}

export default function AnalyzePage({ navigate, addToast }: Props) {
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState<string | null>(null)
  const [urlTouched, setUrlTouched] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [feedImages, setFeedImages] = useState<string[]>([])
  const [feedError, setFeedError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<'profile' | 'feed' | null>(null)
  const [loading, setLoading] = useState(false)

  const profileRef = useRef<HTMLInputElement>(null)
  const feedRef = useRef<HTMLInputElement>(null)

  function handleUrlChange(value: string) {
    setUrl(value)
    if (urlTouched) setUrlError(validateInstagramUrl(value))
  }

  function handleUrlBlur() {
    setUrlTouched(true)
    setUrlError(validateInstagramUrl(url))
  }

  function handleProfileFile(file: File) {
    const err = validateFile(file)
    if (err) { setProfileError(err); addToast(err, 'error'); return }
    setProfileError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string)
      addToast('Profile screenshot uploaded', 'success')
    }
    reader.readAsDataURL(file)
  }

  function handleFeedFiles(files: FileList | File[]) {
    const arr = Array.from(files)
    const errors: string[] = []
    const valid: File[] = []
    arr.forEach((f) => {
      const err = validateFile(f)
      if (err) errors.push(err)
      else valid.push(f)
    })
    if (errors.length) {
      const msg = errors[0]
      setFeedError(msg)
      addToast(msg, 'error')
    } else {
      setFeedError(null)
    }
    valid.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => setFeedImages((prev) => [...prev, e.target?.result as string])
      reader.readAsDataURL(file)
    })
    if (valid.length) addToast(`${valid.length} feed screenshot${valid.length > 1 ? 's' : ''} added`, 'success')
  }

  function removeProfileImage() {
    setProfileImage(null)
    if (profileRef.current) profileRef.current.value = ''
  }

  function removeFeedImage(index: number) {
    setFeedImages((prev) => prev.filter((_, i) => i !== index))
  }

  function handleAnalyze() {
    setUrlTouched(true)
    const urlErr = validateInstagramUrl(url)
    setUrlError(urlErr)
    if (urlErr) { addToast('Please fix the errors before analyzing.', 'error'); return }
    if (!profileImage && feedImages.length === 0) {
      setFeedError('Please upload at least one screenshot to analyze.')
      addToast('Please upload at least one screenshot.', 'error')
      return
    }
    setLoading(true)
    addToast('Starting AI analysis...', 'info')
    setTimeout(() => navigate('analyzing'), 500)
  }

  const hasContent = profileImage || feedImages.length > 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-outfit">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-black text-3xl text-gray-900 mb-2">Rate Your Instagram</h1>
        <p className="text-gray-500 font-normal font-[Inter,sans-serif] leading-relaxed">
          Paste your profile link and upload screenshots of your Instagram profile and feed.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          {['No account required', 'No Instagram password', 'Free to use'].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-green-500 flex-shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* URL */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <label htmlFor="ig-url" className="block font-bold text-gray-900 mb-1">
            Instagram Profile URL <span className="text-red-400">*</span>
          </label>
          <p className="text-xs text-gray-400 mb-3 font-[Inter,sans-serif]">Only your public profile URL is needed — never your password.</p>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </span>
            <input
              id="ig-url"
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              onBlur={handleUrlBlur}
              placeholder="https://instagram.com/username"
              aria-invalid={!!urlError}
              aria-describedby={urlError ? 'url-error' : undefined}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-[Inter,sans-serif] focus:outline-none focus:ring-2 placeholder:text-gray-400 transition-all ${
                urlError
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-gray-200 focus:ring-purple-300 focus:border-transparent'
              }`}
            />
          </div>
          {urlError && (
            <p id="url-error" role="alert" className="text-xs text-red-500 mt-2 flex items-center gap-1.5 font-[Inter,sans-serif]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {urlError}
            </p>
          )}
        </div>

        {/* Profile Screenshot */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-start justify-between mb-1">
            <label className="font-bold text-gray-900">Profile Screenshot</label>
            {profileImage && (
              <button onClick={() => profileRef.current?.click()} className="text-xs font-semibold gradient-text hover:opacity-80 transition-opacity">
                Replace
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400 mb-4 font-[Inter,sans-serif]">
            Upload a screenshot showing your Instagram profile. Supported: PNG, JPG, WEBP · Max 15 MB
          </p>

          {profileImage ? (
            <div className="relative rounded-xl overflow-hidden">
              <img src={profileImage} alt="Profile screenshot preview" className="w-full max-h-56 object-cover" />
              <button
                onClick={removeProfileImage}
                aria-label="Remove profile screenshot"
                className="absolute top-3 right-3 w-8 h-8 bg-gray-900/70 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload profile screenshot"
              onClick={() => profileRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && profileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver('profile') }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(null)
                const file = e.dataTransfer.files[0]
                if (file) handleProfileFile(file)
              }}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                dragOver === 'profile' ? 'border-pink-400 bg-pink-50/50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/20'
              }`}
            >
              <div className="text-4xl mb-3">📷</div>
              <div className="font-semibold text-gray-900 mb-1">Upload Profile Screenshot</div>
              <div className="text-xs text-gray-400 mb-4 font-[Inter,sans-serif]">Drag & drop or click to choose</div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); profileRef.current?.click() }}
                className="px-5 py-2 text-sm font-semibold text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity"
              >
                Choose Image
              </button>
            </div>
          )}
          {profileError && (
            <p role="alert" className="text-xs text-red-500 mt-2 flex items-center gap-1.5 font-[Inter,sans-serif]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {profileError}
            </p>
          )}
          <input ref={profileRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && handleProfileFile(e.target.files[0])} />
        </div>

        {/* Feed Screenshots */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <label className="block font-bold text-gray-900 mb-1">Feed Screenshots</label>
          <p className="text-xs text-gray-400 mb-4 font-[Inter,sans-serif]">
            Upload screenshots showing your recent Instagram posts. Multiple images supported · Max 15 MB each
          </p>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver('feed') }}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => { e.preventDefault(); setDragOver(null); handleFeedFiles(e.dataTransfer.files) }}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragOver === 'feed' ? 'border-pink-400 bg-pink-50/50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/20'
            }`}
          >
            <div className="text-4xl mb-3">🖼️</div>
            <div className="font-semibold text-gray-900 mb-1">Upload Feed Screenshots</div>
            <div className="text-xs text-gray-400 mb-4 font-[Inter,sans-serif]">Drag & drop or click to add screenshots of your posts</div>
            <button
              type="button"
              onClick={() => feedRef.current?.click()}
              className="px-5 py-2 text-sm font-semibold gradient-text gradient-ring rounded-xl hover:bg-purple-50/50 transition-colors"
            >
              + Add Feed Screenshots
            </button>
          </div>

          {feedImages.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-2">
                {feedImages.map((src, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img src={src} alt={`Feed screenshot ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <button
                        onClick={() => removeFeedImage(i)}
                        aria-label={`Remove feed screenshot ${i + 1}`}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900 shadow"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => feedRef.current?.click()}
                className="mt-3 w-full py-2.5 text-sm font-semibold text-gray-600 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300 hover:text-purple-600 transition-colors"
              >
                + Add More Screenshots
              </button>
            </div>
          )}

          {feedError && (
            <p role="alert" className="text-xs text-red-500 mt-2 flex items-center gap-1.5 font-[Inter,sans-serif]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {feedError}
            </p>
          )}
          <input ref={feedRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" multiple className="hidden" onChange={(e) => e.target.files && handleFeedFiles(e.target.files)} />
        </div>

        {/* Privacy */}
        <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3 border border-blue-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className="w-5 h-5 flex-shrink-0 mt-0.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-800 font-[Inter,sans-serif]">Your privacy is protected</p>
            <p className="text-xs text-blue-600 mt-0.5 font-[Inter,sans-serif] leading-relaxed">
              Your Instagram password is never required. Only provide your public profile URL and screenshots.
              Uploaded images are used solely to generate your analysis.
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          aria-busy={loading}
          className={`w-full py-4 font-bold text-white text-lg rounded-2xl transition-all flex items-center justify-center gap-2 ${
            !loading ? 'gradient-bg hover:opacity-90 shadow-lg shadow-pink-200' : 'gradient-bg opacity-70 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 animate-spin">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Analyzing...
            </>
          ) : (
            <><span>✨</span> Analyze My Profile</>
          )}
        </button>

        {!hasContent && !loading && (
          <p className="text-center text-xs text-gray-400 font-[Inter,sans-serif]">
            Upload at least one screenshot to get started
          </p>
        )}
      </div>
    </div>
  )
}

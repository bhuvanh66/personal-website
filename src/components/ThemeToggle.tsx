import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme-preference')
    return (saved as 'dark' | 'light') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme-preference', theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      style={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.25)',
        padding: '6px 10px',
        borderRadius: 8,
        color: 'inherit',
        cursor: 'pointer',
      }}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}



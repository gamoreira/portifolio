import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'gm-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.backgroundColor = theme === 'light' ? '#eef2f7' : '#060a12'
    localStorage.setItem(STORAGE_KEY, theme)
    window.dispatchEvent(new CustomEvent('gm-theme', { detail: theme }))
  }, [theme])

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
  }
}

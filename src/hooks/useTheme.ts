import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setTheme, type ThemeMode } from '@/slices/uiSlice'

export function useTheme(): { theme: ThemeMode; setThemeMode: (mode: ThemeMode) => void } {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((s) => s.ui.theme)

  useEffect(() => {
    const root = document.documentElement
    const resolved =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme
    root.classList.toggle('dark', resolved === 'dark')
  }, [theme])

  const setThemeMode = (mode: ThemeMode): void => {
    dispatch(setTheme(mode))
  }

  return { theme, setThemeMode }
}

'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemePicker() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // This ensures that no mismatch between server-rendered and client-rendered HTML occurs
    return <div className="w-9 h-9 p-1 rounded-lg"></div>
  }
  return (
    <>
      {theme === 'light' ? (
        <Moon
          className="w-9 h-9 p-1 rounded-lg hover:bg-muted hover:text-primary hover:cursor-pointer"
          onClick={() => setTheme('dark')}
        />
      ) : (
        <Sun
          className="w-9 h-9 p-1 rounded-lg hover:bg-muted hover:text-primary hover:cursor-pointer"
          onClick={() => setTheme('light')}
        />
      )}
    </>
  )
}

import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import { Button } from './button'
import { useTheme } from '@/contexts/theme'

export function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <Button variant="ghost" size="icon" onClick={toggle} className={className} aria-label="Alternar tema">
      {isDark ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
    </Button>
  )
}

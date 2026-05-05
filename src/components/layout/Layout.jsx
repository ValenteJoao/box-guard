import { useEffect, useState } from 'react'
import Sidebar from '../nav/Menu'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'

export default function Layout({ children, title, subtitle, actions }) {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem('sidebar:collapsed') === '1'
  )

  useEffect(() => {
    localStorage.setItem('sidebar:collapsed', collapsed ? '1' : '0')
  }, [collapsed])

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <div className={cn('flex-1 flex flex-col transition-all duration-300', collapsed ? 'lg:ml-20' : 'lg:ml-64')}>
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b">
          <div className="px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className="lg:hidden">
                <HiOutlineMenuAlt2 size={20} />
              </Button>
              <div className="min-w-0">
                <h1 className="text-base lg:text-lg font-semibold tracking-tight truncate">{title}</h1>
                {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {actions}
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}

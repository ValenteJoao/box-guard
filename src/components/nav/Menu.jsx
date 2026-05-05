import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthGoogleContext } from '../../contexts/authGoogle'
import logo from '../../assets/img/logo.png'
import { RiLogoutCircleLine, RiDashboardLine, RiFileChartLine } from 'react-icons/ri'
import { MdOutlineInventory2, MdClose } from 'react-icons/md'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: RiDashboardLine, end: true },
  { to: '/estoque', label: 'Estoque', icon: MdOutlineInventory2 },
  { to: '/relatorios', label: 'Relatórios', icon: RiFileChartLine },
]

export default function Menu({ open = false, onClose, collapsed = false, onToggleCollapse }) {
  const { signOut } = useContext(AuthGoogleContext)
  const userLogado = JSON.parse(sessionStorage.getItem('@Auth:user') || 'null')

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-30 lg:hidden" aria-hidden />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen bg-card border-r flex flex-col transition-all duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="relative flex items-center justify-center h-20 border-b px-4">
          <img
            src={logo}
            alt="Box Guard"
            className={cn('object-contain transition-all', collapsed ? 'h-9 w-9' : 'h-14 w-14')}
          />
          <button onClick={onClose} className="lg:hidden absolute right-3 top-3 p-2 rounded-md hover:bg-accent">
            <MdClose size={18} />
          </button>
          <button
            onClick={onToggleCollapse}
            className="hidden lg:grid place-items-center absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-card border hover:bg-accent text-muted-foreground hover:text-foreground transition"
            title={collapsed ? 'Expandir' : 'Recolher'}
          >
            {collapsed ? <HiChevronDoubleRight size={12} /> : <HiChevronDoubleLeft size={12} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  collapsed && 'justify-center',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {userLogado && (
          <div className="p-3 border-t">
            <div className={cn('flex items-center gap-3 mb-2 px-1', collapsed && 'justify-center')}>
              <Avatar src={userLogado.photoURL} alt={userLogado.displayName} size={36} />
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{userLogado.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{userLogado.email}</p>
                </div>
              )}
            </div>
            <Button
              onClick={signOut}
              variant="ghost"
              size={collapsed ? 'icon' : 'sm'}
              className={cn('w-full text-muted-foreground', !collapsed && 'justify-start')}
              title={collapsed ? 'Sair' : undefined}
            >
              <RiLogoutCircleLine size={16} /> {!collapsed && 'Sair'}
            </Button>
          </div>
        )}
      </aside>
    </>
  )
}

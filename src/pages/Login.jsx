import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineSparkles } from 'react-icons/hi'
import { AuthGoogleContext } from '../contexts/authGoogle'
import { Button } from '@/components/ui/button'
import logo from '../assets/img/logo.png'

const features = [
  { icon: HiOutlineShieldCheck, label: 'Autenticação segura' },
  { icon: HiOutlineLockClosed, label: 'Dados criptografados' },
  { icon: HiOutlineSparkles, label: 'Interface moderna' },
]

export default function Login() {
  const { signInGoogle, authenticated } = useContext(AuthGoogleContext)

  useEffect(() => {
    const root = document.documentElement
    const previous = root.classList.contains('dark') ? 'dark' : 'light'
    root.classList.remove('light', 'dark')
    root.classList.add('dark')
    return () => {
      root.classList.remove('light', 'dark')
      root.classList.add(previous)
    }
  }, [])

  if (authenticated) return <Navigate to="/" />

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.15),transparent_60%)]" />

      <div className="w-full max-w-sm space-y-10 animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-2xl" />
            <img src={logo} alt="Box Guard" className="h-28 w-28 object-contain" />
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm text-muted-foreground">
              A plataforma simples e segura para gerenciar seu estoque.
            </p>
          </div>
        </div>

        <Button onClick={signInGoogle} size="lg" className="w-full bg-foreground text-background hover:bg-foreground/90">
          <FcGoogle size={20} />
          Continuar com Google
        </Button>

        <div className="grid grid-cols-3 gap-2 text-center">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 text-muted-foreground">
              <Icon size={18} className="text-primary" />
              <span className="text-[10px] leading-tight">{label}</span>
            </div>
          ))}
        </div>

        <div className="rounded-md border border-dashed px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Aviso:</span> projeto de estudo,
            não destinado a fins comerciais.
          </p>
        </div>
      </div>
    </div>
  )
}

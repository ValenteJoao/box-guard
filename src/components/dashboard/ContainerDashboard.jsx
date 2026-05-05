import { Card, CardContent } from '@/components/ui/card'
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'
import { LuPackage, LuPackageCheck, LuPackagePlus, LuWallet, LuCoins } from 'react-icons/lu'
import { cn } from '@/lib/utils'

function Kpi({ icon: Icon, label, value, hint, trend, accent }) {
  const accents = {
    primary: 'text-primary',
    success: 'text-[hsl(var(--success))]',
    warning: 'text-[hsl(var(--warning))]',
    muted: 'text-muted-foreground',
  }
  return (
    <Card className="group relative overflow-hidden">
      <CardContent className="p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon size={14} className={accents[accent] || 'text-muted-foreground'} />
            <span className="text-[11px] font-medium uppercase tracking-[0.08em]">{label}</span>
          </div>
          {trend && (
            <span className={cn(
              'inline-flex items-center gap-1 text-[11px] font-medium tabular',
              trend.dir === 'up' ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--warning))]'
            )}>
              {trend.dir === 'up' ? <HiArrowTrendingUp size={12} /> : <HiArrowTrendingDown size={12} />}
              {trend.value}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <p className="tabular text-3xl font-semibold tracking-tight leading-none">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </CardContent>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </Card>
  )
}

function MoneyKpi({ icon: Icon, label, value, secondary, secondaryLabel, ratio }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon size={14} className="text-primary" />
              <span className="text-[11px] font-medium uppercase tracking-[0.08em]">{label}</span>
            </div>
            <p className="tabular text-4xl font-semibold tracking-tight leading-none mt-3">{value}</p>
          </div>
        </div>

        {ratio !== undefined && (
          <div className="space-y-1.5">
            <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, ratio))}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground tabular">
              <span>{secondaryLabel}</span>
              <span className="text-foreground font-medium">{secondary}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function ContainerDashboard({
  estoqueCadastrados, estoque, estoqueFuturo, valorEstoque, patrimonio,
  lowStockCount = 0,
}) {
  const totalUnits = Number(estoque) + Number(estoqueFuturo)
  const ratioAtual = totalUnits > 0 ? (Number(estoque) / totalUnits) * 100 : 0

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Kpi
          icon={LuPackage}
          label="Produtos cadastrados"
          value={estoqueCadastrados}
          hint={lowStockCount > 0 ? `${lowStockCount} com estoque baixo` : 'Catálogo completo'}
          accent="primary"
        />
        <Kpi
          icon={LuPackageCheck}
          label="Em estoque"
          value={estoque}
          hint="Unidades disponíveis"
          accent="success"
        />
        <Kpi
          icon={LuPackagePlus}
          label="Para chegar"
          value={estoqueFuturo}
          hint="Pedidos em trânsito"
          accent="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <MoneyKpi
          icon={LuWallet}
          label="Valor do estoque atual"
          value={valorEstoque}
          ratio={ratioAtual}
          secondaryLabel="% sobre o total"
          secondary={`${ratioAtual.toFixed(0)}%`}
        />
        <MoneyKpi
          icon={LuCoins}
          label="Patrimônio total"
          value={patrimonio}
          ratio={100}
          secondaryLabel="Atual + futuro"
          secondary={`${totalUnits} un`}
        />
      </div>
    </div>
  )
}

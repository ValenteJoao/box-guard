import { useState } from 'react'
import { doc, deleteDoc, getFirestore } from 'firebase/firestore'
import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import App from '../../services/firebase'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ProdutoEstoque({ produto, cor, custo, estoque, estoqueFuturo, id }) {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const db = getFirestore(App)
  const [confirm, setConfirm] = useState(false)
  const [removing, setRemoving] = useState(false)

  async function handleDelete() {
    setRemoving(true)
    await deleteDoc(doc(db, userON.uid, id))
    document.location.reload()
  }

  const lowStock = Number(estoque) <= 5
  const initial = produto?.[0]?.toUpperCase() || '?'

  return (
    <Card className="p-4 grid grid-cols-12 gap-3 items-center hover:border-primary/30 hover:bg-accent/40 transition-colors">
      <div className="col-span-12 sm:col-span-4 min-w-0 flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold text-sm">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="font-semibold capitalize truncate leading-tight">{produto}</p>
          <p className="text-xs text-muted-foreground capitalize truncate">Modelo: {cor}</p>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Custo</p>
        <p className="font-medium text-sm tabular">{custo}</p>
      </div>

      <div className="col-span-6 sm:col-span-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Estoque</p>
        <p className={cn('font-medium text-sm tabular flex items-center gap-1.5', lowStock && 'text-[hsl(var(--warning))]')}>
          {estoque}<span className="text-muted-foreground font-normal text-xs">un</span>
          {lowStock && <span className="ml-1 px-1.5 py-0.5 text-[9px] uppercase tracking-wider rounded bg-[hsl(var(--warning)/0.15)]">baixo</span>}
        </p>
      </div>

      <div className="col-span-6 sm:col-span-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Para chegar</p>
        <p className="font-medium text-sm tabular text-primary">{estoqueFuturo}<span className="text-muted-foreground font-normal text-xs ml-1">un</span></p>
      </div>

      <div className="col-span-6 sm:col-span-2 flex justify-end gap-1.5">
        {confirm ? (
          <>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={removing}>
              {removing ? '...' : 'Confirmar'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirm(false)}>
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Link to={`/estoque/edit/${id}`} title="Editar" className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <TbEdit size={16} />
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setConfirm(true)} title="Excluir" className="h-9 w-9 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
              <MdDeleteOutline size={18} />
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}

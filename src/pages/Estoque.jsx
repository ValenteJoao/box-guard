import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { HiPlus } from 'react-icons/hi'
import { TbBoxOff } from 'react-icons/tb'

import App from '../services/firebase'
import Layout from '../components/layout/Layout'
import SearchBar from '../components/layout/SearchBar'
import ElementoEstoque from '../components/produtos/ElementoEstoque'
import PaginacaoComponent from '../components/layout/PaginacaoComponent'
import BarraInferior from '../components/layout/BarraInferior'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const PER_PAGE = 8

export default function Estoque() {
  const [produtos, setProdutos] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)

  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const navigate = useNavigate()

  useEffect(() => {
    const db = getFirestore(App)
    ;(async () => {
      const data = await getDocs(collection(db, userON.uid))
      setProdutos(data.docs.map((d) => ({ ...d.data(), id: d.id })))
      setLoading(false)
    })()
  }, [])

  const ordenados = useMemo(
    () => [...produtos].sort((a, b) => a.nomeProduto.toLowerCase().localeCompare(b.nomeProduto.toLowerCase())),
    [produtos]
  )

  const filtrados = useMemo(
    () =>
      busca.trim()
        ? ordenados.filter((p) => p.nomeProduto.toLowerCase().includes(busca.toLowerCase()))
        : ordenados,
    [ordenados, busca]
  )

  const pages = Math.ceil(filtrados.length / PER_PAGE)
  const start = currentPage * PER_PAGE
  const visible = filtrados.slice(start, start + PER_PAGE)

  return (
    <Layout
      title="Estoque"
      subtitle="Gerencie seus produtos cadastrados"
      actions={
        <Button onClick={() => navigate('/estoque/add')} size="sm">
          <HiPlus size={16} /> <span className="hidden sm:inline">Novo produto</span>
        </Button>
      }
    >
      <div className="mb-4 max-w-md">
        <SearchBar
          value={busca}
          onChange={(e) => { setBusca(e.target.value); setCurrentPage(0) }}
          placeholder="Buscar produto pelo nome..."
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="rounded-lg border bg-card h-20 animate-pulse" />)}
        </div>
      ) : visible.length === 0 ? (
        <Card className="p-12 text-center flex flex-col items-center gap-3">
          <TbBoxOff size={36} className="text-muted-foreground" />
          <h3 className="text-base font-semibold">Nenhum produto encontrado</h3>
          <p className="text-sm text-muted-foreground">{busca ? 'Tente outro termo de busca.' : 'Comece adicionando seu primeiro produto.'}</p>
          {!busca && (
            <Button onClick={() => navigate('/estoque/add')} className="mt-2" size="sm">
              <HiPlus size={16} /> Adicionar produto
            </Button>
          )}
        </Card>
      ) : (
        <div className="space-y-2">
          {visible.map((p) => (
            <ElementoEstoque
              key={p.id}
              id={p.id}
              produto={p.nomeProduto.toLowerCase()}
              cor={p.modelo.toLowerCase()}
              custo={Number(p.precoCusto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              estoque={p.estoque}
              estoqueFuturo={p.estoqueFuturo}
            />
          ))}
        </div>
      )}

      <PaginacaoComponent setCurrentPage={setCurrentPage} pages={pages} currentPage={currentPage} />
      <BarraInferior textA="Itens cadastrados" infoA={ordenados.length} />
    </Layout>
  )
}

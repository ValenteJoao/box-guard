import { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import App from '../services/firebase'
import Layout from '../components/layout/Layout'
import ContainerDashboard from '../components/dashboard/ContainerDashboard'

export default function Dashboard() {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const db = getFirestore(App)
    const ref = collection(db, userON.uid)
    ;(async () => {
      const data = await getDocs(ref)
      setProdutos(data.docs.map((d) => ({ ...d.data(), id: d.id })))
      setLoading(false)
    })()
  }, [])

  const totalDeItens = produtos.length
  const totalEstoque = produtos.reduce((t, p) => t + Number(p.estoque), 0)
  const totalEstoqueFuturo = produtos.reduce((t, p) => t + Number(p.estoqueFuturo), 0)
  const valorEstoque = produtos.reduce((t, p) => t + Number(p.precoCusto) * Number(p.estoque), 0)
  const patrimonio = valorEstoque + produtos.reduce((t, p) => t + Number(p.precoCusto) * Number(p.estoqueFuturo), 0)
  const lowStockCount = produtos.filter((p) => Number(p.estoque) <= 5).length

  const fmt = (v) => v.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  return (
    <Layout title="Dashboard" subtitle={`Olá, ${userON?.displayName?.split(' ')[0] || 'usuário'} 👋`}>
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <ContainerDashboard
          estoqueCadastrados={totalDeItens}
          estoque={totalEstoque}
          estoqueFuturo={totalEstoqueFuturo}
          valorEstoque={fmt(valorEstoque)}
          patrimonio={fmt(patrimonio)}
          lowStockCount={lowStockCount}
        />
      )}
    </Layout>
  )
}

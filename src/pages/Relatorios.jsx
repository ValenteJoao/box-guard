import { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { FaFilePdf } from 'react-icons/fa'
import { MdInventory2, MdStorefront, MdLocalShipping } from 'react-icons/md'

import Layout from '../components/layout/Layout'
import App from '../services/firebase'
import AtacadoPreco from '../reports/AtacadoPreco'
import VarejoPreco from '../reports/VarejoPreco'
import EstoqueRelatorio from '../reports/EstoqueRelatorio'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const reports = [
  { key: 'atacado', label: 'Lista de preços — Atacado', desc: 'Tabela com nome do produto e valor de atacado.', icon: MdLocalShipping, run: AtacadoPreco },
  { key: 'varejo', label: 'Lista de preços — Varejo', desc: 'Tabela com nome do produto e valor de varejo.', icon: MdStorefront, run: VarejoPreco },
  { key: 'estoque', label: 'Relatório de estoque', desc: 'Visão completa de itens, quantidades e custos.', icon: MdInventory2, run: EstoqueRelatorio },
]

export default function Relatorios() {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    const db = getFirestore(App)
    ;(async () => {
      const data = await getDocs(collection(db, userON.uid))
      setProdutos(data.docs.map((d) => ({ ...d.data(), id: d.id })))
    })()
  }, [])

  const ordenados = [...produtos].sort((a, b) =>
    a.nomeProduto.toLowerCase().localeCompare(b.nomeProduto.toLowerCase())
  )

  const empty = ordenados.length === 0

  return (
    <Layout title="Relatórios" subtitle="Gere relatórios em PDF dos seus produtos">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map(({ key, label, desc, icon: Icon, run }) => (
          <Card key={key} className="flex flex-col">
            <CardHeader>
              <Icon size={20} className="text-muted-foreground mb-3" />
              <CardTitle className="text-base">{label}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button onClick={() => run(ordenados)} disabled={empty} variant="outline" className="w-full">
                <FaFilePdf /> Gerar PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {empty && (
        <p className="mt-6 text-center text-muted-foreground text-sm">
          Cadastre produtos no estoque para habilitar a geração de relatórios.
        </p>
      )}
    </Layout>
  )
}

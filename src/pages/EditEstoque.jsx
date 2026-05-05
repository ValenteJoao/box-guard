import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { IoMdArrowBack } from 'react-icons/io'
import App from '../services/firebase'
import Layout from '../components/layout/Layout'
import ProdutoForm from '../components/produtos/ProdutoForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function EditEstoque() {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const navigate = useNavigate()
  const { id } = useParams()
  const db = getFirestore(App)
  const [defaults, setDefaults] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) { setError('ID inválido'); return }
    ;(async () => {
      try {
        const ref = doc(db, userON.uid, id)
        const snap = await getDoc(ref)
        if (!snap.exists()) {
          setError('Produto não encontrado')
          return
        }
        setDefaults({ ...snap.data(), id: snap.id })
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [id])

  async function updateProduct(data) {
    const { id: _drop, ...payload } = data
    await updateDoc(doc(db, userON.uid, id), payload)
    navigate('/estoque')
  }

  return (
    <Layout
      title="Editar produto"
      subtitle="Atualize as informações do item"
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/estoque')}>
          <IoMdArrowBack size={16} /> <span className="hidden sm:inline">Voltar</span>
        </Button>
      }
    >
      <Card className="w-full">
        <CardContent className="pt-6">
          {error ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-sm text-destructive font-medium">{error}</p>
              <Button variant="outline" size="sm" onClick={() => navigate('/estoque')}>
                Voltar para o estoque
              </Button>
            </div>
          ) : defaults === null ? (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((__, j) => (
                      <div key={j} className="h-10 bg-muted rounded-md animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProdutoForm defaultValues={defaults} onSubmit={updateProduct} submitLabel="Salvar alterações" />
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}

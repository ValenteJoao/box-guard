import { useNavigate } from 'react-router-dom'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { IoMdArrowBack } from 'react-icons/io'
import App from '../services/firebase'
import Layout from '../components/layout/Layout'
import ProdutoForm from '../components/produtos/ProdutoForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function AddEstoque() {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const navigate = useNavigate()
  const db = getFirestore(App)

  async function createProduct(data) {
    await addDoc(collection(db, userON.uid), data)
    navigate('/estoque')
  }

  return (
    <Layout
      title="Adicionar produto"
      subtitle="Preencha os dados para cadastrar um novo item"
      actions={
        <Button variant="outline" size="sm" onClick={() => navigate('/estoque')}>
          <IoMdArrowBack size={16} /> <span className="hidden sm:inline">Voltar</span>
        </Button>
      }
    >
      <Card className="w-full">
        <CardContent className="pt-6">
          <ProdutoForm onSubmit={createProduct} submitLabel="Adicionar produto" />
        </CardContent>
      </Card>
    </Layout>
  )
}

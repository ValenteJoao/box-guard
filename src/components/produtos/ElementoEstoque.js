import React from 'react'
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { TbEdit } from 'react-icons/tb'
import { MdDeleteSweep } from 'react-icons/md'
import { Link } from 'react-router-dom'

import App from '../../services/firebase'
import '../produtos/styleElementoEstoque.css'

function ProdutoEstoque({ produto, cor, custo, estoque, estoqueFuturo, id }) {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const db = getFirestore(App);

  async function deleteProduct(info) {
    const productDoc = doc(db, userON.uid, info);
    await deleteDoc(productDoc);
    document.location.reload(true)
  }

  return (
    <>
      <div className='infoproduto'>
        <h2 className='produto'>{produto}</h2>
        <h2>Modelo: <span className='modelo'>{cor}</span></h2>
      </div>

      <h2>Custo: <span>{custo}</span></h2>
      <div className='infoEstoque'>
        <h2>Estoque Atual: <span>{estoque} Un</span></h2>
        <h2>Para Chegar: <span>{estoqueFuturo} Un</span></h2>
      </div>
      <div>
        <Link to={{ pathname: `/estoque/edit${id}` }}>
          <button className='edit'> <TbEdit /> </button>
        </Link>
        <button onClick={() => deleteProduct(id)} className='apagar'> <MdDeleteSweep /> </button>
      </div>
    </>
  )
}

export default ProdutoEstoque
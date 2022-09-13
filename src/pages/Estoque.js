import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, getFirestore } from "firebase/firestore";

import App from '../services/firebase'
import Menu from '../components/nav/Menu'
import BarraSuperiorButton from '../components/layout/BarraSuperiorButton'
import ElementoEstoque from '../components/produtos/ElementoEstoque'
import PaginacaoComponent from '../components/layout/PaginacaoComponent'
import BarraInferior from "../components/layout/BarraInferior";


export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [produtosPerPage, setProdutosPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [busca, setBusca] = useState('');

  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const history = useNavigate();

  //Colocando em ordem alfabetica
  const produtosOrganizados = produtos.sort((a, b) => {
    if (a.nomeProduto.toLowerCase() < b.nomeProduto.toLowerCase()) {
      return -1;
    } else { return true }
  })
  const filtradas = produtosOrganizados.filter((nomeProduto) => nomeProduto.nomeProduto.toLowerCase().includes(busca.toLowerCase()));

  //Logica Paginacao
  const pages = Math.ceil(produtosOrganizados.length / produtosPerPage);
  const startIndex = currentPage * produtosPerPage;
  const endIndex = startIndex + produtosPerPage;
  const currentItens = produtosOrganizados.slice(startIndex, endIndex);

  //BANCO DE DADOS
  const db = getFirestore(App);
  const produtosCollectionRef = collection(db, userON.uid);

  useEffect(() => {
    const getProduct = async () => {
      const data = await getDocs(produtosCollectionRef);
      const format = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setProdutos(format)
    };
    getProduct();

  }, []);

  ////

  const handleClick = () => {
    history('/estoque/add')
  }

  const handleBusca = (e) => {
    setBusca(e.target.value)
  }

  function gerarElementos(tipoProduto) {
    const itn = tipoProduto.map(tipoProduto =>

      <div key={tipoProduto.id} className='container'>

        <ElementoEstoque
          produto={tipoProduto.nomeProduto.toLowerCase()}
          cor={tipoProduto.modelo.toLowerCase()}
          custo={Number(tipoProduto.precoCusto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          estoque={tipoProduto.estoque}
          estoqueFuturo={tipoProduto.estoqueFuturo}
          id={tipoProduto.id}
        />

      </div>)
    return itn;
  }

  const totalDeItens = produtosOrganizados.length

  return (
    <>
      <Menu />

      <main>
        <BarraSuperiorButton
          name='Estoque'
          namebutton='+'
          functionbutton={handleClick}
          handleOnChange={handleBusca}
          value={busca} />

        {busca.length === 0 && gerarElementos(currentItens) || gerarElementos(filtradas)}

        <PaginacaoComponent
          setCurrentPage={setCurrentPage}
          pages={pages}
          currentPage={currentPage}
        />

        <BarraInferior
          textA='Itens Cadastrados'
          infoA={totalDeItens}
        />


      </main>

    </>
  )
}

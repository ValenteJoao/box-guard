import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import Menu from '../components/nav/Menu'
import AtacadoPreco from '../reports/AtacadoPreco'
import VarejoPreco from "../reports/VarejoPreco"
import EstoqueRelatorio from "../reports/EstoqueRelatorio";
import App from '../services/firebase'
import './styles/styleRelatorio.css'

export default function Listas() {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const [produtos, setProdutos] = useState([]);

  const db = getFirestore(App);
  const produtosCollectionRef = collection(db, userON.uid);

  useEffect(() => {
    const getProduct = async () => {
      const data = await getDocs(produtosCollectionRef);
      setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProduct();

    console.log(produtos)
  }, []);

  const produtosOrganizados = produtos.sort((a, b) => {
    if (a.nomeProduto.toLowerCase() < b.nomeProduto.toLowerCase()) {
      return -1;
    } else { return true }
  })

  return (
    <>
      <Menu />
      <main>
        <header>
          <h1>Relatórios</h1>
        </header>
        <div className='ContainerBtn'>
          <button onClick={(e) => AtacadoPreco(produtosOrganizados)} className='btnRelatorio'>Gerar Lista de Preço Atacado</button>
          <button onClick={(e) => VarejoPreco(produtosOrganizados)} className='btnRelatorio'>Gerar Lista de Preço Varejo</button>
          <button onClick={(e) => EstoqueRelatorio(produtosOrganizados)} className='btnRelatorio'>Gerar Relatório de Estoque</button>
        </div>
      </main>
    </>
  )
}

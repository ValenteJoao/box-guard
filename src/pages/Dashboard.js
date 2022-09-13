import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

import App from '../services/firebase'
import Menu from '../components/nav/Menu'
import ContainerDashboard from '../components/dashboard//ContainerDashboard'

export default function Dashboard() {

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
  }, []);

  const totalDeItens = produtos.length

  const totalEstoque = produtos.reduce((total, numero) => {
    return total + Number(numero.estoque);
  }, 0)

  const totalEstoqueFuturo = produtos.reduce((total, numero) => {
    return total + Number(numero.estoqueFuturo);
  }, 0)

  const valorEstoque = produtos.reduce((total, numero) => {
    return total + Number(numero.precoCusto) * Number(numero.estoque);
  }, 0)

  let patrimonio = produtos.reduce((total, numero) => {
    return total + Number(numero.precoCusto) * Number(numero.estoqueFuturo);
  }, 0)

  patrimonio += valorEstoque


  return (
    <>
      <Menu />

      <main className='containerMain'>

        <header>
          <h1>Dashboard</h1>
        </header>

        <ContainerDashboard
          estoqueCadastrados={totalDeItens}
          estoque={totalEstoque}
          estoqueFuturo={totalEstoqueFuturo}
          valorEstoque={valorEstoque.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          patrimonio={patrimonio.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} />

      </main>
    </>
  )
}

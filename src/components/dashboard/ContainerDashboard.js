import React from 'react'
import { AiFillDropboxCircle } from 'react-icons/ai'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

import './StyleContainer.css'

function ContainerDashboard({ estoqueCadastrados, estoque, estoqueFuturo, valorEstoque, patrimonio }) {
  return (
    <div className='containerDashboard'>
      <section className='section1'>
        <div className='produtosContainer'>
          <h2 className='numberEstoque'>{estoqueCadastrados}</h2>
          <h2>Produtos<br />Cadastrados</h2>
        </div>
        <div className='produtosContainer escuro'>
          <h2 className='numberEstoque'>{estoque}</h2>
          <h2>Produtos<br />em Estoque</h2>
        </div>
        <div className='produtosContainer'>
          <h2 className='numberEstoque'>{estoqueFuturo}</h2>
          <h2>Produtos<br />para chegar</h2>
        </div>
      </section>

      <section className='section2'>

        <div className='containerDashboard2'>

          <div className='produtosContainer2'>

            <div className='containerLateral'>
              <AiFillDropboxCircle className='icone' />
              <h2>Valor de<br />estoque atual</h2>
            </div>
            <h2 className='dinheiro'>{valorEstoque}</h2>
          </div>

        </div>

        <div className='containerDashboard2'>

          <div className='produtosContainer2'>

            <div className='containerLateral'>
              <RiMoneyDollarCircleFill className='icone' />
              <h2>Patrimônio total</h2>
            </div>
            <h2 className='dinheiro'>{patrimonio}</h2>
          </div>

        </div>

      </section>

    </div>
  )
}

export default ContainerDashboard
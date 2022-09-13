import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { IoMdCloseCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

import '../components/produtos/styleForm.css'
import App from '../services/firebase'

function FormAdd() {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const history = useNavigate();
  const db = getFirestore(App);

  async function createProduct(data) {
    const dados = data

    await addDoc(collection(db, userON.uid), {
      nomeProduto: dados.nomeProduto,
      modelo: dados.modelo,
      precoCusto: dados.precoCusto,
      precoVenda: dados.precoVenda,
      precoAtacado: dados.precoAtacado,
      estoque: dados.estoque,
      estoqueFuturo: dados.estoqueFuturo,
    })
    history("/estoque")
  }

  return (

    <div className='containerAdd'>

      <button onClick={() => { history("/estoque"); }} className='iconeClose'>
        <IoMdCloseCircle />
      </button>

      <h1>Adicionar Produtos</h1>

      <form className="form" onSubmit={handleSubmit(createProduct)}>

        <div>

          <div>
            <label htmlFor="produto">Digite o produto:</label>
            <input
              required
              size={32}
              className='produto input' type='text'
              name='nomeProduto' placeholder='Ex: Fone KZ Edx Pro'
              {...register("nomeProduto")}
            ></input>
          </div>

          <div>
            <label htmlFor="cor">Digite o modelo:</label>
            <input
              required
              size={10}
              className='cor input' type='text'
              name='modelo' placeholder='Ex: Preto'
              {...register("modelo")}></input>
          </div>

        </div>

        <div>

          <div>
            <label htmlFor="custo">Valor de Custo:</label>
            <input
              required
              step="0.01"
              className='numberInput input' type='number'
              name='precoCusto' placeholder='R$ 0,00'
              {...register("precoCusto")}></input>
          </div>

          <div>
            <label htmlFor="varejo">Valor Varejo:</label>
            <input
              required
              step="0.01"
              className='numberInput input' type='number'
              id="precoVenda" name='precoVenda' placeholder='R$ 0,00'
              {...register("precoVenda")}></input>
          </div>

          <div>
            <label htmlFor="atacado">Valor Atacado:</label>
            <input
              required
              step="0.01" className='numberInput input' type='number'
              id="precoAtacado" name='precoAtacado' placeholder='R$ 0,00'
              {...register("precoAtacado")}></input>
          </div>

        </div>

        <div>

          <label htmlFor="estoque">Estoque Atual:</label>
          <input
            required
            className='numberInput estoque input' type='number'
            max="99" id="estoque" name='estoque' placeholder='0'
            {...register("estoque")}></input>

          <label className='futuro' htmlFor="futuro">Estoque Futuro:</label>
          <input
            required
            className='numberInput estoque input' type='number'
            id="estoqueFuturo" name='estoqueFuturo' placeholder='0'
            {...register("estoqueFuturo")}></input>

        </div>

        <button onClick={createProduct} className='botaoSubmit' type='submit'>Adicionar Produto</button>

      </form >

    </div >
  )

};
export default FormAdd
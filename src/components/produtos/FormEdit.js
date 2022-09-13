import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { getFirestore, doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { useForm } from 'react-hook-form'
import { IoMdCloseCircle } from 'react-icons/io'

import App from '../../services/firebase'
import './styleForm.css'

function FormAdd({ titulo }) {
  const userON = JSON.parse(sessionStorage.getItem('@Auth:user'))
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [produtos, setProdutos] = useState([]);

  const history = useNavigate();

  const idProduct = useParams();

  const db = getFirestore(App);
  const produtosCollectionRef = collection(db, userON.uid);

  useEffect(() => {
    const getProduct = async () => {
      const data = await getDocs(produtosCollectionRef);
      const produto = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filtrado = produto.filter((produtos) => {
        if (produtos.id === idProduct.id) {
          return produtos
        }
      })
      reset(filtrado[0]);
    };
    getProduct();
  }, []);

  async function addPost(data) {
    const dados = data
    const productDoc = doc(db, userON.uid, idProduct.id);
    await updateDoc(productDoc, {
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

      <h1>{titulo}</h1>

      <form className="form" onSubmit={handleSubmit(addPost)}>

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

        <button className='botaoSubmit' type='submit'>Editar Produto</button>

      </form >

    </div >
  )

};
export default FormAdd
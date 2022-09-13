import React, { useContext } from 'react'
import { AuthGoogleContext } from '../contexts/authGoogle'
import { Navigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

import logo from '../assets/img/logo.png'
import './styles/loginStyle.css'

function Login() {

  const { signInGoogle, authenticated } = useContext(AuthGoogleContext)

  return (
    <>
      {authenticated === false &&
        <div className='divLogin'>
          <img className="logo" src={logo} alt="logoempresa"></img>
          <main>
            <div className='bemvindo'>
              <h1>Bem-vindo!</h1>
              <p>Por favor, faça o login para acessar o sistema</p>
            </div>
            <button onClick={signInGoogle}><FcGoogle className='google' />Entrar com o Google</button>
          </main>
          <p>Sistema criado por <strong>João Valente</strong></p>
        </div > || <Navigate to='/' />}
    </>
  )
}
export default Login
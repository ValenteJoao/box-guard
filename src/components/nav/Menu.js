import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';

import { AuthGoogleContext } from '../../contexts/authGoogle'
import './StyleMenu.css';
import logo from '../../assets/img/logo.png'
import { RiLogoutCircleLine } from 'react-icons/ri'

function Menu() {

  const { signOut } = useContext(AuthGoogleContext);
  const userLogado = JSON.parse(sessionStorage.getItem('@Auth:user'))
  console.log(userLogado.photoURL)

  let location = useLocation();

  return (
    <nav className="navLeft">
      <img className="logo" src={logo} alt="logoempresa"></img>
      <div className="menus">

        {(location.pathname === '/' &&
          <a className="active" href="/">Dashboard</a>) ||
          <a className="menu" href="/">Dashboard</a>
        }

        {(location.pathname === '/estoque/edit' &&
          <a className="active" href="/estoque">Estoque</a>)
          ||
          (location.pathname === '/estoque' &&
            <a className="active" href="/estoque">Estoque</a>) ||
          <a className="menu" href="/estoque">Estoque</a>

        }

        {(location.pathname === '/relatorios' &&
          <a className="active" href="/relatorios">Gerar Relatórios</a>) ||
          <a className="menu" href="/relatorios">Gerar Relatórios</a>
        }

      </div>
      <div className="perfil">
        <div className=" nameperfil">
          {userLogado.photoURL && <img src={userLogado.photoURL} alt='Foto do usuário' />}
          <p className="name">{userLogado.displayName}</p>
        </div>
        <div className="perfilsair">
          <a onClick={() => signOut()} className="sair">Sair</a>
          <RiLogoutCircleLine className='RiLogoutCircleLine' onClick={() => signOut()} />
        </div>
      </div>
    </nav>
  )
}
export default Menu;
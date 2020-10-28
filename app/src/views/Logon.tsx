import React from 'react';
import { Link } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import '../styles/logon.css';

export default function Logon() {
  return(
    <div className="logon-container">
        <form className="form" onSubmit={ () => {} }>
          <span>Faça seu logon</span>
          <input type="email" placeholder="Digite seu email..." />
          <input type="password" placeholder="Digite sua senha..." />
          <button type="submit" className="button" >Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
    </div>
  );
}
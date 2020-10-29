import React from 'react';
import { Link } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import '../styles/register.css';

export default function Register() {
  return(
    <div className="register-container">
      <div className="content">
        <section>
          <span>FilterPharma</span>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e aproveite o melhor do FilterPharma para sua drogaria</p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Volta para o logon
          </Link>
        </section>
        <form onSubmit={ () => {} }>
          <input placeholder="Nome da drogaria" />
          <input placeholder="CNPJ" />
          <input type="email" placeholder="E-mail" />
          <input placeholder="Telefone" />
          <input placeholder="CEP" />
          <div className="input-group">
            <input placeholder="Cidade" />
            <input 
              placeholder="UF"
              style={ {width: 80, textTransform: 'uppercase'} }
            />
          </div>
          <input placeholder="Bairro" />
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
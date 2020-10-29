import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../services/api';

import '../styles/register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const result = await api.post('drugstore', {
        name,
        cnpj,
        email,
        phoneNumber,
        cep,
        city,
        uf,
        neighborhood,
        password
      });

      alert('Cadastro Realizado com sucesso!')
      history.push('/')
    } catch(err) {
      console.log(err)
    }
  }

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
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da drogaria" 
            value={name}
            onChange={ e => setName(e.target.value) }
          />
          <input 
            placeholder="CNPJ" 
            value={cnpj}
            onChange={ e => setCnpj(e.target.value) }
          />
          <input type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />
          <input 
            placeholder="Telefone" 
            value={phoneNumber}
            onChange={ e => setPhoneNumber(e.target.value) }
          />
          <input 
            placeholder="CEP" 
            value={cep}
            onChange={ e => setCep(e.target.value) }
          />
          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={city}
              onChange={ e => setCity(e.target.value) }
            />
            <input 
              style={ {width: 80, textTransform: 'uppercase'} }
              placeholder="UF"
              value={uf}
              onChange={ e => setUf(e.target.value) }
            />
          </div>
          <input 
            placeholder="Bairro" 
            value={neighborhood}
            onChange={ e => setNeighborhood(e.target.value) }
          />
          <input 
            placeholder="Password" 
            value={password}
            onChange={ e => setPassword(e.target.value) }
          />
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../services/api'; 


import '../styles/logon.css';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/session', { email, password });

      localStorage.setItem('drugstoreName', response.data.name)
      localStorage.setItem('drugstoreEmail', response.data.email)
      localStorage.setItem('drugstorePhoneNumber', response.data.phoneNumber)

      history.push('/home');
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className="logon-container">
        <form className="form" onSubmit={handleLogin}>
          <span>Faça seu logon</span>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={ e => setPassword(e.target.value) }
          />
          <button type="submit" className="button" >Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
    </div>
  );
}
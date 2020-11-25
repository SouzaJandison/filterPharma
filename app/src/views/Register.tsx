import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';


import {FiArrowLeft} from 'react-icons/fi';

import api from '../services/api';

import '../styles/register.css';
// import { parse } from 'path';

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

  const [registerErr, setRegisterErr] = useState('');
  const [cepErr, setCepErr] = useState('');
  const [classNameErr, setClassNameErr] = useState('');

  const [disabledCity, setDisabledCity] = useState(false);
  const [disabledUf, setDisabledUf] = useState(false);
  const [disabledNeighborhood, setDisabledNeighborhood] = useState(false);

  const history = useHistory();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    setRegisterErr('');

    try {
      await api.post('drugstore', {
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
      setRegisterErr('Erro no Cadastro tente novamente');
    }
  }

  async function getCep(cep: string) {
    setCepErr('');
    setClassNameErr('');
    const cepFormat = cep.replace('-', '');
    
    const result = await axios.get(`https://viacep.com.br/ws/${cepFormat}/json/`);
    
    if(result.data.erro) {
      setCepErr('CEP invalido!');
      setClassNameErr('error');

      setCity('');
      setUf('');
      setNeighborhood('');

      setDisabledCity(false);
      setDisabledUf(false);
      setDisabledNeighborhood(false);
    } else {
      setCity(result.data.localidade);
      setUf(result.data.uf);
      setNeighborhood(result.data.bairro);

      setDisabledCity(true);
      setDisabledUf(true);
      setDisabledNeighborhood(true);
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
          <span className="text-error">{registerErr}</span>
          <input 
            placeholder="Nome da drogaria" 
            value={name}
            onChange={ e => setName(e.target.value) }
          />
          <InputMask 
            placeholder="CNPJ" 
            mask="99.999.999/9999-99"
            maskChar=""
            value={cnpj}
            onChange={ e => setCnpj(e.target.value) }
          />
          <input type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />
          <InputMask 
            placeholder="Telefone" 
            mask="(99) 99999-9999"
            maskChar=""
            value={phoneNumber}
            onChange={ e => setPhoneNumber(e.target.value) }
          />
          <InputMask 
            placeholder="CEP" 
            mask="99999-999"
            maskChar=""
            value={cep}
            onChange={ e => setCep(e.target.value) }
            onBlur={ e => getCep(e.target.value) }
            className={classNameErr}
          />
          <span className="text-error">{cepErr}</span>
          <div className="input-group">
            <input 
              placeholder="Cidade" 
              disabled={disabledCity}
              value={city}
              onChange={ e => setCity(e.target.value) }
            />
            <input 
              style={ {width: 80, textTransform: 'uppercase'} }
              placeholder="UF"
              disabled={disabledUf}
              maxLength={2}
              value={uf}
              onChange={ e => setUf(e.target.value) }
            />
          </div>
          <input 
            placeholder="Bairro" 
            disabled={disabledNeighborhood}
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
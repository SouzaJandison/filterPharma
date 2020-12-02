import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiShoppingCart, FiCheck, FiTrash, FiPlusSquare, FiXSquare } from 'react-icons/fi';

import api from '../services/api'; 

import '../styles/newProduct.css';

interface IMedicine {
  id: number;
  code: string;
  description: string;
  quantity: string;
  stock: string;
  value: string;
  category: string;
  laboratory: string;
}

export default function NewProduct() {
  const drugstoreName = localStorage.getItem('drugstoreName');
  const drugstoreId = localStorage.getItem('drugstoreId');
  const drugstoreCity = localStorage.getItem('drugstoreCity');
  const drugstoreUf = localStorage.getItem('drugstoreUf');

  const [medicine, setMedicine] = useState<IMedicine[]>([]);
  const [nameMedicineInput, setNameMedicineInput] = useState("");
  const [selectedOptionLab, setSelectedOptionLab] = useState("");
  const [selectedOptionCategory, setSelectedOptionCategory] = useState("");

  const history = useHistory();

  useEffect(() => {
    api.get('/auth', {
      headers: {
        Authorization: drugstoreId
      }
    }).then(response => {
      setMedicine(response.data);
    }).catch(err => {
      history.push('/');
    });
  }, [drugstoreId]);

  async function getMedicine(nameText: string, nameLab: string, nameCategory: string) {
    const response = await api.post('/list', {
      name: nameText,
      laboratory: nameLab,
      category: nameCategory
    });
    console.log(response.data)
    setMedicine(response.data);
  }

  async function clearFilter() {
    setNameMedicineInput("");
    setSelectedOptionLab("");
    setSelectedOptionCategory("");

    const response = await api.post('/list', {});
    setMedicine(response.data);
  }

  function styleCategoryIcon(category: string) {
    if(category === "G") return "td-category-icon td-category-icon-g";
    if(category === "ET") return "td-category-icon td-category-icon-et";
    if(category === "SL") return "td-category-icon td-category-icon-sl";

    return "td-category-icon";
  }

  async function addProduct(id: number) {
    const product = medicine.find(item => item.id === id);
    console.log(product?.code)

    const data = {
      code: product?.code,
      description: product?.description,
      value: product?.value,
      category: product?.category,
      laboratory: product?.laboratory,
      id_drugstore: drugstoreId,
      drugstore: drugstoreId
    }

    const response = await api.post('/product', data);
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }
  
  return(
    <div className="home-container">
      <div className="menu-top">
        <div className="user-infor">
          <span className="title-logo">FilterPharma</span>
          <span className="message-welcome">Bem Vindo, {drugstoreName}</span>
        </div>
        <div className="user-content">
          <FiShoppingCart size={32} color="#adadad"/>
          <FiShoppingBag size={32} color="#adadad"/>
          <div className="user-config">
            <FiUser size={32} color="#adadad"/>
            <div className="user-config-box">
              <ul>
                <li>
                  <button
                    className="button-table"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="newProduct-content">
        <div className="newProduct-top">
          <span className="title">NOVO PEDIDO</span>
          <div className="product-option">
            <div 
              className="product-option-item"
              onClick={() => alert('Teste delete pedido')}
            >
              <span>EXCLUIR PEDIDO</span>
              <FiTrash size={32} color="#333333"/>
            </div>
            <div 
              className="product-option-item"
              onClick={() => alert('Teste enviar pedido')}
            >
              <span>ENVIAR PEDIDO</span>
              <FiCheck size={32} color="#333333"/>
            </div>
          </div>
        </div>
        <div className="newProduct-list">
          <div className="newProduct-list-info">
            <fieldset className="data-client">
              <legend>Farmácia</legend>
              <div className="data-client-item">
                <label>Farmácia: </label>
                <span>{drugstoreName}</span>
              </div>
              <div className="data-client-item">
                <label>CD: </label>
                <span>{drugstoreCity} - {drugstoreUf}</span>
              </div>
              <div className="data-client-item">
                <label>UF: </label>
                <span>{drugstoreUf}</span>
              </div>
              <div className="data-client-item">
                <label>SITUAÇÃO: </label>
                <span>LIBERADO</span>
              </div>
            </fieldset>
            <fieldset className="data-buy">
              <legend>Carrinho</legend>
              <div className="product-value">
                <FiShoppingCart size={64} color="gray"/>
                <span>R$ 0,00</span>
              </div>
              <div className="produto-buy-info">
                <span><strong>TOTAL DE ITENS: </strong>0</span>
                <span><strong>TOTAL DE UNIDADES: </strong>0</span>
              </div>
            </fieldset>
          </div>
          <div className="newProduct-list-table">
            <fieldset className="data-table">
              <legend>Produtos</legend>
              {/* <div className="radio-option">
                <label className="radio-option-title">CONDIÇÃO:</label>
                <div className="radio-option-item">
                  <input type="radio" name="option" value="1"/>
                  <label> MINHA CONDIÇÃO</label>
                </div>
                <div className="radio-option-item">
                  <input type="radio" name="option" value="2"/>
                  <label> OFERTA</label>
                </div>
                <div className="radio-option-item">
                  <input type="radio" name="option" value="3"/>
                  <label> MELHOR DESCONTO</label>
                </div>
                <div className="radio-option-item">
                  <input type="radio" name="option" value="4"/>
                  <label> MELHOR DESC. PRAZO CLIENTE</label>
                </div>
              </div> */}
              <div className="sub-option">
                <div className="sub-option-item">
                  <label>PRODUTO: </label>
                  <input 
                    type="text" 
                    placeholder="Nome do produto..."
                    value={nameMedicineInput}
                    onChange={ e => setNameMedicineInput(e.target.value) }
                  />
                </div>
                <div className="sub-option-item">
                  <label>LABORATÓRIO: </label>
                  <select
                    value={selectedOptionLab}
                    onChange={ e => setSelectedOptionLab(e.target.value) }
                  >
                    <option value="">-- SELECIONE --</option>
                    <option value="PANVEL">PANVEL</option>
                    <option value="SANDOZ">SANDOZ</option>
                    <option value="MEDLEY">MEDLEY</option>
                    <option value="EUROFARMA">EUROFARMA</option>
                    <option value="GERMED">GERMED</option>
                    <option value="ACHE">ACHE</option>
                    <option value="LOBOFARMA">LOBOFARMA</option>
                    <option value="MERCK">MERCK</option>
                    <option value="DIVCOM SA">DIVCOM SA</option>
                    <option value="DAIICHI SANKYO">DAIICHI SANKYO</option>
                    <option value="EMS">EMS</option>
                    <option value="LEGRAND">LEGRAND</option>
                  </select>
                </div>
                <div className="sub-option-item">
                  <label>CATEGORIA: </label>
                  <select
                    value={selectedOptionCategory}
                    onChange={ e => setSelectedOptionCategory(e.target.value) }
                  >
                    <option value="">-- SELECIONE --</option>
                    <option value="G">GENÉRICO</option>
                    <option value="ET">ÉTICO</option>
                    <option value="SL">SIMILAR</option>
                  </select>
                </div>
                <div className="sub-option-item">
                  <button
                    onClick={() => getMedicine(nameMedicineInput, selectedOptionLab, selectedOptionCategory)}
                  >
                    FILTRAR
                  </button>
                </div>
                <div className="sub-option-item">
                  <button
                    onClick={ () => clearFilter() }
                  >
                    LIMPAR
                  </button>
                </div>
              </div>
              <table>
                <tbody>
                  <tr>
                    <th>CÓDIGO</th>
                    <th>DESCRIÇÃO</th>
                    <th>QTDE</th>
                    <th>ESTOQUE</th>
                    <th>PREÇO FÁBRICA</th>
                    <th>CATEGORIA</th>
                    <th>LABORATÓRIO</th>
                    <th></th>
                    <th></th>
                    <th>QTD CARRINHO</th>
                  </tr>
                  {medicine.map(item => (
                    <tr key={item.id}>
                      <td>{item.code}</td>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <div 
                          className={item.stock === "Disponivel" ? "td-circle td-circle-green" : "td-circle td-circle-red"}
                        >
                        </div>
                      </td>
                      <td>R$ {item.value}</td>
                      <td>
                        <div className={styleCategoryIcon(item.category)}>
                          {item.category}
                        </div>
                      </td>
                      <td>{item.laboratory}</td>
                      <td>
                        <button 
                          className="button-table"
                          onClick={ () => addProduct(item.id) }
                        >
                          <FiPlusSquare size={32} color="green"/>
                        </button>
                      </td>
                      <td>
                        <button 
                          className="button-table"
                          onClick={ () => alert('remove') }
                        >
                          <FiXSquare size={32} color="red"/>
                        </button>
                      </td>
                      <td>0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
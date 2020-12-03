import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlusSquare, FiXSquare } from 'react-icons/fi';

import Menu from '../components/Menu';
import NewProductTop from '../components/NewProductTop';
import NewProductUserInfor from '../components/NewProductUserInfor';

import api from '../services/api'; 
import { IMedicine, IProduct } from '../types/interface';

import '../styles/newProduct.css';

export default function NewProduct() {
  const drugstoreName = localStorage.getItem('drugstoreName');
  const drugstoreId = localStorage.getItem('drugstoreId');
  const drugstoreCity = localStorage.getItem('drugstoreCity');
  const drugstoreUf = localStorage.getItem('drugstoreUf');

  const [medicine, setMedicine] = useState<IMedicine[]>([]);
  const [nameMedicineInput, setNameMedicineInput] = useState("");
  const [selectedOptionLab, setSelectedOptionLab] = useState("");
  const [selectedOptionCategory, setSelectedOptionCategory] = useState("");
  const [shoppingCartValue, setShoppingCartValue] = useState(0.00);
  const [shoppingCartItems, setShoppingCartItems] = useState(0);
  const [shoppingCartItemQuantity, setShoppingCartItemQuantity] = useState(0);


  const history = useHistory();

  useEffect(() => {
    api.get('/auth', {
      headers: {
        Authorization: drugstoreId
      }
    }).then(response => {
      setMedicine(response.data);
    }).catch(() => {
      history.push('/');
    });
  }, [drugstoreId]);

  useEffect(() => {
    api.get(`/product/${drugstoreId}`).then( response => {
      const data: IProduct[] = response.data
      let value = 0;
      let itemQuantity = 0;

      data.forEach(item => {
        value = (value + (item.value * item.amount));
        itemQuantity = itemQuantity + item.amount;
      })

      setShoppingCartValue(value);
      setShoppingCartItems(response.data.length);
      setShoppingCartItemQuantity(itemQuantity);
    });
  }, [drugstoreId]);

  async function getMedicine(nameText: string, nameLab: string, nameCategory: string) {
    const response = await api.post('/list', {
      name: nameText,
      laboratory: nameLab,
      category: nameCategory
    });

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

  async function addProduct(
    code: string, 
    description: string,
    value: string,
    category: string,
    laboratory: string
  ) {
    const data = {
      code,
      description,
      value,
      category,
      laboratory,
      id_drugstore: drugstoreId,
      drugstore: drugstoreId
    }

    await api.post('/productAdd', data);

    await updateDataShoppingCart();
  };

  async function removeProduct(
    code: string, 
    description: string,
    value: string,
    category: string,
    laboratory: string
  ) {
    const data = {
      code,
      description,
      value,
      category,
      laboratory,
      id_drugstore: drugstoreId,
      drugstore: drugstoreId
    }

    await api.post('/productRemove', data);

    await updateDataShoppingCart();
  };

  async function updateDataShoppingCart() {
    const response = await api.get(`/product/${drugstoreId}`);
    const data: IProduct[] = response.data;
    let value = 0;
    let itemQuantity = 0;

    data.forEach(item => {
      value = value + (item.value * item.amount);
      itemQuantity = itemQuantity + item.amount;
    })

    setShoppingCartValue(value);
    setShoppingCartItems(data.length);
    setShoppingCartItemQuantity(itemQuantity);
  };
  
  return(
    <div>
      <Menu drugstoreName={drugstoreName} />
      <div>
        <NewProductTop />
        <div className="newProduct-list">
          <NewProductUserInfor 
            drugstoreName={drugstoreName}
            drugstoreCity={drugstoreCity}
            drugstoreUf={drugstoreUf}
            shoppingCartValue={shoppingCartValue}
            shoppingCartItems={shoppingCartItems}
            shoppingCartItemQuantity={shoppingCartItemQuantity}
          />
          <div className="newProduct-list-table">
            <fieldset className="data-table">
              <legend>Produtos</legend>
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
                          disabled={
                            Number(item.quantity) <= 0 ? true : false
                          }
                          onClick={ () => addProduct(
                            item.code, 
                            item.description,
                            item.value,
                            item.category,
                            item.laboratory
                          ) }
                        >
                          <FiPlusSquare 
                            size={32} 
                            color={
                              Number(item.quantity) <= 0 ? "gray" : "green"
                            }
                          />
                        </button>
                      </td>
                      <td>
                        <button 
                          className="button-table"
                          disabled={
                            Number(item.quantity) <= 0 ? true : false
                          }
                          onClick={ () => removeProduct(
                            item.code, 
                            item.description,
                            item.value,
                            item.category,
                            item.laboratory
                          ) }
                        >
                          <FiXSquare 
                            size={32} 
                            color={
                              Number(item.quantity) <= 0 ? "gray" : "red"
                            }
                          />
                        </button>
                      </td>
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
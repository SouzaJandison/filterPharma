import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Menu from '../components/Menu';
import NewProductTop from '../components/NewProductTop';
import NewProductUserInfor from '../components/NewProductUserInfor';

import api from '../services/api'; 
import { IProduct, IListProduct } from '../types/interface';

export default function ShoppingCar() {
  const drugstoreName = localStorage.getItem('drugstoreName');
  const drugstoreId = localStorage.getItem('drugstoreId');
  const drugstoreCity = localStorage.getItem('drugstoreCity');
  const drugstoreUf = localStorage.getItem('drugstoreUf');

  const [listProduct, setListProduct] = useState<IListProduct[]>([])
  const [shoppingCartValue, setShoppingCartValue] = useState(0.00);
  const [shoppingCartItems, setShoppingCartItems] = useState(0);
  const [shoppingCartItemQuantity, setShoppingCartItemQuantity] = useState(0);

  const history = useHistory();

  useEffect(() => {
    api.get('/auth', {
      headers: {
        Authorization: drugstoreId
      }
    }).catch(err => {
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

      setListProduct(response.data);
      setShoppingCartValue(value);
      setShoppingCartItems(response.data.length);
      setShoppingCartItemQuantity(itemQuantity);
    });
  }, [drugstoreId]);

  function styleCategoryIcon(category: string) {
    if(category === "G") return "td-category-icon td-category-icon-g";
    if(category === "ET") return "td-category-icon td-category-icon-et";
    if(category === "SL") return "td-category-icon td-category-icon-sl";

    return "td-category-icon";
  }

  return(
    <div>
      <Menu drugstoreName={drugstoreName} />
      <div>
        <NewProductTop />
        <div>
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
              <table>
                <tbody>
                  <tr>
                    <th>CÓDIGO</th>
                    <th>DESCRIÇÃO</th>
                    <th>QTDE</th>
                    <th>PREÇO FÁBRICA</th>
                    <th>CATEGORIA</th>
                    <th>LABORATÓRIO</th>
                  </tr>
                  {listProduct.map(item => (
                    <tr key={item.id}>
                      <td>{item.code}</td>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                      <td>R$ {item.value}</td>
                      <td>
                        <div className={styleCategoryIcon(item.category)}>
                          {item.category}
                        </div>
                      </td>
                      <td>{item.laboratory}</td>
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
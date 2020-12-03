import React, {} from 'react';
import { FiShoppingCart } from 'react-icons/fi';

import './styles/newProductUserInfor.css';

const NewProductUserInfor: React.FC<any> = ({
  drugstoreName,
  drugstoreCity,
  drugstoreUf,
  shoppingCartValue,
  shoppingCartItems,
  shoppingCartItemQuantity
}) => {
  return(
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
          <span>R$ {shoppingCartValue.toFixed(2)}</span>
        </div>
        <div className="produto-buy-info">
          <span><strong>TOTAL DE ITENS: </strong>{shoppingCartItems}</span>
          <span><strong>TOTAL DE UNIDADES: </strong>{shoppingCartItemQuantity}</span>
        </div>
      </fieldset>
    </div>
  );
}

export default NewProductUserInfor;
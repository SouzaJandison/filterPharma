import React from 'react';
import { FiTrash, FiCheck } from 'react-icons/fi';

import './styles/newProductTop.css';

const NewProductTop = () => {
  return(
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
  );
}

export default NewProductTop;
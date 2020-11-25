import React from 'react';
import { FiUser, FiShoppingBag, FiShoppingCart, FiCheck, FiTrash } from 'react-icons/fi';

import '../styles/newProduct.css';

export default function NewProduct() {
  // const drugstoreName = localStorage.getItem('drugstoreName');
  // const drugstoreEmail = localStorage.getItem('drugstoreEmail');
  return(
    <div className="home-container">
      <div className="menu-top">
        <span className="title-logo">FilterPharma</span>
        <div className="user-content">
          <FiShoppingCart size={32} color="#adadad" className="img"/>
          <FiShoppingBag size={32} color="#adadad" className="img"/>
          <FiUser size={32} color="#adadad"/>
        </div>
      </div>
      <div className="newProduct-content">
        <div className="newProduct-top">
          <span className="title">NOVO PEDIDO</span>
          <div className="product-option">
            <div className="product-delete product-option-item">
              <span>EXCLUIR PEDIDO</span>
              <FiTrash size={32} color="#333333"/>
            </div>
            <div className="product-check product-option-item">
              <span>ENVIAR PEDIDO</span>
              <FiCheck size={32} color="#333333"/>
            </div>
          </div>
        </div>
        <div className="newProduct-list">
          <div className="newProduct-list-info">
            <fieldset className="data-client">
              <legend>Cliente</legend>
              <div className="data-client-item">
                <label>CLIENTE: </label>
                <select name="" id="">
                  <option value="teste">00000 - FARMACIA USER LDTA ME</option>
                </select>
              </div>
              <div className="data-client-item">
                <label>CD: </label>
                <span>LAURO DE FREITAS - BA</span>
              </div>
              <div className="data-client-item">
                <label>UF: </label>
                <span>BA</span>
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
              <div className="radio-option">
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
              </div>
              <div className="sub-option">
                <div className="sub-option-item">
                  <label>PRODUTO: </label>
                  <input type="text" name="" id="" placeholder="Nome do produto..."/>
                </div>
                <div className="sub-option-item">
                  <label>LABORATÓRIO: </label>
                  <select name="" id="">
                    <option value="">-- SELECIONE --</option>
                  </select>
                </div>
                <div className="sub-option-item">
                  <label>CATEGORIA: </label>
                  <select name="" id="">
                    <option value="">-- SELECIONE --</option>
                  </select>
                </div>
              </div>
              <table>
                <tr>
                  <th>CÓDIGO</th>
                  <th>NOME</th>
                  <th>DESCRIÇÃO</th>
                  <th>QTDE</th>
                  <th>ESTOQUE</th>
                  <th>PREÇO FÁBRICA</th>
                  <th>CATEGORIA</th>
                  <th>LABORATÓRIO</th>
                </tr>
                <tr>
                  <td>000000</td>
                  <td>teste</td>
                  <td>20 BI 30 CAP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-green"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-hb">HB</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
                <tr>
                  <td>111111</td>
                  <td>teste</td>
                  <td>ASS INF 20X10 COMP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-red"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-otc">OTC</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
                <tr>
                  <td>222222</td>
                  <td>teste</td>
                  <td>ABLOC 100MG C/30 COMP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-red"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-rx">RX</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
                <tr>
                  <td>333333</td>
                  <td>teste</td>
                  <td>20 BI 30 CAP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-green"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-hb">HB</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
                <tr>
                  <td>444444</td>
                  <td>teste</td>
                  <td>ASS INF 20X10 COMP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-red"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-otc">OTC</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
                <tr>
                  <td>555555</td>
                  <td>teste</td>
                  <td>ABLOC 100MG C/30 COMP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-red"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-rx">RX</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
                <tr>
                  <td>666666</td>
                  <td>teste</td>
                  <td>20 BI 30 CAP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-green"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-hb">HB</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
                <tr>
                  <td>777777</td>
                  <td>teste</td>
                  <td>ASS INF 20X10 COMP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-red"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-otc">OTC</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
                <tr>
                  <td>888888</td>
                  <td>teste</td>
                  <td>ABLOC 100MG C/30 COMP</td>
                  <td>9999</td>
                  <td><div className="td-circle td-circle-red"></div></td>
                  <td>R$ 99,00</td>
                  <td><div className="td-category-icon td-category-icon-rx">RX</div></td>
                  <td>LABORATÓRIO NOME</td>
                </tr>
              </table>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
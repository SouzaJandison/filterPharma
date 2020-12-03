import React from 'react';
import { FiUser, FiShoppingBag, FiShoppingCart } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles/menu.css';

const Menu: React.FC<any> = ({ drugstoreName }) => {
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  };

  return(
    <div className="menu-top">
      <div className="user-infor">
        <Link to="/home" className="link-page">
          <span className="title-logo">FilterPharma</span>
        </Link>
        <span className="message-welcome">Bem Vindo, {drugstoreName}</span>
      </div>
      <div className="user-content">
        <Link to="/shoppingCar">
          <FiShoppingCart size={32} color="#adadad"/>
        </Link>
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
  );
}

export default Menu;
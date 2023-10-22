import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUsers, FaUserPlus, FaUserTimes, FaUserEdit } from 'react-icons/fa'

import './menu.scss'

function MenuAdm() {
  return (
    <div>
      <input id="hamburger" className="hamburger" type="checkbox" />
      <label htmlFor="hamburger" className="hamburger">
        <i></i>
        <p>
          <p className='close'></p>
          <p className='open'></p>
        </p>
      </label>
      <nav className="primnav">
        <ul>
          <li id='ps'>
            <Link to="/list-fisio">
              <FaUsers className="icon" />
              Fisioterapeutas <br /> cadastrados
            </Link>
          </li>
          <li id='add-f'>
            <Link to="/adicionar-fisio">
              <FaUserPlus className="icon" />
              Adicionar <br />fisioterapeuta
            </Link>
          </li>
          <li id='rm-f'>
            <Link to="/remover-fisio">
              <FaUserTimes className="icon" />
              Remover <br /> fisioterapeuta
            </Link>
          </li>
          <li id='att-f'>
            <Link to="/atualizar-fisio">
              <FaUserEdit className="icon" />
              Atualizar <br /> fisioterapeuta
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaSignOutAlt className="icon" />
              Sair
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuAdm;

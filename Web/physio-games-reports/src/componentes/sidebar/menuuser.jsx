import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUsers, FaUserPlus, FaUserTimes } from 'react-icons/fa'

import './menu.scss'

function Menu() {
  return (
    <div>
      <input id="hamburger" className="hamburger" type="checkbox" />
      <label htmlFor="hamburger" className="hamburger">
        <i></i>
        <div>
          <p className='close'></p>
          <p className='open'></p>
        </div>
      </label>
      <nav className="primnav">
        <ul>
          <li id='ps'>
            <Link to="/list-pacientes">
              <FaUsers className="icon" />
              Pacientes
            </Link>
          </li>
          <li id='add-p'>
            <Link to="/adicionar-paciente">
              <FaUserPlus className="icon" />
              Adicionar <br />paciente
            </Link>
          </li>
          <li id='rm-p'>
            <Link to="/remover-paciente">
              <FaUserTimes className="icon" />
              Remover <br /> paciente
            </Link>
          </li>
          <li>
            <Link to="/login-fisio">
              <FaSignOutAlt className="icon" />
              Sair
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;

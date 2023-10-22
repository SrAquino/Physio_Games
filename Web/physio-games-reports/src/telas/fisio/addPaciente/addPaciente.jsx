import React, { useState } from 'react'

import Menu from '../../../componentes/sidebar/menuuser'
import Header from '../../../componentes/header/header'

import './addPaciente.scss'


export default function AddPaciente() {
  const [user, setUser] = useState('');

  const handleSubmit = async (event) => {
    //event.preventDefault();
  };

  const handleUserChange = (event) => {
    if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
      setUser(event.target.value);
    }
  };

  return (
    <>
      <Header />
      <Menu />

      <div className="add-patient-area">
        <label className='tag_longa'>Adicionar paciente</label>

        <div className="add-patiente">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-item">
              <input className="input" type="text" name="nome" required="required" autoComplete='false' value={user} onChange={handleUserChange} />
              <label className="label" htmlFor="nome">Nome</label>
            </div>
            <button>Adicionar</button>
          </form>
        </div>
      </div>

    </>
  )
}

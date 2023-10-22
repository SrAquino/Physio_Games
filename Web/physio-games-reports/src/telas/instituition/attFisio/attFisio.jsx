import React, { useState } from 'react'

import MenuAdm from '../../../componentes/sidebar/menuadm'
import Header from '../../../componentes/header/header'
import Buscar from '../../../componentes/buscar/buscar'

import './attFisio.scss'


export default function AttFisio() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    //event.preventDefault();
  };

  const handleUserChange = (event) => {
    if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
      setUser(event.target.value);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Header />
      <MenuAdm />

      <div className="att-fisio-area">
        <label className='tag_longa'>Atualziar informações de um Fisioterapeuta</label>

        <Buscar />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-item">
            <input className="input" type="text" name="nome" required="required" autoComplete='false' value={user} onChange={handleUserChange} />
            <label className="label" htmlFor="nome">Nome</label>
          </div>

          <div className="form-item">
            <input className="input" type="password" name="senha" required="required" autoComplete='false' value={password} onChange={handlePasswordChange} />
            <label className="label" htmlFor="senha">Senha</label>
          </div>

          <button>Atualizar</button>
        </form>

      </div>

    </>
  )
}

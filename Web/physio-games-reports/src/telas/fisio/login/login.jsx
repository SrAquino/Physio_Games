import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";


import Header from '../../../componentes/header/header'
import '../../../componentes/divs/divs.scss'
import Footer from '../../../componentes/footer/footer';
import './login.scss'

export default function LoginFisio() {
  const navigate = useNavigate();


  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [instituitions, setInstituitions] = useState(['SRF-Bagé', 'SRF-D']);
  const [inst, setInst] = useState('');

  const handleChangeInst = (event) => {
    setInst(event.target.value);
  };


  const handleUserChange = (event) => {
    if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
      setUser(event.target.value);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/list-pacientes');

  };

  const loginInstituition = async (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <>
      <Header />

      <div className='login_area'>


        <div id="title">
          <label className='tag_longa' id='title' htmlFor="">Login de Fisioterapeuta</label>

        </div>

        <div className="login">
          <form className="form" onSubmit={handleSubmit}>
            <div className="instituition">
              <label className='tag'>Instituição</label>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={inst}
                onChange={handleChangeInst}
                label="Age"
                required="true"
              >
                {instituitions.map((inst) => (
                  <MenuItem key={inst} value={inst}>
                    {inst}
                  </MenuItem>
                ))}
              </Select></div>

            <div className="form-item">
              <input className="input" type="text" name="nome" required="required" autoComplete='false' value={user} onChange={handleUserChange} />
              <label className="label" htmlFor="nome">Nome</label>
            </div>

            <div className="form-item">
              <input className="input" type="password" name="senha" required="required" autoComplete='false' value={password} onChange={handlePasswordChange} />
              <label className="label" htmlFor="senha">Senha</label>
            </div>

            <button type='submit'>Entrar</button>
          </form>
          <form onSubmit={loginInstituition}>
            <button type='submit'>É uma instituição?</button>
          </form>
          <p><button id='forget-pass'>Esqueceu a senha?</button></p>
        </div>
      </div>
      <Footer />
    </>
  );
}

import React, { useState } from 'react'
import { collection, doc, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import db from '../../../assets/config/db.js';
import MenuAdm from '../../../componentes/sidebar/menuadm'
import Header from '../../../componentes/header/header'


import './addFisio.scss'
import { createUser } from '../../../context/auth.js';

export default function AddFisio() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      createUser(email, password);

      const recoveredUser = localStorage.getItem('user');
      const InstituitionEmail = JSON.parse(recoveredUser).email;

      const userDocRef = doc(db, "Instituitions", InstituitionEmail);
      const fisiosCollectionRef = collection(userDocRef, "Fisios");

      await addDoc(fisiosCollectionRef, {
        name: user,
        email: email,
      });


      navigate('/list-fisio');

    } catch (e) {
      console.error(e)
    }
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  return (
    <>
      <Header />
      <MenuAdm />

      <div className="add-fisio-area">
        <label className='tag_longa'>Adicionar fisioterapeuta</label>

        <div className="add-fisio">

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-item">
              <input className="input" type="text" name="nome" required="required" autoComplete='false' value={user} onChange={handleUserChange} />
              <label className="label" htmlFor="nome">Nome</label>
            </div>
            <div className="form-item">
              <input className="input" type="text" name="nome" required="required" autoComplete='false' value={email} onChange={handleEmailChange} />
              <label className="label" htmlFor="nome">E-mail</label>
            </div>

            <div className="senha">

              <div className="form-item">
                <input className="input" type="password" name="nome" required="required" autoComplete='false' value={password} onChange={handlePasswordChange} />
                <label className="label" htmlFor="nome">Senha</label>
              </div>
              <div className="form-item">
                <input className="input" type="password" name="nome" required="required" autoComplete='false' value={password} onChange={handlePasswordChange} />
                <label className="label" htmlFor="nome">Repetir senha</label>
              </div>

            </div>
            <button>Adicionar</button>
          </form>

        </div>
      </div>

    </>
  )
}

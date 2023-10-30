import React, { useState } from 'react'
import { collection, addDoc, doc } from "firebase/firestore";

import Menu from '../../../componentes/sidebar/menuuser'
import Header from '../../../componentes/header/header'
import db from '../../../assets/config/db'

import './addPaciente.scss'
import { useNavigate } from 'react-router-dom';


export default function AddPaciente() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const instituitionEmail = String(localStorage.getItem('inst')).replace(/['"]+/g, '');
      console.log(instituitionEmail);
      const instDocRef = doc(db, 'Instituitions', instituitionEmail);
      const pacientesCollectionRef = collection(instDocRef, 'Pacientes');

      const docRef = await addDoc(pacientesCollectionRef, {
        name: user,
      });

      console.log("Documento adicionado com ID: ", docRef.id);
      navigate("/list-pacientes")


    } catch (e) {
      console.error("Error adding document: ", e);
    }
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

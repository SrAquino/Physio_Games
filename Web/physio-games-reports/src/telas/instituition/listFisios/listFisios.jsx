import React, { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { collection, getDocs } from "firebase/firestore";

import Buscar from '../../../componentes/buscar/buscar'
import MenuAdm from '../../../componentes/sidebar/menuadm'
import Header from '../../../componentes/header/header'
import db from '../../../assets/config/db.js';

import './listFisios.scss'

export default function ListFisios() {
  const [fisios, setFisios] = useState([{}]);

  useEffect(() => {
    const carregarFisios = async () => {
      const recoveredUser = localStorage.getItem('user');
      const InstituitionEmail = JSON.parse(recoveredUser).email;
      const querySnapshot = await getDocs(collection(db, 'Instituitions', InstituitionEmail, 'Fisios'));

      const fisiosData = [];
      querySnapshot.forEach((doc) => {
        fisiosData.push({ id: doc.id, ...doc.data() });
      });

      setFisios(fisiosData);
    };

    carregarFisios();
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header />
      <MenuAdm />
      <div className="list-fisios-area">
        <div className="title">
          <label className='tag_longa'>Todos os fisioterapeutas</label>
          <Buscar />
        </div>


        <div className="fisios">
          {fisios.map((fisio) => (
            <div className="card" key={fisio._id}>
              <FaUserCircle />
              <button className='tag' value={fisio}>
                {fisio.name}
              </button>
            </div>

          ))}

        </div>
      </div>

    </>
  )
}

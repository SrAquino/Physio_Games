import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'


import Buscar from '../../../componentes/buscar/buscar'
import MenuAdm from '../../../componentes/sidebar/menuadm'
import Header from '../../../componentes/header/header'

import './listFisios.scss'

export default function ListFisios() {
  const [fisios, setFisios] = useState([{id:1,nome:'Douglas'},{id:2,nome:'Julio'}]);

  const seter = () => {
    setFisios()
  }
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
            <div className="card" key={fisio.id}>
              <FaUserCircle />
              <button onSubmit={seter} className='tag'  value={fisio}>
                {fisio.nome}
              </button>
            </div>

          ))}

        </div>
      </div>

    </>
  )
}

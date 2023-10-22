import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'


import Buscar from '../../../componentes/buscar/buscar'
import MenuAdm from '../../../componentes/sidebar/menuadm'
import Header from '../../../componentes/header/header'
import './listFisios.scss'

export default function ListFisios() {
  const [fisios, setFisios] = useState(['1', '2', '3']);

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
            <div className="card">
              <FaUserCircle />
              <button className='tag' key={fisio} value={fisio}>
                {fisio}
              </button>
            </div>

          ))}

        </div>
      </div>


    </>
  )
}

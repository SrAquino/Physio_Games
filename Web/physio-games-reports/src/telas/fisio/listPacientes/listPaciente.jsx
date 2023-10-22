import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';



import Buscar from '../../../componentes/buscar/buscar'
import Menu from '../../../componentes/sidebar/menuuser'
import Header from '../../../componentes/header/header'
import './listPacientes.scss'

export default function ListPacientes() {
  const [pacientes, setPacientes] = useState(['1', '2', '3', '4', '5']);

  const seter = () => {
    setPacientes([]);
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="list-pacientes-area">
        <Buscar />


        <div className="pacientes">
          {pacientes.map((paciente) => (
            <div className="card" key={paciente}>
              <FaUserCircle />
              <Link to="/info-paciente">
                <button onSubmit={seter} className='tag'  value={paciente}>

                  {paciente}

                </button>
              </Link>
            </div>

          ))}

        </div>
      </div>


    </>
  )
}

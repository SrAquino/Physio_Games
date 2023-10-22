import React from 'react'

import Menu from '../../../componentes/sidebar/menuuser'
import Header from '../../../componentes/header/header'
import Buscar from '../../../componentes/buscar/buscar'

import './rmPaciente.scss'


export default function RmPaciente() {
  
  /*
  const [user, setUser] = useState('');

  const handleSubmit = async (event) => {
    //event.preventDefault();
  };

  const handleUserChange = (event) => {
    if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
      setUser(event.target.value);
    }
  };
  */

  return (
    <>
      <Header />
      <Menu />

      <div className="rm-patient-area">
        <label className='tag_longa'>Remover paciente</label>

        <Buscar />
        <label className='tag_longa'>{'user'}</label>
        <button>Remover</button>

      </div>

    </>
  )
}

import React from 'react'

import MenuAdm from '../../../componentes/sidebar/menuadm'
import Header from '../../../componentes/header/header'
import Buscar from '../../../componentes/buscar/buscar'

import './rmFisio.scss'


export default function RmFisio() {
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
      <MenuAdm />

      <div className="rm-fisio-area">
        <label className='tag_longa'>Remover fisioterapeuta</label>

        <Buscar />
        <form>

          <label className='tag_longa'>{'user'}</label>
          <button>Remover</button>

        </form>

      </div>

    </>
  )
}

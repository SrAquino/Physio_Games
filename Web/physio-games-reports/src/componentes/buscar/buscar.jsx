import React, { useEffect, useState } from 'react'
import './buscar.scss'

export default function Buscar() {
  const [user, setUser] = useState('');
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    setPesquisa('Teste');
  
    return () => {
      
    }
  }, [])
  

  const handleUserChange = (event) => {
    if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
      setUser(event.target.value);
    }
  };



  return (
    <>
      <div className="buscar">
        <div className="form-item">
          <input className="input" type="text" name="nome" required="required" autoComplete='false' value={user} onChange={handleUserChange} />
          <label className="label" htmlFor="nome">{pesquisa}</label>
        </div>
        <button>Pesquisar</button>
      </div>
    </>
  )
}


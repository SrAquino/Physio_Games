import React, { useState } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import MenuAdm from '../../../componentes/sidebar/menuadm';
import Header from '../../../componentes/header/header';
import Buscar from '../../../componentes/buscar/buscar';
import './attFisio.scss';

export default function AttFisio() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

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

    // Obtém a referência do documento do fisioterapeuta no Firestore
    const db = getFirestore();
    const fisioDocRef = doc(db, 'Instituitions', 'douglasaquino4@gmail.com', 'Fisios', 'ID_DO_FISIOTERAPEUTA');

    // Atualiza os campos do documento
    await updateDoc(fisioDocRef, {
      nome: user,
      senha: password,
      // Adicione outros campos conforme necessário
    });

    // Limpa os campos do formulário após a atualização
    setUser('');
    setPassword('');
  };

  return (
    <>
      <Header />
      <MenuAdm />

      <div className="att-fisio-area">
        <label className='tag_longa'>Atualizar informações de um Fisioterapeuta</label>

        <Buscar />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-item">
            <input className="input" type="text" name="nome" required autoComplete='false' value={user} onChange={handleUserChange} />
            <label className="label" htmlFor="nome">Nome</label>
          </div>

          <div className="form-item">
            <input className="input" type="password" name="senha" required autoComplete='false' value={password} onChange={handlePasswordChange} />
            <label className="label" htmlFor="senha">Senha</label>
          </div>

          <button type="submit">Atualizar</button>
        </form>
      </div>
    </>
  );
}

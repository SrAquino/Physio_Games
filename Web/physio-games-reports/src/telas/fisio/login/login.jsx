import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';


import Header from '../../../componentes/header/header';
import Footer from '../../../componentes/footer/footer';
import './login.scss';
import db from '../../../assets/config/db';

export default function LoginFisio() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [instituitions, setInstituitions] = useState(['SRF-Bagé', 'SRF-D']);
  const [inst, setInst] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstituitions = async () => {
      const instituitionsCollection = collection(db, 'Instituitions');
      const instituitionsSnapshot = await getDocs(instituitionsCollection);

      const instituitionsData = [];
      instituitionsSnapshot.forEach((doc) => {
        instituitionsData.push(doc.id);
      });

      setInstituitions(instituitionsData);
    };

    fetchInstituitions();
  }, []); // Executa apenas uma vez durante a montagem do componente


  const handleChangeInst = (event) => {
    setInst(event.target.value);
  };

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
    
    // Lógica de autenticação
    // Verificar as credenciais no Firestore e autenticar fisioterapeuta
    // Se válido, navegar para a página correta, senão, exibir uma mensagem de erro.
    
    if (user && password && inst) {
      // Exemplo de navegação bem-sucedida
      navigate('/list-pacientes');
    } else {
      setError('Credenciais inválidas. Por favor, verifique seus dados.');
    }
  };

  const loginInstituition = (event) => {
    event.preventDefault();
    // Adicione lógica para lidar com a autenticação de instituições
    // Isso pode envolver uma rota diferente ou uma lógica específica para instituições
    navigate('/');
  };

  return (
    <>
      <Header />

      <div className='login_area'>
        <div id="title">
          <label className='tag_longa' id='title' htmlFor="">Login de Fisioterapeuta</label>
        </div>

        <div className="login">
          <form className="form" onSubmit={handleSubmit}>
            <div className="instituition">
              <label className='tag'>Instituição</label>
              <select
                value={inst}
                onChange={handleChangeInst}
                required={true}
              >
                <option value="">Selecione...</option>
                {instituitions.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-item">
              <input className="input" type="text" name="nome" required autoComplete='false' value={user} onChange={handleUserChange} />
              <label className="label" htmlFor="nome">Nome</label>
            </div>

            <div className="form-item">
              <input className="input" type="password" name="senha" required autoComplete='false' value={password} onChange={handlePasswordChange} />
              <label className="label" htmlFor="senha">Senha</label>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type='submit'>Entrar</button>
          </form>

          <form onSubmit={loginInstituition}>
            <button type='submit'>É uma instituição?</button>
          </form>

          <p><button id='forget-pass'>Esqueceu a senha?</button></p>
        </div>
      </div>

      <Footer />
    </>
  );
}

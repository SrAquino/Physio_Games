import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

import Header from '../../../componentes/header/header';
import Footer from '../../../componentes/footer/footer';
import './login.scss';
import db from '../../../assets/config/db';
import { AuthContext } from '../../../context/auth';


export default function LoginFisio() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);


  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [instituitions, setInstituitions] = useState([]);
  const [selInst, setInst] = useState('');
  const [err, setErr] = useState('');


  useEffect(() => {
    const fetchInstituitions = async () => {
      const instituitionsCollection = collection(db, 'Instituitions');
      const instituitionsSnapshot = await getDocs(instituitionsCollection);

      const instituitionsData = [];
      instituitionsSnapshot.forEach((doc) => {
        instituitionsData.push(doc.data());
      });

      setInstituitions(instituitionsData);
      
    };

    fetchInstituitions();
  }, []);


  const handleChangeInst = (event) => {
    setInst(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginUser(user, password, selInst);
      navigate('/list-pacientes');

    } catch (e) {
      setErr(e.message);

    }
  };

  const loginInstituition = (event) => {
    event.preventDefault();
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
                onChange={handleChangeInst}
                required={true}
              >
                <option>Selecione...</option>
                {instituitions.map((inst) => (
                  <option key={inst.displayName} value={inst.email}>
                    {inst.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-item">
              <input className="input" type="text" name="nome" required autoComplete='false' value={user} onChange={handleUserChange} />
              <label className="label" htmlFor="nome">E-mail</label>
            </div>

            <div className="form-item">
              <input className="input" type="password" name="senha" required autoComplete='false' value={password} onChange={handlePasswordChange} />
              <label className="label" htmlFor="senha">Senha</label>
            </div>

            <button type='submit'>Entrar</button>
            <pre style={{ color: "red", fontSize: "2em" }}>{err}</pre>
          </form>

          <form onSubmit={loginInstituition}>
            <button type='submit'>É uma instituição?</button>
          </form>

          <form>
            <button id='forget-pass'>Esqueceu a senha?</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

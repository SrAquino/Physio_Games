import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Header from '../../../componentes/header/header'
import '../../../componentes/divs/divs.scss'
import Footer from '../../../componentes/footer/footer';
import './login.scss'
import { AuthContext } from '../../../backend/auth';

export default function Login() {
  const navigate = useNavigate();

  const {loginUser} = useContext(AuthContext)

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('');


  const handleUserChange = (event) => {
    //if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
      setUser(event.target.value);
    //}
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginUser(user,password);
      navigate('/list-fisio');
    } catch (e) {
      setErr(e.code)
    }
  };

  const loginFisio = async (event) => {
    event.preventDefault();
    navigate('/login-fisio');
  };

  return (
    <>
      <Header />

      <div className='login_area'>
        <div id="title">
          <label className='tag_longa'>Login de Instituição</label>
        </div>



        <div className="login">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-item">
              <input className="input" type="text" id="email" required="required" autoComplete='false' value={user} onChange={handleUserChange} />
              <label className="label" htmlFor='email'>E-mail</label>
            </div>

            <div className="form-item">
              <input className="input" type="password" id="senha" required="required" autoComplete='false' value={password} onChange={handlePasswordChange} />
              <label className="label" htmlFor='senha'>Senha</label>
            </div>

            <button>Entrar</button>
            <pre style={{color:"red", fontSize:"2em"}}>{err}</pre>
          </form>
          <form onSubmit={loginFisio}>
            <button type='submit'>É um fisioterapeuta?</button>
          </form>
          <p><button id='forget-pass'>Esqueceu a senha?</button></p>
          <Link to="/registrar-instituition">
            <button>Registrar</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
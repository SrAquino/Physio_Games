import React, { useContext, useState } from 'react';

import Header from '../../componentes/header/header'
import '../../componentes/divs/divs.scss'
import Footer from '../../componentes/footer/footer';
import './forgetpass.scss'
import { AuthContext } from '../../context/auth';

export default function ForgetPass() {

  const { recPass } = useContext(AuthContext);

  const [user, setUser] = useState('');
  const [err, setErr] = useState('');


  const handleUserChange = (event) => {
    setUser(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await recPass(user);
      setErr("E-mail de recuperação enviado!");
    } catch (e) {
      setErr(e.code);
    }
  };


  return (
    <>
      <Header />

      <div className='login_area'>
        <div id="title">
          <label className='tag_longa'>Esqueci minha senha</label>
        </div>

        <div className="login">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-item">
              <input className="input" type="text" id="email" required="required" autoComplete='false' value={user} onChange={handleUserChange} />
              <label className="label" htmlFor='email'>E-mail</label>
            </div>

            <button type='submit'>Alterar senha</button>
            <pre style={{ color: "red", fontSize: "2em" }}>{err}</pre>
          </form>

        </div>
      </div>
      <Footer />
    </>
  );
}

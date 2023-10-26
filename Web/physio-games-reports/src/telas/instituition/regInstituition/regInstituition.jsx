import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Header from '../../../componentes/header/header'
import { createInstituition } from '../../../context/auth';

import './regInstituition.scss'

export default function RegInstituition() {
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //const [logado, setLogado] = useState('');
    const [err, setErr] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const instituitionId = await createInstituition(email, senha, user);
            console.log(`Instituição criada com ID: ${instituitionId}`);
            navigate('/');
        } catch (e) {
            console.error(e);
            setErr(e.code)
        }
    };

    const handleUserChange = (event) => {
        if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
            setUser(event.target.value);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    return (
        <>
            <Header />

            <div className="reg-instituition-area">
                <label className='tag_longa'>Registrar instituição</label>

                <div className="add-fisio">

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-item">
                            <input className="input" type="text" name="nome" required="required" autoComplete='false' value={user} onChange={handleUserChange} />
                            <label className="label" htmlFor="nome">Nome</label>
                        </div>

                        <div className="form-item">
                            <input className="input" type="text" name="email" required="required" autoComplete='false' value={email} onChange={handleEmailChange} />
                            <label className="label" htmlFor="email">Email</label>
                        </div>

                        <div className="senha">

                            <div className="form-item">
                                <input className="input" type="password" name="senha" required="required" autoComplete='false' value={senha} onChange={handleSenhaChange} />
                                <label className="label" htmlFor="senha">Senha</label>
                            </div>
                            <div className="form-item">
                                <input className="input" type="password" name="compare" required="required" autoComplete='false' value={senha} onChange={handleSenhaChange} />
                                <label className="label" htmlFor="compare">Repetir senha</label>
                            </div>

                        </div>
                        <Link to="/">
                            <button>Voltar</button>
                        </Link>
                        <button type='submit'>Registrar</button>
                        <pre style={{color:"red", fontSize:"2em"}}>{err}</pre>
                    </form>

                </div>
            </div>

        </>
    )
}

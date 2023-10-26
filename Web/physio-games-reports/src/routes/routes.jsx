import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from '../context/auth';

//Instituição
import LoginPage from '../telas/instituition/login/login'

//Fisio
import AddPaciente from '../telas/fisio/addPaciente/addPaciente';
import InfoPaciente from '../telas/fisio/infoPaciente/infoPaciente';
import ListPacientes from '../telas/fisio/listPacientes/listPaciente';
import LoginFisio from '../telas/fisio/login/login';
import RmPaciente from '../telas/fisio/rmPaciente/rmPaciente';
import AddFisio from '../telas/instituition/addFisio/addFisio';
import AttFisio from '../telas/instituition/attFisio/attFisio';
import RmFisio from '../telas/instituition/rmFisio/rmFisio';
import ListFisios from '../telas/instituition/listFisios/listFisios';
import RegInstituition from '../telas/instituition/regInstituition/regInstituition';

export default function AppRoutes() {

  const Private = ({children}) => {
    const { authenticated, loading } = useContext(AuthContext);
      
      if(loading){
        return <div className='loading'>Carregando...</div>
      }
      
      if(!authenticated){
        return <Navigate to='/'/>
      }
      return children;
    }


return (
  <BrowserRouter>
    <AuthProvider>
      <Routes>

        <Route path="/" element={< LoginPage />} />
        <Route path='/login-fisio' element={< LoginFisio />} />

        <Route path='/adicionar-paciente' element={<Private>< AddPaciente /></Private>} />
        <Route path='/info-paciente' element={<Private>< InfoPaciente /></Private>} />
        <Route path='/list-pacientes' element={<Private>< ListPacientes /></Private>} />
        <Route path='/remover-paciente' element={<Private>< RmPaciente /></Private>} />

        <Route path='/registrar-instituition' element={< RegInstituition />} />

        <Route path='/adicionar-fisio' element={<Private>< AddFisio /></Private>} />
        <Route path='/atualizar-fisio' element={<Private>< AttFisio /></Private>} />
        <Route path='/remover-fisio' element={<Private>< RmFisio /></Private>} />
        <Route path='/list-fisio' element={<Private>< ListFisios /></Private>} />









      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
}
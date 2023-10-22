import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/" element={< LoginPage />} />
        <Route path='/login-fisio' element={< LoginFisio />} />
        
        <Route path='/adicionar-paciente' element={< AddPaciente />} />
        <Route path='/info-paciente' element={< InfoPaciente />} />
        <Route path='/list-pacientes' element={< ListPacientes />} />
        <Route path='/remover-paciente' element={< RmPaciente />} />

        <Route path='/registrar-instituition' element={< RegInstituition />} />

        <Route path='/adicionar-fisio' element={< AddFisio />} />
        <Route path='/atualizar-fisio' element={< AttFisio />} />
        <Route path='/remover-fisio' element={< RmFisio />} />
        <Route path='/list-fisio' element={< ListFisios />} />


        






      </Routes>

    </BrowserRouter>
  )
}
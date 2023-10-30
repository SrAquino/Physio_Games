import React, { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Buscar from '../../../componentes/buscar/buscar'
import Menu from '../../../componentes/sidebar/menuuser'
import Header from '../../../componentes/header/header'
import './listPacientes.scss'
import db from '../../../assets/config/db';

export default function ListPacientes() {
  const navigate = useNavigate()
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const instituitionEmail = String(localStorage.getItem('inst')).replace(/['"]+/g, '');
        const instDocRef = collection(db, 'Instituitions', instituitionEmail, 'Pacientes');
        const pacientesSnapshot = await getDocs(instDocRef);

        const pacientesData = [];
        pacientesSnapshot.forEach((doc) => {
          pacientesData.push({ id: doc.id, ...doc.data() });
        });

        setPacientes(pacientesData);
      } catch (error) {
        console.error('Error fetching patients: ', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleSelectPaciente = (event) => {
    event.preventDefault();
    
    localStorage.setItem("paciente", JSON.stringify(event.target.value))
    navigate("/info-paciente");
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="list-pacientes-area">
        <Buscar />


        <div className="pacientes">
          {pacientes.map((paciente) => (
            <div className="card" key={paciente.id}>
              <FaUserCircle />
              <Link to="">
                    
                <button className='tag' onClick={handleSelectPaciente} value={paciente.id}>

                  {paciente.name}

                </button>
              </Link>
            </div>

          ))}

        </div>
      </div>


    </>
  )
}

import React, { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ReactApexChart from 'react-apexcharts';

import Menu from '../../../componentes/sidebar/menuuser'
import Header from '../../../componentes/header/header'
import './infoPaciente.scss'
import db from '../../../assets/config/db';
import { collection, getDocs } from 'firebase/firestore';


export default function InfoPaciente() {
  const [nome, setNome] = useState('');
  const [jogos, setJogos] = useState(['']);
  const [variaveis, setVariaveis] = useState(['']);

  const [jogo, setJogo] = useState('');
  const [variavel, setVariavel] = useState('');

  const [partidas, setPartidas] = useState([{}]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const paciente = String(localStorage.getItem('paciente')).replace(/['"]+/g, '');
        setNome(paciente);

        const instituitionEmail = String(localStorage.getItem('inst')).replace(/['"]+/g, '');
        const instDocRef = collection(db, 'Instituitions', instituitionEmail, 'Pacientes', paciente, "Partida");
        const pacientesSnapshot = await getDocs(instDocRef);

        const partidasData = [];
        pacientesSnapshot.forEach((doc) => {
          //console.log(doc.data())
          partidasData.push({id: doc.id, score: doc.data().Score, data: doc.data().Data});
        });

        setPartidas(partidasData);
        console.log(partidas)


      } catch (e) {
        console.error(e);

      }
    }

    fetchPacientes();

    
    setJogos(['jogo 1', 'jogo 2', 'jogo 3'])
    setVariaveis(['Pontuação', 'Desempenho', 'Dificuldade'])
    return () => { }
  }, [])



  const options = {
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  const series = [{
    name: 'Teste',
    data: partidas.map((entry) => {
      return {
        x: entry.id,
        y: entry.score,
      };
    })
  }];

  const handleChangeJogo = (event) => {
    setJogo(event.target.value);
  };

  const handleChangeVar = (event) => {
    setVariavel(event.target.value);
  };


  return (
    <>
      <Header />
      <Menu />

      <div className="info-patient-area">
        <div className="selects">
          <label className='tag_longa'>{nome}</label>
          <form action="">
            <select
              id="demo-simple-select-standard"
              value={jogo}
              onChange={handleChangeJogo}
              label="Age"
            >
              {jogos.map((jogo) => (
                <option key={jogo} value={jogo}>
                  {jogo}
                </option>
              ))}
            </select>

            <select
              id="demo-simple-select-standard"
              value={variavel}
              onChange={handleChangeVar}
              label="Age"
              required={true}
            >
              {variaveis.map((variavel) => (
                <option key={variavel} value={variavel}>
                  {variavel}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className="info-patiente">
          <label className='tag_longa'>Grafico de {variavel} x Sessão</label>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            width={640}
            height={480} />
        </div>
      </div>

    </>
  )
}

import React, { useState, useEffect } from 'react'
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

  const [series, setSeries] = useState([{}]);
  const [selectedVariavel, setSelectedVar] = useState('')


  const instituitionEmail = String(localStorage.getItem('inst')).replace(/['"]+/g, '');

  useEffect(() => {
    const paciente = String(localStorage.getItem('paciente')).replace(/['"]+/g, '');
    setNome(paciente);

    /*const fetchPacientes = async () => {
      try {
        
      } catch (e) {
        console.error(e);
      }
    }

    fetchPacientes();*/


    setJogos(['AsteroideTerapia', 'PongTerapia'])
    setVariaveis(['Pontuação', 'Tempo', 'Movimentos'])
    return () => { }
  }, [])

  useEffect(() => {
    console.log(partidas)
    setSeries([{
      name: 'Teste',
      data: partidas.map((entry) => {
        return {
          x: entry.id,
          y: entry[selectedVariavel],
        };
      })
    }])


  }, [partidas, selectedVariavel])




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

  const handleChangeJogo = async (event) => {
    setJogo(event.target.value);

    const instDocRef = collection(db, 'Instituitions', instituitionEmail, 'Pacientes', nome, "Jogos", event.target.value, 'Sessões');
    const pacientesSnapshot = await getDocs(instDocRef);

    const partidasData = [];
    pacientesSnapshot.forEach((doc) => {
      partidasData.push({ id: doc.id, score: doc.data().Score, time: doc.data().Time, data: doc.data().Data, moves: doc.data().Movimentos });
    });

    setPartidas(partidasData);
  };

  const handleChangeVar = (event) => {
    setVariavel(event.target.value);

    switch (event.target.value) {
      case 'Pontuação':
        setSelectedVar('score');
        break;

      case 'Tempo':
        setSelectedVar('time');
        break;

      case 'Movimentos':
        setSelectedVar('moves');
        break;
      default:
        setSelectedVar('_');
    }
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
              <option value="_">Selecione um jogo</option>
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
              <option value="_">Selecione uma variável</option>
              {variaveis.map((variavel) => (
                <option key={variavel} value={variavel}>
                  {variavel}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className="info-patiente">
          <label className='tag_longa'>Grafico de {variavel} x Sessão no jogo {jogo}</label>
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

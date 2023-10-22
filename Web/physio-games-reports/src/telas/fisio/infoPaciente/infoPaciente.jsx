import React, { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ReactApexChart from 'react-apexcharts';

import Menu from '../../../componentes/sidebar/menuuser'
import Header from '../../../componentes/header/header'
import './infoPaciente.scss'

export default function InfoPaciente() {
  const [nome, setNome] = useState('Douglas Paciente');
  const [jogos, setJogos] = useState(['']);
  const [variaveis, setVariaveis] = useState(['']);

  const [jogo, setJogo] = useState('');
  const [variavel, setVariavel] = useState('');

  const [partidas, setPartidas] = useState([]);

  useEffect(() => {
    setNome('Outro nome')
    setJogos(['jogo 1', 'jogo 2', 'jogo 3'])
    setVariaveis(['Pontuação', 'Desempenho', 'Dificuldade'])
    setPartidas([1,2,3,4,5])
    return () => {}
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
        x: entry,
        y: entry,
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
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={jogo}
              onChange={handleChangeJogo}
              label="Age"
            >
              {jogos.map((jogo) => (
                <MenuItem key={jogo} value={jogo}>
                  {jogo}
                </MenuItem>
              ))}
            </Select>

            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={variavel}
              onChange={handleChangeVar}
              label="Age"
              required="true"
            >
              {variaveis.map((variavel) => (
                <MenuItem key={variavel} value={variavel}>
                  {variavel}
                </MenuItem>
              ))}
            </Select>
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

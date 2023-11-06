import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";


import MenuAdm from '../../../componentes/sidebar/menuadm';
import Header from '../../../componentes/header/header';
import './rmFisio.scss';
import db from '../../../assets/config/db';
import { deleteFisio } from '../../../context/auth.js';


export default function RmFisio() {
  const navigate = useNavigate();

  const [fisios, setFisios] = useState([]);
  const [selectedFisio, setSelectedFisio] = useState(null);

  useEffect(() => {
    const carregarFisios = async () => {

      const recoveredUser = localStorage.getItem('user');
      const InstituitionEmail = JSON.parse(recoveredUser).email;
      const querySnapshot = await getDocs(collection(db, 'Instituitions', InstituitionEmail, 'Fisios'));

      const fisiosData = [];
      querySnapshot.forEach((doc) => {
        fisiosData.push({ id: doc.id, ...doc.data() });
      });

      setFisios(fisiosData);
    };

    carregarFisios();
  }, []);

  const handleRemoveClick = async () => {
    if (selectedFisio) {

      const recoveredUser = localStorage.getItem('user');
      const InstituitionEmail = JSON.parse(recoveredUser).email;
      deleteFisio(selectedFisio)

      await deleteDoc(doc(db, 'Instituitions', InstituitionEmail, 'Fisios', selectedFisio.id));
      
      // Atualiza a lista de fisioterapeutas após a remoção
      setFisios((prevFisios) => prevFisios.filter((fisio) => fisio.id !== selectedFisio.id));
      // Limpa a seleção
      setSelectedFisio(null);
      navigate('/list-fisio');

    }
  };

  return (
    <>
      <Header />
      <MenuAdm />

      <div className="rm-fisio-area">
        <label className='tag_longa'>Remover fisioterapeuta</label>

        <form>
          <label className='tag_longa'>Selecione um fisioterapeuta para remover:</label>

          <div className="select">
            <select onChange={(e) => setSelectedFisio(JSON.parse(e.target.value))}>
              <option value="">Selecione...</option>
              {fisios.map((fisio) => (
                <option key={fisio.id} value={JSON.stringify(fisio)}>
                  {fisio.name}
                </option>
              ))}
            </select>
          

          <button type="button" onClick={handleRemoveClick}>Remover</button>
          </div>
        </form>
      </div>
    </>
  );
}

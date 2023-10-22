import React from 'react'
import Gimm from '../../assets/imgs/logoGimm.svg'
import EC from '../../assets/imgs/logoEngComp.svg'
import Unipampa from '../../assets/imgs/logoUnipampa.svg'


import './footer.scss'

export default function Footer() {
  return (
    <div id='footer'>
      <img src={Gimm} alt="" />
      <img src={EC} alt="" />
      <img src={Unipampa} alt="" />
    </div>
  )
}

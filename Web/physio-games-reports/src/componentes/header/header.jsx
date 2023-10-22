import React from 'react'
import Logo from '../../assets/imgs/logo.svg'

import './header.scss'

export default function Header() {
  return (
    <div id='header'>
      <img src={Logo} alt="" />
      <h1>PHISIO GAMES</h1>
    </div>
  )
}

import { useState } from 'react'

//import Grafico from './components/Grafico'


import Login from './components/Login'
import './components/css/Header.css'
// import './components/css/Grafico.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header'

//icons

import Estoque from './components/Estoque';
import Overview from './components/Overview';


function App(){
  return(
    <div className='app'>
        <Router>
        <Routes>
          {/* essa rota vai mostrar o componente Login quando eu estiver na url "/" */}
          <Route path="/" element={<Login />} />

          {/* essa rota vai mostrar o componente Home quando  for pra "/home" */}
          <Route path='/home' element={<Header/>} />

          <Route path='/estoque' element={<Overview/>} />
          

          {/* <Grafico/> */}
        </Routes>
      </Router>
    </div>






 
  )
}









export default App;
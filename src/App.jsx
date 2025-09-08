import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Grafico from './components/Grafico'
import Header from './components/header';
import './components/css/Header.css'
import './components/css/Grafico.css'



function App(){
  return(
    <div>
    <Header/>
    <Grafico/>
    </div>
  )
}









export default App;
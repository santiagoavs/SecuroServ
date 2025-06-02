import './App.css'
import Header from './assets/componets/Header'
import Body from './assets/componets/Body'
import CreateVehicle from './assets/componets/CreateVehicle'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import React from 'react'
import Navigation from './assets/componets/navigation'

function App() {
  return (
    <Router>    
      <Navigation/>
      <Route path='/' Component={Header+Body}/>
    </Router>
  )
}

export default App

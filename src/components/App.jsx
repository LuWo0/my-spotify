import { useState } from 'react'
import Login from "./Login";
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get("code");
function App() {
  
  return (
    code ? <Dashboard className ="bg-pink" code = {code}/> : <Login />
  )
}

export default App

import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
     <h1>React Forms</h1>
     <SignUpForm setToken={setToken}/>
     <Authenticate token={token} setToken={setToken}/>
    </div>
  )
}

export default App

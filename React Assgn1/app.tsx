import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prevCount) => prevCount + 1) ;
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1) ;
  }


  return (
    <>
      <div>
        <h1>Counter Application</h1>
        <h2>Current count</h2>
        <h1>{count}</h1>
    
      </div>
      <div>    
        <button onClick={increment}>Add </button>
        <button onClick={decrement}>Sub </button> 
      </div>
      
    </>
  )
}

export default App

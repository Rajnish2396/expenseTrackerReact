import './App.css'
import TableExpensive from './Component/TableExpensive'
import FormExpensive from './Component/FormExpensive'
import ExpensiveData from './Component/ExpensiveData'
import { useState } from 'react'
import {useLocalStorage} from './hooks/useLocalStorage'

function App() {
 //const [expensive, setExpensiveData]=useState(ExpensiveData)
  const[editLift, setEditLift]=useState({})


let [expensive, setExpensiveData]= useLocalStorage("expensiveKey", ExpensiveData)

console.log(expensive)








  return (
    <>

      <header>Track Your Expense</header>

      
      <div className='expensiveContainer'>
        <div className='forContainer'>
          <FormExpensive setExpensiveData={setExpensiveData} editLift={editLift} />
        </div>
        <div className='tableContainer'>
          <TableExpensive key={Math.random()} expensive={expensive} setExpensiveData={setExpensiveData}  setEditLift={setEditLift} />          
        </div>
      </div>
    </>
  )
}

export default App

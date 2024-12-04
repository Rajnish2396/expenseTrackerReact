import React, {useState } from 'react'
import {useFilter} from '../hooks/useFilter'
import {useAddValue} from "../hooks/useAddValue"
// import {useDeleteObject} from "../hooks/useDeleteObject"


export default function TableExpensive({expensive, setEditLift, setExpensiveData}) {

//filter by category (using custom Hooks)
const [filterData, setQuery] = useFilter(expensive, (data)=>data.category)

//Delete Row
  const deleteRow = (id)=>{
   const upDateData = expensive.filter((item)=>item.id !==id)
   setExpensiveData(upDateData)    
  }

//EDit Row
  const editRow = (id)=>{
    const upDateData = expensive.filter((item)=>item.id ==id)
    setEditLift(...upDateData)   
  }


//Total Amount (using Custom Hooks)
let totalAmount= useAddValue(expensive.map((item)=>+item.amount))


// Sort By Amount
const sortData = ()=>{
 const sortValue = [...expensive].sort((x, b)=>{
    return x.amount- b.amount
  })
  setExpensiveData(sortValue)    
}

// Reverse By Amount
const reverseData = ()=>{
  const reverseValue = [...expensive].sort((x, b)=>{
    return b.amount -x.amount
  })
  setExpensiveData(reverseValue)
}





return (
<>
<table className="expense-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>
        <select onChange={(e)=>{setQuery(e.target.value)}}>
          <option value="">All</option>
          <option value="grocery">Grocery</option>
          <option value="clothes">Clothes</option>
          <option value="bills">Bills</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
      </th>
      <th className="amount-column">
        <div>
          <span>Amount</span>
          <svg onClick={()=>{reverseData()}}

            xmlns="http://www.w3.org/2000/svg"
            width={10}
            viewBox="0 0 384 512"
            className="arrow up-arrow"
          >
            <title>Ascending</title>
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
          </svg>
          <svg onClick={()=>{sortData()}}
                      xmlns="http://www.w3.org/2000/svg"
            width={10}
            viewBox="0 0 384 512"
            className="arrow down-arrow"
          >
            <title>Descending</title>
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </div>
      </th>
      <th className="amount-column">Operation</th>
    </tr>
  </thead>
  <tbody>

  {   
   filterData.map(({ id, title, category, amount }) => {
            return (
              <tr key={id}>
                <td>{title}</td>
                <td>{category}</td>
                <td>{amount}</td>
                <td><button onClick={()=>{deleteRow(id)}}>Delete</button> 
                <button onClick={()=>{editRow(id)}}>Edit</button></td>
              </tr>
            )
          })    
  }

<tr>
          <th>Total</th>
          <th></th>
          <th></th>
          <th>₹{totalAmount}</th>
        </tr>
  </tbody>
</table>

    </>
  )
}

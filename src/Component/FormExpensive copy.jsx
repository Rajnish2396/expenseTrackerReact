import React, { useEffect, useState } from 'react'
import Input from './input'
import Select from './Select'


export default function FormExpensive({ setExpensiveData, editLift }) {
  const [inpData, setInpData] = useState({})
  const [errors, setError] = useState({})

  

  useEffect(()=>{
    setInpData(editLift || {})

    setExpensiveData((prevState=>{
     let updateData = prevState.map((item)=>{
       return item.id ===inpData.id ? inpData : item
      })
      console.log(updateData)
      return updateData
    }))
  },[editLift])

  console.log(inpData)

  const inputHandler = (e) => {
    const { name, value } = e.target
    setInpData((prevState) => ({ ...prevState, [name]: value }))
    const { [name]: anyThing, ...rest } = errors // Clear error for the current field
    setError(rest)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const validError = {}

    // Validation for title
    if (!inpData.title) {
      validError.title = "Please Enter Required."
    } else if (inpData.title.length < 3) {
      validError.title = "Title Should be at least 3 Characters."
    }

    // Validation for category
    if (!inpData.category) {
      validError.category = "Please Enter Category"
    }

    // Validation for amount
    if (!inpData.amount) {
      validError.amount = "Please Enter Amount."
    }

    // If there are validation errors, update state and stop form submission
    if (Object.keys(validError).length > 0) {
      setError(validError)
      return
    }

    // Add the expense data to the parent state
    setExpensiveData((prevState) => [
      ...prevState,
      { ...inpData, id: crypto.randomUUID() },
    ])

    // Reset the form fields and errors
    setInpData({})
    setError({}) // Clear errors
  }


  
  return (
    <form className="expense-form" onSubmit={submitHandler}>
      <Input
        type="text"
        name="title"
        value={inpData.title || ""}
        placeholder="Title"
        onChange={inputHandler}
        errors={errors.title}
      />

      <div className="input-container">
        <Select

          id="category"
          name="category"
          value={inpData.category || ""}
          onChange={inputHandler}
          options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
          errors={errors.category}
        />
      </div>

      <Input
        type="number"
        name="amount"
        value={inpData.amount || ""}
        placeholder="Amount"
        onChange={inputHandler}
        errors={errors.amount}
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  )
}

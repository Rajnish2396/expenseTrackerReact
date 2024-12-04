import React from 'react'

export default function Input( {name, value, type, placeholder,onChange, errors}) {
  return (
    <>
     <div className="input-container">
   {errors?<label>{errors}</label>:null} 
   <input
   type={type}
    name={name} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
    /> 
    </div>
    </>
  )
}

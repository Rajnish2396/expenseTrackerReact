import React from 'react'

export function useAddValue(addValueJson) {
  
  const output=  addValueJson.reduce((prev, cur)=>{
        return prev+cur
      }, 0)
      return output
}

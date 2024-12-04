import React, { useState } from 'react'


export function useFilter(expensive,  callback) {
    const [query, setQuery]=useState('')
    const filterData = expensive.filter((obj)=>(
        callback(obj).toLocaleLowerCase().includes(query)
    ))  
    return [filterData, setQuery]
  
}

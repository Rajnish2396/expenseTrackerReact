import React from 'react'

export default function useDeleteObject(obj, callback) {
    const [query, setQuery]=useState(null)
 const deletData = obj.filter((item)=>{
    return item.callback(id).includes(!query)
 })
 return[deletData, setQuery]
}

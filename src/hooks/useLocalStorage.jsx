import { useEffect, useState } from "react"

export function useLocalStorage(key, initialState) {

    const[curData, setCurData]=useState(initialState)
    
    
 
    useEffect(()=>{
        let isLocalData = JSON.parse(localStorage.getItem(key))
        if(isLocalData){
            setCurData(isLocalData)
        }
        else{
            localStorage.setItem(key, JSON.stringify(initialState))
        }
    },[])

  // When Update
    const updateStorage=(updatableValue)=>{
    if(typeof updatableValue  === "function"){
        localStorage.setItem(key, JSON.stringify(updatableValue(curData)))
    }
    else{
        localStorage.setItem(key, JSON.stringify(updatableValue))
    }
    
    setCurData(updatableValue)
  }


    return [curData, updateStorage]
}

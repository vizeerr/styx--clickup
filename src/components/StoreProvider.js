"use client"
import { makeStore } from '@/lib/State/store'
import React ,{useRef} from 'react'
import { Provider } from 'react-redux'


const StoreProvider = ({children}) => {
  const storeRef = useRef()

  if (!storeRef.current) {
    storeRef.current = makeStore()

  }

  return <Provider store={storeRef.current} >{children}</Provider>
}

export default StoreProvider

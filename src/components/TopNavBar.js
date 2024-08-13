"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import AddTaskButton from './AddTaskButton'
import { useAppSelector } from '@/lib/State/hooks'

const TopNavBar = () => {
const authname = useAppSelector((state)=>state.auth.name) || ""

  return (
    <div className = "min-h-[5vh] h-[5vh] flex justify-between items-center px-2 bg-neutral-100 border-b">
      <p className="font-bold text-xl">Styx</p>
      {authname? (<AddTaskButton/>) : null}
      
    </div>
  )
}

export default TopNavBar

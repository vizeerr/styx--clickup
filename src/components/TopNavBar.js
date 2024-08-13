
import React from 'react'
import { Button } from "@/components/ui/button"
import AddTaskButton from './AddTaskButton'

const TopNavBar = () => {
  return (
    <div className = "min-h-[5vh] h-[5vh] flex justify-between items-center px-2 bg-neutral-100 border-b">
      <p className="font-bold text-xl">Styx</p>
      <AddTaskButton/>
    </div>
  )
}

export default TopNavBar

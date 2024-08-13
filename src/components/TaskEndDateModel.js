"use client"

import { useState,useEffect } from "react"
import { Calendar } from "@/components/ui/calendar" // Ensure this is the correct path

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns' // Import date-fns for formatting dates

import { SlCalender } from "react-icons/sl";

export function TaskEndDateModel({setTaskData,taskData }) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(null) // Allow null as initial state

  useEffect(()=>{
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      dueDate: date,
    }));
  },[date,setTaskData])

  useEffect(()=>{
    setDate(taskData.dueDate)

  },[])
  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            className="w-[110px] py-1.5 text-xs justify-center"
          >
            {date ? (
              format(date, 'MMM dd, yyyy')
            ) : (
              <><SlCalender className="me-1"/> Set Date</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

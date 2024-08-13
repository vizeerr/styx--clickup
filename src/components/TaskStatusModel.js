"use client"

import {useState,useEffect} from "react"
import {
  ArrowUpCircle,
  CheckCircle2,
  HelpCircle,
  XCircle,
} from "lucide-react"

import { LuCircleDashed } from "react-icons/lu";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const statuses= [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
    color:"text-yellow-500"
  },
  {
    value: "todo",
    label: "Todo",
    icon: LuCircleDashed,
    color:"text-neutral-500"
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
    color:"text-blue-500"
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color:"text-green-500"
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
    color:"text-red-500"
  },
]

export function TaskStatusModel({setTaskData,taskData}) {
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(
  )

  useEffect(()=>{
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      status: selectedStatus?.value || "",
    }));
  },[selectedStatus,setTaskData])

  useEffect(()=>{
    const givenStatus = taskData.status;
    const status = statuses.find((priority) => priority.value === givenStatus) || null
    setSelectedStatus(status);
  },[])

  return (
    <div className="flex items-center ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            className="w-[110px] py-1.5 text-xs justify-center"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className={`${selectedStatus.color} mr-2 h-4 w-4 shrink-0`} />
                {selectedStatus.label}
              </>
            ) : (
              <><LuCircleDashed className="me-1"/> Set status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    <status.icon
                      className={cn(
                        `${status.color}`,
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

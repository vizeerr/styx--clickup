"use client"
import {useState} from 'react'

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiaUndoAltSolid } from "react-icons/lia";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ToastAction } from "@/components/ui/toast"
import axios from 'axios';
import TaskEditModel from './TaskEditModel';
import { useAppDispatch } from '@/lib/State/hooks';
import getAllTasks from '@/lib/getAllTasks';
import { setTasks } from '@/lib/State/slices/taskSlice';

const TaskDropdown = ({data}) => {
  
  const dispatch = useAppDispatch();

  const [isEditable,setIsEditable] = useState(false)
    const DeleteTask = async () =>{
        const delData = {
            _id:data._id,
            visibility:"hidden"
        }
        try {
            const response = await axios.post("/api/tasks/update-task",delData);
            if(response.status ==200){
                toast({
                    title: "Task Deleted",
                    description: "Task moved to trash",
                    action: <ToastAction onClick={RestoreTask} altText="undo" className="bg-black text-white">Undo <LiaUndoAltSolid className="ms-1"/> </ToastAction>,
                })
                setAllTasks()
            }
        } catch (error) {
            toast({
                title: "Task Not Deleted",
                description: "Some Error Occured",
            })
        }
    }


    const RestoreTask = async () =>{
      const delData = {
          _id:data._id,
          visibility:"visible"
      }
      try {
          const response = await axios.post("/api/tasks/update-task",delData);
          if(response.status ==200){
              toast({
                  title: "Task Restored",
                  description: "Task restored from trash",
                 })
                 setAllTasks()
          }
      } catch (error) {
          toast({
              title: "Task Not Restored",
              description: "Some Error Occured",
          })
      }
  }

  const setAllTasks = async () => {
    const set = await getAllTasks()
    dispatch(setTasks(set))
  };

    const { toast } = useToast()

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = (dis) => {
      setIsEditable(dis)
      setIsDialogOpen(true)}
    const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
        <Toaster />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={()=>{openDialog(true)}}> 
      View</DropdownMenuItem>
          <DropdownMenuItem 
          onClick={()=>{openDialog(false)}}> 
      Edit</DropdownMenuItem>
      <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500"
            onClick={DeleteTask}
          > 
            
            Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskEditModel
      isEditable={isEditable}
        isOpen={isDialogOpen} 
        onClose={closeDialog}
        setAllTasks={setAllTasks}
        data={data}
      />
      </>

  )
}

export default TaskDropdown

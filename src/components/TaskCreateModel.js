"use client"
import {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from "@/components/ui/textarea"
import { TaskAssignModel } from './TaskAssignModel'
import { TaskEndDateModel } from './TaskEndDateModel'
import { TaskPriorityModel } from './TaskPriorityModel'
import { TaskStatusModel } from './TaskStatusModel'
import axios from 'axios'
import toast from 'react-hot-toast'

 
const TaskCreateModel = ({ isOpen, onClose,getAllTasks }) => {
    
    const [taskData,setTaskData] = useState({
        taskName:"",
        taskDescription:"",
        assignTo:null,
        priority:null,
        status:null,
        dueDate:null
    })

    const createTask = async() =>{
        try {
            const response = await axios.post("/api/tasks/addTask",taskData);
            
            if(response.status==200){
                toast.success("Task Created");
                getAllTasks();
                onClose();
            }
        } catch (error) {
            if(error.response.data.error){
                toast.error(`${error.response.data.error}`)
            }else{
                toast.error("Server Error")
                console.log(error);
            }
        }
    }

  return (
        <Dialog open={isOpen} onOpenChange={onClose} >
        
        <DialogContent className="max-w-full w-max h-max max-h-screen">
            <DialogHeader>
                <DialogTitle>Task</DialogTitle>
                <DialogDescription>
                    Add a new task

                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
            <Input  type="text" className="text-base border active:border-0" placeholder="Task name"
            value={taskData.taskName}
            onChange={(e)=>{
               setTaskData({
                    ...taskData,taskName:e.target.value
                })
            }}/>

            <Textarea placeholder="Task description" 
            value={taskData.taskDescription}
            onChange={(e)=>{
               setTaskData({
                    ...taskData,taskDescription:e.target.value
                })
            }}/>

            <div className="flex items-center gap-4">
                <TaskAssignModel taskData={taskData} setTaskData={setTaskData}/>
               
                <TaskEndDateModel setTaskData={setTaskData} taskData={taskData}/>
              
                <TaskPriorityModel  setTaskData={setTaskData} taskData={taskData}/>

                <TaskStatusModel setTaskData={setTaskData} taskData={taskData}/>
            </div>

            </div>
            <DialogFooter>
                <Button onClick={createTask}>Create Task</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

  )
}

export default TaskCreateModel

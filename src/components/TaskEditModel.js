import {useState,useEffect} from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    
  } from "@/components/ui/sheet"

  import { Input } from "@/components/ui/input"
import { TaskAssignModel } from './TaskAssignModel'
import { TaskEndDateModel } from './TaskEndDateModel'
import { TaskPriorityModel } from './TaskPriorityModel'
import { TaskStatusModel } from './TaskStatusModel'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'

  
const TaskEditModel = ({ isOpen, onClose,data,isEditable,setAllTasks}) => {

    const [taskData,setTaskData] = useState({
        id:null,
        taskName:"",
        taskDescription:"",
        assignTo:null,
        priority:null,
        status:null,
        dueDate:null
    })

    useEffect(()=>{
        setTaskData(data)
    },[])

    const updateData = async() =>{

        try {
            const response = await axios.post("/api/tasks/update-task",taskData);
            
            if(response.status==200){
                toast.success("Task Updated");
                setAllTasks();
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
    <div>
        <Sheet open={isOpen} onOpenChange={onClose}>
        
        <SheetContent side="bottom" className="w-[50vw] mx-auto rounded-lg h-[55vh] mb-5">
            <SheetHeader>
            <SheetTitle>
            <Input
            disabled={isEditable}
            defaultValue={data.taskName||""} 
            
            onChange={(e)=>{
               setTaskData({
                    ...taskData,taskName:e.target.value
                })
            }}
            className="text-3xl border-none"/>
            </SheetTitle>
        
            </SheetHeader>

            <div className="flex flex-col  gap-4 m-4">
                <div className="flex gap-8 items-center">
                    <p className="text-sm w-[80px]">Assignees</p>
                    <TaskAssignModel taskData={taskData} setTaskData={setTaskData}/>
                </div>
                <div className="flex gap-8 items-center">
                <p className="text-sm w-[80px]">Due Date</p>
                    <TaskEndDateModel setTaskData={setTaskData} taskData={taskData}/>
                </div>
                <div className="flex gap-8 items-center">
                <p className="text-sm w-[80px]">Priority</p>
                    <TaskPriorityModel  setTaskData={setTaskData} taskData={taskData}/>
                </div>
                <div className="flex gap-8 items-center">
                <p className="text-sm w-[80px]">Status</p>
                    <TaskStatusModel setTaskData={setTaskData} taskData={taskData}/>
                </div>           
            </div>

            <Textarea 
             disabled={isEditable}
            onChange={(e)=>{

               setTaskData({
                    ...taskData,taskDescription:e.target.value
                })
            }}
            defaultValue = {data.taskDescription} className ="mt-5"/>

            <SheetFooter className="my-5">
                
             
                <SheetClose asChild>
                {
                    !isEditable?<Button className="text-xs" onClick = {updateData}>Save changes</Button>:null
                }
                

                </SheetClose>
            </SheetFooter>

        </SheetContent>
        </Sheet>

    </div>
  )
}

export default TaskEditModel

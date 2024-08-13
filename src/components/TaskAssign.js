"use client";

import { useState, useEffect } from "react";
import { RiUserAddLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import toast from "react-hot-toast";

export function TaskAssign({data,id}) {
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [userId,setUserId] = useState([])
  const [userChange,setUserChange] = useState(false)

  const toggleUserSelection = (user) => {

    
    setSelectedUser((prev) => prev.includes(user) ? prev.filter((selected) => selected._id !== user._id) : [...prev, user]);
    setUserChange(true)    
  }

  useEffect(()=>{
    if(data){
      setSelectedUser(data)
    }
  },[data])

  useEffect(() => {
    if(userChange){
      const assignTo = selectedUser.map((user) => user._id);
      setUserId(assignTo)
    }

  }, [userChange]);

  useEffect(()=>{
    if(userChange){
      assignTask();  
      setUserChange(false);
    }
  },[userId])


  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("api/auth/user/get-all-users");
        if (response.status === 200) {
          setAllUsers(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  const assignTask = async () => {
    const taskdata = {
      id: id,
      assignTo: userId,
    };
    try {
      const response = await axios.post("api/tasks/update-task", taskdata);
      if (response.status === 200) {
        toast.success("Task Updated");
      }
    } catch (error) {
      toast.error("Failed to update task");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            className="w-[110px] py-1.5 text-xs justify-center gap-1"
          >
            {selectedUser.length > 0  ? (
              <>
              { selectedUser.map((item,index)=>
                  (
                    <span key={index} className="bg-red-200 text-[9px] px-1.5 py-0.5 rounded-full">{item.name.slice(0,1)}</span>
                  )
                )
              }
                {/* <RiUserAddLine className="mr-2 h-4 w-4 shrink-0" />
                {selectedUser.name} */}
              </>
            ) : (
              <>
                <RiUserAddLine className="text-neutral-600" /> Assignee To
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search users..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {allUsers.map((user, index) => (
                  <CommandItem
                    key={index}
                    value={user.name}
                    onSelect={() => {
                      toggleUserSelection(user)
                      setOpen(false);
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      <span className="bg-red-200 text-xs px-2 py-1 rounded-full">{user.name.slice(0,1)}</span>
                      <div>  
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-neutral-600">{user.email}</p>
                      </div>

                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

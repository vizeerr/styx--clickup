"use client"
import { IoHomeOutline } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    
  } from "@/components/ui/command"
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/State/hooks";
import { setAuthUser } from "@/lib/State/slices/authSlice";
import { useEffect } from "react";
import axios from "axios";
const Sidebar = () => {
  
  const authname = useAppSelector((state)=>state.auth.name) || ""
const dispatch = useAppDispatch();
  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get("/api/auth/user");
        if (response.status === 200) {
          dispatch(setAuthUser(response.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAuth(); 
  
  }, []);

  return (
    <div className = "w-[280px] min-h-[95vh] p-4 border-r bg-slate-50">
        <div className="flex border-b pb-3 items-center gap-3">
        <Avatar className="w-7 h-7 ">
            <AvatarFallback className="bg-red-200">{authname.slice(0,1)}</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">{authname}</p>

        </div>
        <Command>
  
  <CommandList className="bg-slate-50 mt-2">
    
    <CommandGroup heading="Menu" className="cursor-pointer">
    {/* <Link href={'/'}><CommandItem className="flex gap-2 my-3"><IoHomeOutline size={16} /> Home</CommandItem></Link> */}
   <Link href={'/tasks'}><CommandItem className="flex gap-2 my-3"><BsListTask size={16}/> Tasks</CommandItem></Link>
      {/* <CommandItem className="flex gap-2 my-3">Clips</CommandItem> */}
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
</Command>

      
    </div>
  )
}

export default Sidebar

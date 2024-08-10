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
  

const Sidebar = () => {
  return (
    <div className = "w-[250px] min-h-screen p-4 border-r">
        <div className="flex border-b pb-3 items-center gap-3">
        <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">Vivek Sagar</p>

        </div>
        <Command>
  
  <CommandList>
    
    <CommandGroup heading="Menu">
   <CommandItem className="flex gap-2 "><IoHomeOutline size={16} /> Home</CommandItem>
   <Link href={'/tasks'}><CommandItem className="flex gap-2 "><BsListTask size={16}/> Tasks</CommandItem></Link>
      <CommandItem className="flex gap-2 ">Clips</CommandItem>
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
</Command>

      
    </div>
  )
}

export default Sidebar

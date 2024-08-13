"use client";
import { useState } from 'react';
import { IoAddOutline } from "react-icons/io5";
import TaskCreateModel from './TaskCreateModel';
import { Button } from "@/components/ui/button";

const AddTaskButton = ({  getAllTasks }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button
        onClick={openDialog} // Ensure the dialog opens on button click
        className="flex gap-1 font-normal shadow cursor-pointer text-xs h-[1.84rem] px-2 items-center border"
      >
        <IoAddOutline size={15} />
        <p>Add Task</p>
      </Button>
      
      <TaskCreateModel 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
        getAllTasks={getAllTasks} 
      />
    </>
  );
}

export default AddTaskButton;

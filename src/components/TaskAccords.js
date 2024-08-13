"use client";
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DataTable } from './DataTable';
import { columns } from './columns';
import AddTaskButton from './AddTaskButton';
import getAllTasks from '@/lib/getAllTasks';
import { useAppDispatch, useAppSelector } from '@/lib/State/hooks';
import { setTasks } from '@/lib/State/slices/taskSlice';

const TaskAccords = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state)=>state.tasks.allTasks) || []

  useEffect(() => {
    setAllTasks();
  }, []);


  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  

  const getFilteredTasks = (status) => data.filter(task => task.status === status);

  const setAllTasks = async () => {
    const set = await getAllTasks()
    dispatch(setTasks(set))
  };


  return (
    <div className="m-4 px-4">
      {getFilteredTasks("todo").length > 0 && (
        <Accordion className="mb-4" type="single" collapsible defaultValue="todo">
          <AccordionItem className="border-none" value="todo">
            <div className="flex items-center gap-5">
              <AccordionTrigger className="text-sm hover:text-red-500" />
              <p className="bg-neutral-200 py-1 text-sm px-3 hover:bg-neutral-200 rounded-md">
                To Do
              </p>
              
              <AddTaskButton  getAllTasks = { getAllTasks} />
            </div>
            <AccordionContent>
              <DataTable columns={columns} data={getFilteredTasks("todo")} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {getFilteredTasks("in progress").length > 0 && (
        <Accordion className="mb-4" type="single" collapsible>
          <AccordionItem className="border-none" value="in-progress">
            <div className="flex items-center gap-5">
              <AccordionTrigger className="text-sm hover:text-red-500" />
              <p className="bg-blue-100 py-1 text-sm px-3 hover:bg-neutral-200 rounded-md">
                In Progress
              </p>
              <AddTaskButton  getAllTasks = { getAllTasks} />
            </div>
            <AccordionContent>
              <DataTable columns={columns} data={getFilteredTasks("in progress")} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {getFilteredTasks("completed").length > 0 && (
        <Accordion className="mb-4" type="single" collapsible>
          <AccordionItem className="border-none" value="completed">
            <div className="flex items-center gap-5">
              <AccordionTrigger className="text-sm" />
              <p className="bg-emerald-100 py-1 text-sm px-3 hover:bg-neutral-200 rounded-md">
                Completed
              </p>
              <AddTaskButton  getAllTasks = { getAllTasks} />
            </div>
            <AccordionContent>
              <DataTable columns={columns} data={getFilteredTasks("completed")} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {getFilteredTasks("canceled").length > 0 && (
        <Accordion className="mb-4" type="single" collapsible>
          <AccordionItem className="border-none" value="canceled">
            <div className="flex items-center gap-5">
              <AccordionTrigger className="text-sm hover:text-red-500" />
              <p className="bg-red-100 py-1 text-sm px-3 hover:bg-neutral-200 rounded-md">
                Canceled
              </p>
              <AddTaskButton  getAllTasks = { getAllTasks} />
            </div>
            <AccordionContent>
              <DataTable columns={columns} data={getFilteredTasks("canceled")} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {getFilteredTasks("backlog").length > 0 && (
        <Accordion className="mb-4" type="single" collapsible>
          <AccordionItem className="border-none" value="backlog">
            <div className="flex items-center gap-5">
              <AccordionTrigger className="text-sm hover:text-red-500" />
              <p className="bg-yellow-100 py-1 text-sm px-3 hover:bg-neutral-200 rounded-md">
                Backlog
              </p>
              <AddTaskButton  getAllTasks = { getAllTasks} />
            </div>
            <AccordionContent>
              <DataTable columns={columns} data={getFilteredTasks("backlog")} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default TaskAccords;

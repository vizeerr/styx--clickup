"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { TaskStatus } from "./TaskStatus"
import { TaskPriority } from "./TaskPriority"
import { TaskAssign } from "./TaskAssign"
import { TaskEndDate } from "./TaskEndDate"
import TaskDropdown from "./TaskDropdown"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "taskName",
    header: "Name",
  },
  {
    id: "assinee",
    header: "Assignee",
    cell: ({row}) => <TaskAssign data={row.original.assignTo} id={row.original.id}/>,
  },
  {
    id: "duedate",
    header: "Due Date",
    cell: ({row}) => <TaskEndDate id={row.original.id} data={row.original.dueDate}/>,
  },
  {
    id: "status",
    header: "Status",
    cell: ({row}) => <TaskStatus id={row.original.id} data={row.original.status}/>,
  },
  {
    id: "priority",
    header: "Priority",
    cell: ({row}) => <TaskPriority id={row.original.id} data={row.original.priority}/>,
  },
  
  {
    id: "actions",
    cell: ({ row }) => (
      <TaskDropdown data={row.original} />
    ),
  }
]

import axios from "axios";

const getAllTasks = async () => {
    try {
      const response = await axios.get("/api/tasks/get-all-tasks");
      if (response.status === 200) {
        const tasks = response.data.data;
        const formattedTasks = tasks.map(task => ({
          _id: task._id,
          taskName: task.taskName,
          taskDescription: task.taskDescription,
          dueDate: task.dueDate,
          status: task.status,
          priority: task.priority,
          assignTo: task.assignTo,
        }));
        return formattedTasks
      }
    } catch (error) {
      console.log(error);
      return null
    }
  };

  export default getAllTasks;
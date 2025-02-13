import {Router} from "express";
import { getTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    addPerformanceRating,
    } from "../controllers/task.controller.js";
import { isAdmin, isAuth, } from "../middlewares/isAuth.js";

const taskRouter = new Router();

taskRouter.route("/task")
  .get(getTasks)     
  .post(isAuth, isAdmin, createTask); 

// Routes for specific task operations (by task ID)
taskRouter.route("/:id")
  .get(getTaskById)   
  .put(isAuth, isAdmin,updateTask); 

// Route to update only the task status
taskRouter.route("/:id/status")
  .put(isAuth, isAdmin,updateTaskStatus);

// Route to add a performance rating/review to a task
taskRouter.route("/:id/reviews")
  .post(isAuth, isAdmin,addPerformanceRating);

//here we need to chanage the IsAdmin replace with team lead 

export default taskRouter;


// post task
// {
//     "title": "Complete Quarterly Report",
//     "description": "Compile and analyze Q1 sales data for the report.",
//     "deadline": "2025-03-01T12:00:00.000Z",
//     "status": "pending",
//     "assignedTo": ["60a76f9c87cfe710b4e7b1a1"],
//     "assignedBy": "60a76f9c87cfe710b4e7b1a0",
//     "type": "employee",
//     "companyId": "60a76f9c87cfe710b4e7b19f",
//     "feedback": "",
//     "priority": "high"
//   }
  
// put 
// {
//     "title": "Complete Quarterly Report - Updated",
//     "description": "Include additional market analysis and competitor review.",
//     "deadline": "2025-03-05T12:00:00.000Z",
//     "priority": "medium"
//   }
  

// {
//     "status": "completed"
//   }
  // reviews
// {
//     "reviewedBy": "60a76f9c87cfe710b4e7b1a2",
//     "marks": 90,
//     "comments": "Excellent work, met all deadlines and exceeded expectations."
//   }
  
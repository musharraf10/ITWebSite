import Task from "../models/task.model.js";



export const getTasksForEmployee = async (req, res) => {
    try {
      
      const employeeId = req.user._id;

      const tasks = await Task.find({ assignedTo: { $in: [employeeId] } })
        .populate("assignedTo", "firstName lastName email")
        .populate("assignedBy", "firstName lastName email");
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


export const getTasks = async (req, res) => {
  try {
    const { employeeId } = req.query;
    let query = {};
    if (employeeId) {
      query.assignedTo = { $in: [employeeId] };
    }
    const tasks = await Task.find(query)
      .populate("assignedTo", "firstName lastName email")
      .populate("assignedBy", "firstName lastName email");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate("assignedTo", "firstName lastName email")
      .populate("assignedBy", "firstName lastName email");
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      deadline,
      assignedTo,
      assignedBy,
      type,
      companyId,
      feedback,
      priority,
    } = req.body;

    const newTask = new Task({
      title,
      description,
      deadline,
      assignedTo,
      assignedBy,
      type,
      companyId,
      feedback,
      priority,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, updatedAt: Date.now() };

    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "in-progress", "completed", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addPerformanceRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewedBy, marks, comments } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Create the review object and add it to the task's reviews array
    const review = {
      reviewedBy,
      marks,
      comments,
      reviewedAt: Date.now(),
    };
    task.reviews.push(review);
    task.updatedAt = Date.now();
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Admin assign a Task to employee Thats Fine 
// But Every day or every task completion he need to sit and select the employee and assigning a task is very irretating 
// how Can i solve This Problem 
// If Take Team lead hierarchy  - > HR - > PROJECT MANAGER - > TEAM LEAD - > TEAM MEMBERS
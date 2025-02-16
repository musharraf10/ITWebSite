import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  qualityScore: { 
    type: Number, 
    min: 0, 
    max: 10 
  },
  timelinessScore: { 
    type: Number, 
    min: 0, 
    max: 10 
  },
  accuracyScore: { 
    type: Number, 
    min: 0, 
    max: 10 
  }
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  reviewedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true 
  },
  marks: { 
    type: Number, 
    min: 0, 
    max: 100 
  },
  comments: { 
    type: String 
  },
  reviewedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { _id: false });

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    index: true  
  },

  description: { 
    type: String,
    // You could also add a text index if you plan on doing text searches
    // index: 'text'
  },

  deadline: { 
    type: Date 
  },

  status: { 
    type: String, 
    enum: ["pending", "in-progress", "completed", "rejected"], 
    default: "pending" 
  },

  assignedTo: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users" 
  }],

  assignedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users" 
  },

  type: { 
    type: String, 
    enum: ["employee", "thirdparty", "team"], 
    required: true 
  },

  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "companies",
    index: true 
  },

  feedback: { 
    type: String 
  },

  priority: { 
    type: String, 
    enum: ["low", "medium", "high"], 
    default: "medium" 
  },

  performance: performanceSchema,

  reviews: [reviewSchema],

  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Optionally, we can  create text indexes if you need advanced search functionality
// taskSchema.index({ title: 'text', description: 'text' });

const Task = mongoose.model("Task", taskSchema);
export default Task;

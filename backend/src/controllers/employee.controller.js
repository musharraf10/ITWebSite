import Task from "../models/task.model.js";
import User from "../models/users.model.js";

export const updateSalaryOrBonus = async (req, res) => {
    try {
        const { email, value, type } = req.body;

        if (!email || !value || !type) {
            return res.status(400).json({ message: "Please provide email, value, type" });
        }

        if (!["amount", "bonus"].includes(type)) {
            return res.status(400).json({ message: "Invalid type." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.totalAmount) user.totalAmount = 0;
        if (!user.totalBonus) user.totalBonus = 0;

        if (type === "amount") {
            user.totalAmount += value;
        } else if (type === "bonus") {
            user.totalBonus += value;
        }

        const paymentEntry = {
            amount: type === "amount" ? value : 0,
            bonus: type === "bonus" ? value : 0,
            paymentDate: new Date(),
        };

        user.paymentHistory.push(paymentEntry);
        await user.save();

        res.status(200).json({
            message: `${type} updated successfully!`,
            totalAmount: user.totalAmount,
            totalBonus: user.totalBonus,
        });

    } catch (error) {
        console.error("Error updating salary or bonus:", error);
        res.status(500).json({ message: error.message});
    }
};


export const getSalaryAndBonusData = async (req, res) => {
    try {
        const { email, from, to } = req.body;

        if (!email || !from || !to) {
            return res.status(400).json({ message: "Please provide email, from date, and to date" });
        }

        const fromDate = new Date(from);
        const toDate = new Date(to);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const filteredPayments = user.paymentHistory.filter(payment => 
            payment.paymentDate >= fromDate && payment.paymentDate <= toDate
        );

        res.status(200).json(filteredPayments);

    } catch (error) {
        console.error("Error fetching salary and bonus data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getEmployeePerformance = async (req, res) => {
    try {
      // req.user is set by the authentication middleware
      const employeeId = "67a9d8a53a34e6a5c57a0d93"  //req.user._id;
  
      // Find tasks where the employee is assigned
      const tasks = await Task.find({ assignedTo: { $in: [employeeId] } });
  
      // Gather all reviews from these tasks
      let allReviews = [];
      tasks.forEach((task) => {
        if (task.reviews && task.reviews.length > 0) {
          allReviews = allReviews.concat(task.reviews);
        }
      });
  
      // Calculate average marks if reviews exist
      let averageMarks = null;
      if (allReviews.length > 0) {
        const totalMarks = allReviews.reduce(
          (sum, review) => sum + (review.marks || 0),
          0
        );
        averageMarks = totalMarks / allReviews.length;
      }
  
      res.status(200).json({
        averageMarks,
        totalReviews: allReviews.length,
        reviews: allReviews,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
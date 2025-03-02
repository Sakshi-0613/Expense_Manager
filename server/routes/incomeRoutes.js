import express from "express";
import { 
  getIncome, 
  addIncome, 
  deleteIncomeById, 
  deleteIncomeBySource 
} from "../controllers/incomeController.js";

const router = express.Router();

// Add Income
router.post("/add", addIncome);

// Fetch Income Data
router.get("/", getIncome);

// Delete Income by ID
router.delete("/delete/:incomeId", deleteIncomeById);

// Delete Income by Source
router.delete("/delete", deleteIncomeBySource);

export default router;




// import express from "express";
// import Income from "../models/income.js";

// const router = express.Router();

// // Add Income
// router.post("/add", async (req, res) => {
//   try {
//     const { userId, source, amount, date } = req.body;

//     if (!userId || !source || !amount || !date) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const newIncome = new Income({ userId, source, amount, date });
//     await newIncome.save();

//     res.status(201).json({ message: "Income added successfully", income: newIncome });
//   } catch (error) {
//     console.error("Error adding income:", error);
//     res.status(500).json({ error: "Server error while adding income" });
//   }
// });

// // ✅ Route to Fetch Income Data (Make sure this exists!)
// router.get("/", async (req, res) => {
//     try {
//       const { userId } = req.query; // Fetch userId from query params
  
//       if (!userId) {
//         return res.status(400).json({ error: "User ID is required" });
//       }
  
//       const incomeData = await Income.find({ userId });
  
//       res.status(200).json(incomeData);
//     } catch (error) {
//       console.error("Error fetching income:", error);
//       res.status(500).json({ error: "Server error while fetching income" });
//     }
//   });

//   // Delete Income by ID
// router.delete("/delete/:incomeId", async (req, res) => {
//     try {
//       const { incomeId } = req.params;
  
//       const deletedIncome = await Income.findByIdAndDelete(incomeId);
  
//       if (!deletedIncome) {
//         return res.status(404).json({ error: "Income entry not found" });
//       }
  
//       res.status(200).json({ message: "Income deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting income:", error);
//       res.status(500).json({ error: "Server error while deleting income" });
//     }
//   });
  
//   // Delete Income by Source for a Specific User
//   router.delete("/delete", async (req, res) => {
//     try {
//       const { userId, source } = req.body;
  
//       if (!userId || !source) {
//         return res.status(400).json({ error: "User ID and source are required" });
//       }
  
//       const deletedIncome = await Income.findOneAndDelete({ userId, source });
  
//       if (!deletedIncome) {
//         return res.status(404).json({ error: "Income entry not found" });
//       }
  
//       res.status(200).json({ message: "Income deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting income:", error);
//       res.status(500).json({ error: "Server error while deleting income" });
//     }
//   });
  
  
 
// export default router;

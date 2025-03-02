import Income from "../models/income.js";

// @desc    Get all income for a user
// @route   GET /api/income
// @access  Private
export const getIncome = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const income = await Income.find({ userId });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching income" });
  }
};

// @desc    Add a new income entry
// @route   POST /api/income/add
// @access  Private
export const addIncome = async (req, res) => {
  try {
    const { userId, source, amount, date } = req.body;
    if (!userId || !source || !amount || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newIncome = new Income({ userId, source, amount, date });
    await newIncome.save();

    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ error: "Server error while adding income" });
  }
};

// @desc    Delete income by ID
// @route   DELETE /api/income/delete/:incomeId
// @access  Private
export const deleteIncomeById = async (req, res) => {
  try {
    const { incomeId } = req.params;

    const deletedIncome = await Income.findByIdAndDelete(incomeId);

    if (!deletedIncome) {
      return res.status(404).json({ error: "Income entry not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting income" });
  }
};

// @desc    Delete income by source for a specific user
// @route   DELETE /api/income/delete
// @access  Private
export const deleteIncomeBySource = async (req, res) => {
  try {
    const { userId, source } = req.body;

    if (!userId || !source) {
      return res.status(400).json({ error: "User ID and source are required" });
    }

    const deletedIncome = await Income.findOneAndDelete({ userId, source });

    if (!deletedIncome) {
      return res.status(404).json({ error: "Income entry not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting income" });
  }
};

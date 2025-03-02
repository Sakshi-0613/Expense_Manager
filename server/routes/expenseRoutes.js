// server/routes/expenseRoutes.js
import express from 'express';
import Expense from '../models/Expense.js';
import authMiddleware from '../middleware/userAuth.js';

const router = express.Router();

// Add expense
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { amount, category, description, userId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const newExpense = new Expense({ userId, amount, category, description });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Error adding expense' });
  }
});

// Get user expenses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.body.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
});

// Delete expense
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expense' });
  }
});

export default router;

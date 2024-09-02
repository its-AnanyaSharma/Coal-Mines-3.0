// routes/authRoute.js
import express from 'express';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { registerContoller, loginController, testController } from '../controllers/authController.js';
const router = express.Router();

// POST login route
router.post('/register', registerContoller);
router.post('/login', loginController);
router.get('/test', testController);  // Example protected route

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
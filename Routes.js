import { Router } from 'express';
import { hash, compare } from 'bcryptjs';
import pkg from 'jsonwebtoken';
import { User, Event } from './Models.js';
import authenticate from './middleware.js';
const { sign } = pkg;
const router = Router();

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// User login
router.post('/login', async (req, res) => {

  try {
        
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } 
  catch (error) {

    res.status(500).json({ message: 'Server error', error });
  }
});

// Create an event
router.post('/events', authenticate, async (req, res) => {
    try {
        const { name, description, date, category, reminderTime } = req.body;
        const event = new Event({ userId: req.userId, name, description, date: new Date(date), category, reminderTime: new Date(reminderTime) });
        await event.save();
        res.json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get upcoming events
router.get('/events', authenticate, async (req, res) => {
    try {
        const events = await Event.find({ userId: req.userId }).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;

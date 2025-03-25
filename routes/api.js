
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get a random welcome message
router.get('/message', async (req, res) => {
  try {
    // Try to get a random message from database
    const count = await Message.countDocuments();
    
    if (count > 0) {
      const random = Math.floor(Math.random() * count);
      const randomMessage = await Message.findOne().skip(random);
      return res.json({ message: randomMessage.text });
    } 
    
    // Fallback to default messages if none in database
    const messages = [
      "Hello from the backend! Connection successful.",
      "Your frontend and backend are now talking to each other!",
      "Welcome to the Simple Connect App!",
      "Backend API is responding properly.",
      "Congratulations! Your app is working correctly."
    ];
    
    const randomIndex = Math.floor(Math.random() * messages.length);
    res.json({ message: messages[randomIndex] });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: 'Error fetching message' });
  }
});

// Add a new message (for potential future use)
router.post('/message', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Message text is required' });
    }
    
    const newMessage = new Message({ text });
    await newMessage.save();
    
    res.status(201).json({ message: 'Message added successfully', data: newMessage });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ message: 'Error adding message' });
  }
});

module.exports = router;

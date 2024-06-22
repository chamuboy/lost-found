const express = require('express');
const router = express.Router();
const Item = require('../models/Items-model');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user.user;
    next();
  });
};

// Get items for the logged-in user
router.get('/my-items', authenticateToken, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update an item
router.put('/my-items/:id', [authenticateToken, upload.single('image')], async (req, res) => {
  const { title, category, description, district, location, contactNumber, dateFound, bid } = req.body;
  const updatedData = { title, category, description, district, location, contactNumber, dateFound, bid };

  try {
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: updatedData },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete an item
router.delete('/my-items/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new item
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { title, category, description, district, location, contactNumber, dateFound, bid } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newItem = new Item({
      title,
      category,
      description,
      district,
      location,
      contactNumber,
      dateFound,
      bid,
      image,
      user: req.user.id,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'fname lname email mobile profilePicture');
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
  }
});


// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new bid to an item
router.post('/:id/bids', authenticateToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      console.error('Item not found');
      return res.status(404).json({ msg: 'Item not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    const newBid = {
      bidAmount: req.body.amount,
      firstName: user.fname,
      lastName: user.lname,
      mobile: user.mobile,
      email: user.email
    };

    item.bids.push(newBid);
    await item.save();
    res.json(item.bids);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

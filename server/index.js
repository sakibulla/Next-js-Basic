// Express.js Backend API Server
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// In-memory data store for items
let items = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
  },
  {
    id: '3',
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand with adjustable height and angle.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with customizable keys and tactile switches.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop'
  }
];

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is running',
    endpoints: {
      items: '/items',
      singleItem: '/items/:id',
      addItem: 'POST /items'
    }
  });
});

// GET all items
app.get('/items', (req, res) => {
  res.json({ success: true, data: items });
});

// GET single item by ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  
  res.json({ success: true, data: item });
});

// POST new item
app.post('/items', (req, res) => {
  const { name, description, price, image } = req.body;
  
  // Validation
  if (!name || !description || !price || !image) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }
  
  // Create new item
  const newItem = {
    id: String(items.length + 1),
    name,
    description,
    price: parseFloat(price),
    image
  };
  
  items.push(newItem);
  
  res.status(201).json({ 
    success: true, 
    message: 'Item added successfully',
    data: newItem 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// In-memory storage for records
let records = [];

// Create a new record
app.post('/api/records', (req, res) => {
  const { name, email, phone } = req.body;
  const crypto = require('crypto');
  const id = crypto.createHash('md5').update(email).digest('hex');

  const existingRecord = records.find(r => r.id === id);
  if (existingRecord) {
    return res.status(400).json({ message: 'Duplicate id' });
  }

  const newRecord = { id, name, email, phone };
  records.push(newRecord);
  res.status(201).json(newRecord);
});

// Read all records
app.get('/api/records', (req, res) => {
  res.json(records);
});

// Read a specific record
app.get('/api/records/:id', (req, res) => {
  const id = req.params.id;
  const record = records.find(r => r.id === id);
  if (record) {
    res.json(record);
  } else {
    res.status(404).json({ message: 'Record not found' });
  }
});

// Update a record
app.put('/api/records/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = { id, name, email, phone };
    res.json(records[index]);
  } else {
    res.status(404).json({ message: 'Record not found' });
  }
});

// Delete a record
app.delete('/api/records/:id', (req, res) => {
  const id = req.params.id;
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    const deletedRecord = records.splice(index, 1)[0];
    res.json(deletedRecord);
  } else {
    res.status(404).json({ message: 'Record not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000; // Changed port to 3001

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password
  database: 'piltovr',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/users/register', (req, res) => {
  const { name, email, phone, address, dateOfBirth, course, password } = req.body;
  
  const sql = `INSERT INTO users (name, email, phone, address, dateOfBirth, course, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, email, phone, address, dateOfBirth, course, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

app.get('/api/students', (req, res) => {
  const sql = 'SELECT name, email,phone,address,dateOfBirth,id FROM users'; // Assuming the table name is users

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching student data:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result); // Send student data as JSON response
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

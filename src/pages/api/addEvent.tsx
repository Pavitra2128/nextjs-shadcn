// pages/api/addEvent.js
import mysql from 'mysql';

const con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'piltovr',
});

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { date, name, days } = req.body;
    const query = 'INSERT INTO events (event_date, event_name, event_days) VALUES (?, ?, ?)';
    con.query(query, [date, name, days], (err, result) => {
      if (err) {
        res.status(500).send('Error inserting event');
        throw err;
      }
      res.status(200).send('Event added successfully');
    });
  } else if (req.method === 'GET') {
    const query = 'SELECT * FROM events';
    con.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error fetching events');
        throw err;
      }
      res.status(200).json(results);
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

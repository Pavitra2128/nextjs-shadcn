import mysql2 from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

const con = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'piltovr',
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { date, name, days } = req.body;
    const query = 'INSERT INTO events (event_date, event_name, event_days) VALUES (?, ?, ?)';
    con.query(query, [date, name, days], (err, result) => {
      if (err) {
        console.error('Error inserting event:', err);
        res.status(500).send('Error inserting event');
        return;
      }
      console.log('Event added successfully:', result);
      res.status(200).send('Event added successfully');
    });
  } else if (req.method === 'PUT') { // Handle update request
    const { id, date, name, days } = req.body;
    const query = 'UPDATE events SET event_date = ?, event_name = ?, event_days = ? WHERE id = ?';
    con.query(query, [date, name, days, id], (err, result) => {
      if (err) {
        console.error('Error updating event:', err);
        res.status(500).send('Error updating event');
        return;
      }
      console.log('Event updated successfully:', result);
      res.status(200).send('Event updated successfully');
    });
  } else if (req.method === 'DELETE') { // Handle delete request
    const { id } = req.body;
    const query = 'DELETE FROM events WHERE id = ?';
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting event:', err);
        res.status(500).send('Error deleting event');
        return;
      }
      console.log('Event deleted successfully:', result);
      res.status(200).send('Event deleted successfully');
    });
  }else {
    res.status(405).send('Method Not Allowed');
  }
}

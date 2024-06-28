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
    const { startDate, endDate, name } = req.body;
    const days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
    const query = 'INSERT INTO events (event_date, to_date, event_name, event_days) VALUES (?, ?, ?, ?)';
    con.query(query, [startDate, endDate, name, days], (err, result) => {
      if (err) {
        console.error('Error inserting event:', err);
        res.status(500).send('Error inserting event');
        return;
      }
      console.log('Event added successfully:', result);
      res.status(200).send('Event added successfully');
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

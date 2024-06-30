import mysql2 from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

const con = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'temple',
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { startDate, endDate, name,description } = req.body;
    //const days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
    const query = 'INSERT INTO events (event_date, event_end_date, event_name,description) VALUES (?, ?, ?, ?)';
    con.query(query, [startDate, endDate, name, description], (err, result) => {
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

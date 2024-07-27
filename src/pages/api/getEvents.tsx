import mysql2 from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';
import con from './db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { templeId } = req.query;
    const query = 'SELECT * FROM temple_events WHERE temple_id = ?';
    con.query(query, [templeId], (err, results) => {
      if (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Error fetching events' });
        return;
      }
      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
import mysql2 from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';
import con from './db';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { eventId } = req.body;
    const query = 'DELETE FROM temple_events WHERE id = ?';
    con.query(query, [eventId], (err, result) => {
      if (err) {
        console.error('Error deleting event:', err);
        res.status(500).send('Error deleting event');
        return;
      }
      res.status(200).send('Event deleted successfully');
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
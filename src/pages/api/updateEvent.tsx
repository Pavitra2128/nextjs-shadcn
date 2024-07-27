import mysql2 from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

import con from './db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { eventId, templeId, startDate, endDate, name } = req.body;
    const days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
    const query = 'UPDATE temple_events SET temple_id = ?, event_date = ?, to_date = ?, event_name = ?, event_days = ? WHERE id = ?';
    con.query(query, [templeId, startDate, endDate, name, days, eventId], (err, result) => {
      if (err) {
        console.error('Error updating event:', err);
        res.status(500).send('Error updating event');
        return;
      }
      res.status(200).send('Event updated successfully');
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
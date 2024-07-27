import mysql2 from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

import con from './db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      
      const query = 'SELECT id, name FROM temple_temples';
      con.query(query,(err, results) => {
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
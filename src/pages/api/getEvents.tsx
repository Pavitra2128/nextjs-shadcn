import mysql2 from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

const con = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'piltovr',
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM events';
    con.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Error fetching events' });
        return;
      }
      console.log('Fetched events:', results);
      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

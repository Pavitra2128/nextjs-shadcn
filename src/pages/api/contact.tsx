// pages/api/contact.ts
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
    const { name, phone, email, subject, message } = req.body;

    const query = 'INSERT INTO contact_us (name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)';
    con.query(query, [name, phone, email, subject, message], (err, result) => {
      if (err) {
        console.error('Error inserting contact form data:', err);
        res.status(500).send('Error inserting data');
        return;
      }
      res.status(200).send('Message sent successfully');
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

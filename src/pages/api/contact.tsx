import { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '../sendEmail'; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, phone, email, subject, message } = req.body;

    const htmlString = `
      <p>You have received a new message from your contact us form.</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    try {
      console.log('Sending email with data:', { to: process.env.RECEIVER_EMAIL, subject: `Contact Us Form: ${subject}`, html: htmlString });
      await sendEmail(process.env.RECEIVER_EMAIL as string, `Contact Us Form: ${subject}`, htmlString);
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'There was an error sending your message.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

// Load environment variables
const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY, // Use environment variable for API key
    domain: process.env.MAILGUN_DOMAIN,   // Use environment variable for domain
  },
};

const transporter = nodemailer.createTransport(mg(mailgunAuth));

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable for the sender email
    to,
    subject,
    html,
  };

  console.log('Mail options:', mailOptions); // Log email options

  try {
    console.log('Preparing to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error sending email:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error('Unknown error:', error);
    }
  }
};

export default sendEmail;

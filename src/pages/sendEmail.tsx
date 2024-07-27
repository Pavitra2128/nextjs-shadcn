import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

// Mailgun configuration
const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY as string, // Using environment variables
    domain: process.env.MAILGUN_DOMAIN as string,
  },
};

const transporter = nodemailer.createTransport(mg(mailgunAuth));

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER as string, // Using environment variables
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

import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

// Mailgun configuration
const mailgunAuth = {
  auth: {
    api_key: '8cb07055abc4fd50facb222197a0fd05-0f1db83d-498175d3', // Replace with your Mailgun API key
    domain: 'sandbox7535564fc66b4b84bfee93e8d455c547.mailgun.org',   
  },
};

const transporter = nodemailer.createTransport(mg(mailgunAuth));

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: 'templewebsite0508@example.com', // Replace with your verified Mailgun sender email
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

import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  // If no SMTP credentials are provided, just log the URL to the console for testing
  if (!process.env.SMTP_EMAIL || process.env.SMTP_EMAIL === 'dummy_user') {
    console.log('\n========================================================');
    console.log('📧 TEST EMAIL MODE (No SMTP credentials configured)');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);
    console.log('\nMessage:\n', options.message);
    console.log('========================================================\n');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Aptitude Platform'} <${process.env.FROM_EMAIL || 'noreply@aptitudeplatform.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error('Failed to send email. Ensure your SMTP settings are correct.', error);
    console.log('\n========================================================');
    console.log('📧 TEST EMAIL MODE (Fallback due to SMTP error)');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);
    console.log('\nMessage:\n', options.message);
    console.log('========================================================\n');
    // We do not throw the error so the app doesn't break during testing
  }
};

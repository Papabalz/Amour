import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
   port: 465,
   secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD
  }
});

export async function sendBookingConfirmation(bookingData: {
  name: string;
  email: string;
  location: string;
  travelDate: string;
  numberOfDays: number;
  adults: number;
  pickup_location: string;
  payment: string;
}) {
  try {
    const mjmlTemplate = fs.readFileSync(
      path.join(process.cwd(), 'src/lib/email/templates/booking-confirmation.mjml'),
      'utf8'
    );

    let htmlContent = mjmlTemplate
      .replace(/{{name}}/g, bookingData.name)
      .replace(/{{location}}/g, bookingData.location)
      .replace(/{{travelDate}}/g, bookingData.travelDate)
      .replace(/{{numberOfDays}}/g, bookingData.numberOfDays.toString())
      .replace(/{{adults}}/g, bookingData.adults.toString())
      .replace(/{{pickup_location}}/g, bookingData.pickup_location)
      .replace(/{{payment}}/g, bookingData.payment === 'pay_later' ? 'Pay on Arrival' : 'Online Payment');

    const { html } = mjml2html(htmlContent);

    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: bookingData.email,
      bcc: [process.env.DIRECTOR_EMAIL_1 as string, process.env.DIRECTOR_EMAIL_2 as string],
      subject: 'Booking Confirmation - Amour Tours',
      html
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(userData: {
  name: string;
  email: string;
}) {
  try {
    const mjmlTemplate = fs.readFileSync(
      path.join(process.cwd(), 'src/lib/email/templates/welcome.mjml'),
      'utf8'
    );

    let htmlContent = mjmlTemplate.replace(/{{name}}/g, userData.name);
    const { html } = mjml2html(htmlContent);

    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: userData.email,
      bcc: [process.env.DIRECTOR_EMAIL_1 as string, process.env.DIRECTOR_EMAIL_2 as string],
      subject: 'Welcome to Amour Tours!',
      html
    });

    return { success: true };
  } catch (error) {
    console.error('Welcome email sending failed:', error);
    return { success: false, error };
  }
}
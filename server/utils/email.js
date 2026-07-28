const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create a secure SMTP transporter using your Brevo SMTP credentials
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS // Note: For Nodemailer, this uses your xsmtpsib-... SMTP password
    }
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            // MUST be your verified email address in Brevo
            from: `"Eventiq" <${process.env.EMAIL_USER}>`, 
            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
                <h2>Hi ${userName}!</h2>
                <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
                <p>Thank you for choosing Eventiq.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Booking email sent successfully via SMTP to', userEmail);
    } catch (error) {
        console.error('Error sending booking email via SMTP:', error);
    }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        const title = type === 'account_verification' ? 'Verify your Eventiq Account' : 'Eventiq Booking Verification';
        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new Eventiq account.'
            : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            // MUST be your verified email address in Brevo
            from: `"Eventiq Support" <${process.env.EMAIL_USER}>`, 
            to: userEmail,
            subject: title,
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #111;">${title}</h2>
                    <p style="color: #555; font-size: 16px;">${msg}</p>
                    <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; background: #f4f4f4; width: max-content; letter-spacing: 5px;">
                        ${otp}
                    </div>
                    <p style="color: #999; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP sent via SMTP to ${userEmail} for ${type}`);
    } catch (error) {
        console.error('Error sending OTP email via SMTP:', error);
    }
};

module.exports = { sendBookingEmail, sendOTPEmail };
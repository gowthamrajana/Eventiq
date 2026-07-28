const { BrevoClient } = require('@getbrevo/brevo');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the Brevo HTTP client (communicates via Port 443, bypassing Render's SMTP block)
const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        await brevo.transactionalEmails.sendTransacEmail({
            subject: `Booking Confirmed: ${eventTitle}`,
            htmlContent: `
                <h2>Hi ${userName}!</h2>
                <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
                <p>Thank you for choosing Eventiq.</p>
            `,
            sender: { name: "Eventiq", email: process.env.EMAIL_USER },
            to: [{ email: userEmail }]
        });
        
        console.log('Email sent successfully via Brevo API to', userEmail);
    } catch (error) {
        console.error('Error sending email via Brevo API:', error);
    }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        const title = type === 'account_verification' ? 'Verify your Eventiq Account' : 'Eventiq Booking Verification';
        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new Eventiq account.'
            : 'Please use the following OTP to verify and confirm your event booking.';

        await brevo.transactionalEmails.sendTransacEmail({
            subject: title,
            htmlContent: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #111;">${title}</h2>
                    <p style="color: #555; font-size: 16px;">${msg}</p>
                    <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; background: #f4f4f4; width: max-content; letter-spacing: 5px;">
                        ${otp}
                    </div>
                    <p style="color: #999; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
                </div>
            `,
            sender: { name: "Eventiq", email: process.env.EMAIL_USER },
            to: [{ email: userEmail }]
        });

        console.log(`OTP sent via Brevo API to ${userEmail} for ${type}`);
    } catch (error) {
        console.error('Error sending OTP email via Brevo API:', error);
    }
};

module.exports = { sendBookingEmail, sendOTPEmail };
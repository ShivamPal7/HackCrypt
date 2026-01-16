import nodemailer from 'nodemailer';
import env from '../config/env';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: env.SMTP_EMAIL,
        pass: env.SMTP_PASSWORD
    },
});

export const sendOtp = async (to: string, code: string) => {
    const mailOptions = {
        from: env.SMTP_EMAIL,
        to,
        subject: 'Your Verification Code - HackCrypt',
        text: `Your verification code is: ${code}. It expires in 10 minutes.`,
        html: `<p>Your verification code is: <b>${code}</b></p><p>It expires in 10 minutes.</p>`,
    };

    try {
        if (!env.SMTP_EMAIL) {
            console.log(`[MOCK EMAIL] To: ${to}, Code: ${code}`);
            return;
        }
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${to}`);
    } catch (error: any) {
        console.error('Error sending email:', error.message);
        // Fallback for demo if SMTP fails
        console.log(`[FALLBACK] OTP for ${to}: ${code}`);
    }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("../config/env"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: env_1.default.SMTP_EMAIL,
        pass: env_1.default.SMTP_PASSWORD
    },
});
const sendOtp = async (to, code) => {
    const mailOptions = {
        from: env_1.default.SMTP_EMAIL,
        to,
        subject: 'Your Verification Code - HackCrypt',
        text: `Your verification code is: ${code}. It expires in 10 minutes.`,
        html: `<p>Your verification code is: <b>${code}</b></p><p>It expires in 10 minutes.</p>`,
    };
    try {
        if (!env_1.default.SMTP_EMAIL) {
            console.log(`[MOCK EMAIL] To: ${to}, Code: ${code}`);
            return;
        }
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${to}`);
    }
    catch (error) {
        console.error('Error sending email:', error.message);
        // Fallback for demo if SMTP fails
        console.log(`[FALLBACK] OTP for ${to}: ${code}`);
    }
};
exports.sendOtp = sendOtp;

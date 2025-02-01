require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios"); // Use axios instead of fetch

const app = express();
app.use(express.json());
app.use(cors());

const captchaSecret = process.env.RECAPTCHA_SECRET_KEY;

// Email sending route
app.post("/send-email", async (req, res) => {
    const { name, email, message, captcha } = req.body;
    console.log(captcha)
    console.log(captchaSecret)

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (!captcha) {
        return res.status(400).json({ error: "CAPTCHA verification failed" });
    }

    const captchaVerifyURL = `https://www.google.com/recaptcha/api/siteverify`;

    try {
        // Verify reCAPTCHA
        const captchaResponse = await axios.post(captchaVerifyURL, new URLSearchParams({
            secret: captchaSecret,
            response: captcha,
        }).toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" } // Required for Google API
        });

        if (!captchaResponse.data.success) {
            return res.status(400).json({ error: "Failed CAPTCHA verification." });
        }

        // Configure email transporter
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: process.env.EMAIL_PORT === "465", // Secure true only for port 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: "New mail from guglie.dev website",
            text: message,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Email sending failed" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import nodemailer from "nodemailer";

// Configure the SMTP transporter used to send emails from the backend.
const transporter = nodemailer.createTransport({
	host: "smtp-relay.brevo.com",
	port: 587,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});

export default transporter;

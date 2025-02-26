import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_EMAIL_PASS = process.env.ADMIN_EMAIL_PASS;

  const { name, mobile, address, product , description } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use any SMTP provider
    auth: {
      user: ADMIN_EMAIL, // Admin's email
      pass: ADMIN_EMAIL_PASS, // App Password (not your actual password)
    },
  });

  try {
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL, // Admin receives the email
      subject: "New Order Received",
      text: `New order received:\n\nName: ${name}\nMobile: ${mobile}\nAddress: ${address}\nProduct: ${product} \nDescription: ${description}`,
    });

    return res.status(200).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send email" });
  }
}

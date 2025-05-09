require("dotenv").config(); // Load .env file

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like index.html, CSS, etc.)
app.use(express.static(path.join(__dirname, "..")));

// Handle form submission
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: `"My Website Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text:
      `You received a new message from your website contact form:\n\n` +
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent to your Gmail!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending message");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

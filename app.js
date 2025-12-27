const express = require("express");
const bodyParser = require("body-parser");
/*const nodemailer = require("nodemailer");*/
const mongoose = require("mongoose");
const Message = require("./models/Message");
require("dotenv").config();

const app = express();

/* =========================
   DATABASE CONNECTION
========================= 
mongoose.connect("mongodb://127.0.0.1:27017/Portfolio")*/
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* =========================
   APP CONFIG
========================= */
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/connect", (req, res) => {
  res.render("connect", { msg: null });
});

/* =========================
   CONTACT FORM HANDLER
========================= */
/*app.post("/connect", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1️⃣ Save to MongoDB
    await Message.create({ name, email, message });

    // 2️⃣ Send Email
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
 
});

const mailOptions = {
  from: `"Portfolio Website" <ankitabamne2004@gmail.com>`,
  to: "ankitabamne2004@gmail.com",
  replyTo: email,
  subject: "New Portfolio Contact Request",
  text: `
Name: ${name}
Email: ${email}
Message:
${message}
  `
};

await transporter.sendMail(mailOptions);


    // 3️⃣ Response
    res.render("connect", {
      msg: "✅ Message sent successfully!"
    });

  } catch (error) {
    console.log(error);
    res.render("connect", {
      msg: "❌ Something went wrong. Please try again."
    });
  }
});

/* =========================
   SERVER
========================= */

/*app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});


require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = (req, res) => {
  const { to } = req.query;

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: "Hello From Rohit Dhas!",
    html: "<h2>Thanks for Rating 👍🏻</h2>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Something Went Wrong!❌");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email Sent Successfully!🚀");
    }
  });
};

module.exports = { sendMail };
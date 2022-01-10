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
  const { to, movie, type } = req.query;

  const emailType = {
    rating: {
      subject: "Hello From Rohit Dhas!",
      html: `<h4>Thanks for Rating ${movie} on MovieFlixer 👍🏻</h4>`,
    },
    purchase: {
      subject: "Purchase Successful✅!",
      html: `<div>
        <h3>Your Purchase of ${movie} on MovieFlixer was Successful!🚀</h3>
        <p>This purchase will appear in your puchase section shortly!</p>
      </div>`,
    },
  };

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: emailType[type].subject,
    html: emailType[type].html,
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

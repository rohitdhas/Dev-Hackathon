require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const searchRoutes = require("./routes/searchRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const mailRoutes = require("./routes/mailerRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const app = express();
// ----------------------

// DB & SERVER CONNECTION
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose Connected!✅");
    app.listen(process.env.PORT, () => console.log("Server is Running!"));
  })
  .catch((err) => console.log(err));

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: "*" }));
// ----------------------

// ROUTES
app.get("/", (req, res) => {
  res.status(200).json({ success: true, uid: uuidv4() });
});

app.use(searchRoutes);
app.use(ratingRoutes);
app.use(mailRoutes);
app.use(stripeRoutes);
// ----------------------

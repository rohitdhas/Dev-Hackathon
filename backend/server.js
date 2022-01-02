require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { sendMail } = require("./controller/mailHandler");
const searchRoutes = require("./routes/searchRoutes");
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
app.use(cors({ origin: "*" }));
// ----------------------

// ROUTES
app.use(searchRoutes);
app.get("/mail", sendMail);
// ----------------------

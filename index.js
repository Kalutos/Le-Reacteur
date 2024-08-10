const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
app.use(express());
app.use(cors());

// connexion a mes services
// mongoose
mongoose.connect(process.env.MONGODB_URI);
// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const userRouter = require("./routes/user");
const offerRouter = require("./routes/offer");

app.use("/user", userRouter); // le "/user" est un préfixe qui sera ajouté à toutes les routes de userRouter
app.use(offerRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "all route",
  });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Users = require("./models/Users");

const url =
  "mongodb+srv://bhargavkachhadiya1988:12345@bhargav.cmoi6kt.mongodb.net/?retryWrites=true&w=majority&appName=bhargav";

const app = express();
app.use(express.json());
app.use(cors());
// mongoose.set("strictQuery", true);
mongoose
  .connect(url, {})
  .then(() => {
    console.log("Connected Successfully");
    app.get("/", async (req, res) => {
      const user = await Users.find();
      res.send(user);
    });
  })
  .catch((err) => console.log(err));

app.listen(5000);

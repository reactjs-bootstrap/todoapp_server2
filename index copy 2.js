const express = require("express");
const mongoose = require("mongoose");
const Users = require("./models/Users");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/todoapp");

app.get("/", async (req, res) => {
  const user = await Users.find();
  res.send(user);
});

app.get("/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await Users.findById({ _id: reqId });
  res.send(user);
});

app.post("/", async (req, res) => {
  const user = await Users.create(req.body);
  res.send(user);
});

app.put("/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await Users.findByIdAndUpdate(
    { _id: reqId },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  );
  res.send(user);
});

app.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await Users.findByIdAndDelete({ _id: reqId });
  res.send(user);
});

app.listen(5000, () => {
  console.log("Server is running on PORT NO : 5000");
});

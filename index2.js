const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/todoapp");

app.post("/create", async (req, res) => {
  const user = await UserModel.create(req.body);
  console.log(user);
  res.send(user);
});

app.put("/updateuser/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await UserModel.findByIdAndUpdate(
    { _id: reqId },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/", async (req, res) => {
  const user = await UserModel.find();
  res.send(user);
});

app.get("/getuser/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await UserModel.findById({ _id: reqId });
  res.send(user);
});

app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  const user = UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.listen(5000, () => {
  console.log("Server is running on PORT NO : 5000");
});

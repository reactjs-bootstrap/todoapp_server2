const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Users");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/todoapp");

app.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

app.get("/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await User.findById({ _id: reqId });
  res.send(user);
});

app.post("/", async (req, res) => {
  const user = await User.create(req.body);
  // const result = await user.save();
  res.send(user);
});

app.put("/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await User.findByIdAndUpdate(
    { _id: reqId },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  );
  res.send(user);
});

// app.put("/updateuser/:id", async (req, res) => {
//   const reqId = req.params.id;
//   const user = await UserModel.findByIdAndUpdate(
//     { _id: reqId },
//     { name: req.body.name, email: req.body.email, age: req.body.age }
//   )
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

app.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  const user = await User.findByIdAndDelete({ _id: reqId });
  res.send(user);
});

// app.delete("/deleteuser/:id", (req, res) => {
//   const reqId = req.params.id;
//   const user = UserModel.findByIdAndDelete({ _id: reqId })
//     .then((res) => res.json(res))
//     .catch((err) => res.json(err));
// });

app.listen(5000, () => {
  console.log("Server is running on PORT NO : 5000");
});

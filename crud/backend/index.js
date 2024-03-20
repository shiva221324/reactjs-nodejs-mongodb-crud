const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/crud");

//add user
app.post("/add", (req, res) => {
  console.log(req.body);
  try {
    UserModel.create(req.body);
  } catch (err) {
    console.log(err);
  }
});

//get all users
app.get("/", (req, res) => {
  const fetchall = async () => {
    const data = await UserModel.find({});
    res.json(data);
  };
  fetchall();
});

//view specific user
app.get("/view/:id", (req, res) => {
  const fetchuser = async () => {
    const id = req.params.id;
    const data = await UserModel.find({ _id: id });
    res.json(data);
  };
  fetchuser();
});

//update user
app.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  const fetchuserupdate = async () => {
    await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        study: req.body.study,
        phonenumber: req.body.phonenumber,
      }
    );
    res.json(req.body);
  };
  fetchuserupdate();
});

//delter user
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const fetchuserdelete = async () => {
    await UserModel.findByIdAndDelete({ _id: id });
    res.json(req.body);
  };
  fetchuserdelete();
});
app.listen(8080, () => {
  console.log("backend is connected");
});

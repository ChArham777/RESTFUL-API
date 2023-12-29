const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./MOCK_DATA.json');
const PORT = 8000;
var cors=require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/UsersDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection Success"))
  .catch((err) => console.log(err, "Error Connection"));

const db = mongoose.connection;
app.use(express.json());
app.use(cors());

const usersSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
});

const usersModel = mongoose.model('userModel', usersSchema);

app.listen(PORT, () => console.log(`SERVER STARTED AT PORT:${PORT}`));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/search", (req, res) => {
  res.send("API Search");
});

app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await usersModel.find();
    res.send(allUsers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await usersModel.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
      },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).send('User not found');
    } else {
      res.send(updatedUser);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await usersModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).send('User not found');
    } else {
      res.send(deletedUser);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = new usersModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
    });
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

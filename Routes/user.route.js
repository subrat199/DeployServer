const express = require("express");
const userRouter = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/user.model");

userRouter.post("/register", async (req, res) => {
  const { email, pass, name } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      const userdata = new UserModel({ email, pass: hash, name });
      await userdata.save();
      res.status(200).send({ msg: "New user added" });
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, function (err, result) {
        // result == true
        if (result) {
          const token = jwt.sign(
            { authorID: user._id },
            "masai"
          );
          res.status(200).send({ msg: "Login sucees", token: token });
        } else {
          res.status(200).send({ msg: "wrong credintials sucees" });
        }
      });
    } else {
      res.status(200).send({ msg: "wrong credintials sucees" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
  const user = await UserModel.findOne({ email, pass });
  if (user) {
    console.log("login");
  }
});

module.exports = {
  userRouter,
};
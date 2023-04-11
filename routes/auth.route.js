const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");



authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const alreadyexisting = await User.findOne({ email });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hash,
    });
    if (alreadyexisting) {
      return res.json({
        msg: "user already exist",
      });
    }
    await user.save();
    return res.json({
      msg: "registered successfully...",
      data: user,
    });
  } catch (err) {
    return res.send(err);
  }
});



authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    await bcrypt.compare( password, user.password,function (err, result) {
        if (err) {
          return res.send("invalid credentials!");
        }
        if (result) {
          const { password, ...others } = user._doc;
          const token = jwt.sign({ userId: user._id }, "ekfuhewofi");
          return res.json({
            msg: "login successfull...",
            data: others,
            token: token,
          });
        }
      }
    );
  } catch (err) {
    return res.send(err);
  }
});

module.exports = authRouter;

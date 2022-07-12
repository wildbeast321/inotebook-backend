const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Anirudh3@12345";

//Create a User using  : POST "/api/auth/createuser" no login requried

router.post(
  "/createuser",
  [
    body("email", "Enter A Valid Email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
    body("name", "Enter A Valid Name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //If there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check whether user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }
      //adding salt and hashing password using bcryptjs
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
    //catch errors
  }
);
module.exports = router;

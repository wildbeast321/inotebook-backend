const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../Models/User");

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
    //Check whether user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured")
    }
    //catch errors
  }
);
module.exports = router;

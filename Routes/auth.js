const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User= require("../Models/User");

//Create a User using  : POST "/api/auth"

router.post("/", [
  body('email',"Enter A Valid Email").isEmail(),
  body('password',"Password must be atleast 8 characters").isLength({ min: 8 }),
  body('name',"Enter A Valid Name").isLength({ min: 3 }),
],(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  }).then(user => res.json(user)).catch(err=>{console.log(err)
  res.json({error:"PLease enter a Unique Email ", message: err.message})})

 
});
module.exports = router;

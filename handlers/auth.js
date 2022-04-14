const { AuthValidation } = require("../middlewares/validators");
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User, Role } = require('../models');


router.post(
    '/',
    AuthValidation.login,
    AuthValidation.responseAuth,
    async function getSongs(req,res){
        const { email, password } = req.headers;

        const foundUser = await User.findOne({
          where: { email: email },
          include: {
            model: Role
          }
        });
      
        if(foundUser.validPassword(password)) {
          const { email, id, role } = foundUser;
      
          // on génère le jwt avec les informations importantes
          const token = generateAccessToken(email, role, id);
          return res.json({ access_token: token });
        }
      
        return res
        .status(403)
        .json({
          statusCode: 403,
          message: 'Forbidden'
        });
    },
);

const generateAccessToken = (email, role, id) => {
    return jwt.sign({ email ,role, id }, 'secret', { expiresIn: '1800s' }
    );
  }
  
  module.exports = router;
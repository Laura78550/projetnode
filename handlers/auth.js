const { AuthValidation } = require("../middlewares/validators");
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User, Role } = require('../models');

router.post(
    '/',
    AuthValidation.login,
    AuthValidation.responseAuth,
    async function getToken(req,res){
        const { email, password } = req.headers;
        const foundUser = await User.findOne({
          where: { email: email },
          include: {
            model: Role
          }
        });

        if(foundUser){          
          if(foundUser.validPassword(password)) {
            const { email, id, role } = foundUser;
            const token = generateAccessToken(email, role, id);
            return res.json({ message: token });
          }else{
            return res
            .status(403)
            .json({
              message: 'Wrong password',
            });
          }          
        }else{
          return res
          .status(403)
          .json({
            message: 'User Not Found',
          });
        }        
    },
);

const generateAccessToken = (email, role, id) => {
    return jwt.sign({ email ,role, id }, 'secret', { expiresIn: '1800s' }
    );
  }
  
  module.exports = router;
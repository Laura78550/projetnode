const { AuthValidation } = require("../middlewares/validators");
const express = require('express');
const router = express.Router();


router.get(
    '/login',
    AuthValidation.login,
    AuthValidation.responseAuth,
    async function getSongs(req,res){
        const { email, password } = req.body;

        const foundUser = await User.findOne({
          where: { email: email },
          include: {
            model: Role
          }
        });
      
        if(foundUser.validPassword(password)) {
          const { email, id, role } = foundUser;
      
          // on génère le jwt avec les informations importantes
          const token = generateAccessToken(email, foundUser.Role.name, id);
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
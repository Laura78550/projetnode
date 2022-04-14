const jwt = require('jsonwebtoken');

const { User, Role } = require('../models');

module.exports.auth = async (req, res, next) => {
    if(req.headers.authorization) {
      const token = req.headers.authorization;
      try {
          const jwtUser = jwt.verify(token, 'secret');
          const user = await User.findByPk(jwtUser.id, {
            include: {
              model: Role
            }
          });

          if(user){
            req.auth = {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              id: user.id,
              role: user.Role.name,
            };
            next();
          }else{
            return res
                  .status(404)
                  .json({
                    message: 'User Not Found',
                  });
          }

        } catch(e) {
          return res
                .status(400)
                .json({
                  message: 'Wrong Token',
                });
        }
    
      } else {
        return res
              .status(401)
              .json({
                message: 'Wrong Authorization',
              });
      }
}

module.exports.authValidUser = async (req, res, next) => {
  if (req.auth.role == "user"){
    next();
  }else{
    return res
    .status(401)
    .json({
      message: 'User Unauthorized',
    });
  }
}
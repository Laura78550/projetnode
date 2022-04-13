const jwt = require('jsonwebtoken');

const { User, Role } = require('../models');

module.exports = async (req, res, next) => {
    if(req.headers.authorization) {

        try {
          const token = req.headers.authorization.split(" ")[1];
    
          const jwtUser = jwt.verify(token, 'secret');
    
          const user = await User.findByPk(jwtUser.id, {
            include: {
              model: Role
            }
          });

          req.auth = {
            fistname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id: user.id,
            role: user.Role.name,
          };
    
          next();
        } catch(e) {
          return res.status(403).json({
            statusCode: 403,
            message: 'Forbidden',
          });
        }
    
      } else {
        return res.status(403).json({
          statusCode: 403,
          message: 'Forbidden',
        });
      }
}
'use strict';

const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    static associate(models) {
      // define association here      
      User.belongsTo(models.Role);
      User.hasMany(models.Lyric)
    }
  }
  User.init({
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },
   firstName: DataTypes.STRING,
   lastName: DataTypes.STRING,
   email: DataTypes.STRING,
   password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
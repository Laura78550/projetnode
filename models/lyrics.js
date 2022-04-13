'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lyric extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here  
      Lyric.belongsTo(models.User);
    }
  }
  Lyric.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
   },
    songName: DataTypes.STRING,
    songAuthor: DataTypes.STRING,
    songLyrics: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Lyric',
  });
  return Lyric;
};
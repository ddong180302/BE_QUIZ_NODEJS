'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.hasMany(models.Participant_Quiz, { foreignKey: 'participantId', as: 'participantData' })
    }
  };
  Participant.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
    deletedAt: DataTypes.DATE,
    refreshToken: DataTypes.STRING,
    refreshExpired: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};
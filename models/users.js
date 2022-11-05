'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({posts}) {
      // define association here
      users.hasMany(posts,{foreignKey:'userid'})
    }
  }
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    tableName:'users',
    modelName: 'users',
  });
  return users;
};
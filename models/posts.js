'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      posts.belongsTo(users,{foreignKey:'userid'})
    }
  }
  posts.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'posts',
  });
  return posts;
};
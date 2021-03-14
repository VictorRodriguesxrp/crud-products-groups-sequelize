const { DataTypes, Model} = require('sequelize');

class Groups extends Model {
  static init (sequelize) {
    super.init({
        description: DataTypes.STRING
      }, {
        tableName: 'Groups',
        freezeTableName: true,
        sequelize,
      }        
    );
    return this;
  }
  
  static associate(models) {
    this.hasMany(models.Products, { foreignKey: 'id', as: 'ProductsGroups'})
  }
};

module.exports = Groups;

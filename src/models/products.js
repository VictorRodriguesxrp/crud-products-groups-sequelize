const { DataTypes, Model} = require('sequelize');

class Products extends Model {
  static init (sequelize) {
    super.init({
        hash: DataTypes.STRING,
        description: DataTypes.STRING,
        shortname: DataTypes.STRING,
        group_id: {
          type: DataTypes.INTEGER,
          allowNull : true,
        },
      }, {
        tableName: 'Products',
        freezeTableName: true,
        sequelize,
      }        
    );
  }
  static associate(models) {
    this.belongsTo(models.Groups, { foreignKey: 'group_id', as: 'ProductsGroups'})
  }
};

module.exports = Products;
 
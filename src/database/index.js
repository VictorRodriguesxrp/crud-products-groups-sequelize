const Sequelize = require("sequelize");
const dbConfig = require('../config/database');

const Products = require('../models/products');
const Groups = require('../models/groups');

const connection = new Sequelize(dbConfig);

Products.init(connection);
Groups.init(connection);

Products.associate(connection.models);
Groups.associate(connection.models);

module.exports = connection;
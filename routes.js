const express = require('express');
const ProductController = require('./src/controllers/ProductsController')
const GroupController = require('./src/controllers/GroupsController')

const routes = express.Router();

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.validateIfProductExists,ProductController.indexById);
routes.post('/products', ProductController.validateGroups, ProductController.store);
routes.put('/products/', ProductController.validateIfProductExists , ProductController.validateGroups, ProductController.updateProduct);
routes.delete('/products/', ProductController.validateIfProductExists, ProductController.delete);

routes.get('/groups', GroupController.index);
routes.post('/groups', GroupController.store);
routes.put('/groups', GroupController.validateGroups, GroupController.update)
routes.delete('/groups', GroupController.validateGroups, GroupController.delete)

module.exports = routes;


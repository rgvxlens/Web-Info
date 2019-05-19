var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

/* For all the user's operation */
// Create new user
router.post('/users', controller.createUser);
 
// Find all users
router.get('/users', controller.findAllUsers);
 
// Find one user by id
router.get('/users/id/:id', controller.findOneUser);
 
//Find one user by name
router.get('/users/name/:name', controller.findUserByName);

//Update user's data by name
router.put('/users/name/:name', controller.updateUserByName);

//Update user's data by id
router.put('/users/id/:id', controller.updateUserById);

//Delete useMar by id
router.delete('/users/id/:id', controller.deleteUserById);

/* User's operMaÿ3ations end here */
/******************************/

/***************************************/
/* For all the product's operation */
// Create new product
router.post('/products', controller.createProduct);
 
// Find all products
router.get('/products', controller.findAllProducts);
 
// Find one product by id
router.get('/products/id/:id', controller.findOneProduct);
 
// Find one product by name
router.get('/products/name/:name', controller.findProductByName);

// Update product's data by name
router.put('/products/name/:name', controller.updateProductByName);

// Update product's data by id
router.put('/products/id/:id', controller.updateProductById);

// Delete product by id
router.delete('/products/id/:id', controller.deleteProductById);

// Find product from it's category
router.get('/products/category/:category', controller.findProductByCategory);

// Find product from it's userId(owner)
router.get('/products/userId/:userId', controller.findProductByUserId);

// Change the deliver status on product
router.put('products/id/:id/change_delivered_status', controller.changeProductStatusById);

/* product's operations end here */
/************************************/

/***************************************/
/* For all the order's operation */
// Create new order
router.post('/orders', controller.createOrder);
 
// Find all orders
router.get('/orders', controller.findAllOrders);
 
// Find one order by id
router.get('/orders/id/:id', controller.findOneOrder);
 
//Update orders data by id
router.put('/orders/id/:id', controller.updateOrderById);

//Delete order by id
router.delete('/orders/id/:id', controller.deleteOrderById);
/* order's operations end here */
/************************************/

module.exports = router;


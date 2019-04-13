var mongoose = require('mongoose');
var User = mongoose.model('users');
var Product = mongoose.model('products');
var Order = mongoose.model('orders');
var express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


/* For all the user's operation */
// Create new user
var createUser = function(req, res) {
    var user = new User({
        "createdAt":req.body.createdAt,
        "userId":req.body.userId,
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "phoneNumber":req.body.phoneNumber,
        "userRating":req.body.userRating,
        "streetAddress": {
            "components": {
              "street":req.body.streetAddress.components.street,
                "number":req.body.streetAddress.components.number,
                "city":req.body.streetAddress.components.city,
                "area":req.body.streetAddress.components.area,
                "country":req.body.streetAddress.components.country,
                "postalCode":req.body.streetAddress.components.postalCode,
                "building":req.body.streetAddress.components.building 
            }
        }
    });
    
    user.save(function(err, newUser) {
        if (!err) {
            res.send(newUser);
        } else {
            res.sendStatus(400);
        }
    });
};
 
// Find all users
var findAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (!err) {
            res.send(users);
        } else {
            res.sendStatus(404);
        }
    });
};
 
// Find one user by id
var findOneUser = function(req, res) {
    var userInx = req.params.id;
    User.findById(userInx, function(err, user) {
        if (!err) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    });
};
 
//Find one user by name
var findUserByName = function(req, res) {
    var userName = req.params.name;
    User.findOne({name:userName}, function(err, user) {
        if (!err) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    });
};

//Update user's data by name
//Can't change the name, otherwise, it won't be able to find it
var updateUserByName = function(req, res) {
    var userName = req.params.name;
    User.findOne({name:userName}, function(err, user) {
        if (err) {
            res.sendStatus(404);
        }
        
        user.email = req.body.email;
        user.password = req.body.password;
        
        user.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(user);
        });
    });

};

//Update user's data by id
var updateUserById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            res.sendStatus(404);
        }
       
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        
        user.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(user);
        });
    });
};


//Delete user by id
var deleteUserById = function(req, res) {
    var userId = req.params.id;
    User.findByIdAndRemove(userId, function(err, user) {
        if (!err) {
            res.send("delete user");
        } else {
            res.status(404).send(err);
        }
   });
};


module.exports.createUser = createUser;
module.exports.findAllUsers = findAllUsers;
module.exports.findOneUser = findOneUser;
module.exports.findUserByName = findUserByName;
module.exports.updateUserById = updateUserById;
module.exports.updateUserByName = updateUserByName;
module.exports.deleteUserById = deleteUserById;
/* User's operations end here */
/******************************/

/***************************************/
/* For all the products operation */
// Create new product
var createProduct = function(req, res) {
    var product = new Product(
        {
            "userId":req.body.userId,
            "createdAt":req.body.createdAt,
            "name":req.body.name,
            "description":req.body.description,
            "expirationDate":req.body.expirationDate,
            "category":req.body.category,
            "condition":req.body.condition,
            "rating":req.body.rating
        }
    );

    product.save(function(err, newProduct) {
        if (!err) {
            res.send(newProduct);
        } else {
            console.log("here");
            res.sendStatus(400);
        }
    });
};
 
// Find all products
var findAllProducts = function(req, res) {
    Product.find(function(err, products) {
        if (!err) {
            res.send(products);
        } else {
            res.sendStatus(404);
        }
    });
};

// Find one product by id
var findOneProduct = function(req, res) {
    var restInx = req.params.id;
    Product.findById(restInx, function(err, product) {
        if (!err) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
};
 
//Find one product by name
var findProductByName = function(req, res) {
    var restName = req.params.name;
    Product.find({name:restName}, function(err, product) {
        if (!err) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
};


//Update user's data by name
var updateProductByName = function(req, res) {
    var restName = req.params.name;
    Product.findOne({name:restName}, function(err, product) {
        if (err) {
            res.sendStatus(404);
        }
        
        product.location = req.body.location;
        product.food = req.body.food;
        product.time = req.body.time;

        product.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(product);
        });
    });


};

//Update user's data by id
var updateProductById = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            res.sendStatus(404);
        }
       
        product.name = req.body.name;
        product.location = req.body.location;
        product.food = req.body.food;
        product.time = req.body.time;

        product.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(product);
        });
    });

};

//Delete restaurant by id
var deleteProductById = function(req, res) {
    var restId = req.params.id;
    Product.findByIdAndRemove(restId, function(err, product) {
        if (!err) {
            res.send("delete product");
        } else {
            res.sendStatus(404);
        }
    });
};


module.exports.createProduct = createProduct;
module.exports.findAllProducts = findAllProducts;
module.exports.findOneProduct = findOneProduct;
module.exports.findProductByName = findProductByName;
module.exports.updateProductById = updateProductById;
module.exports.updateProductByName = updateProductByName;
module.exports.deleteProductById = deleteProductById;

/* Restaurant's operations end here */
/************************************/

/***************************************/
/* For all the orders operation */
// Create new Order
var createOrder = function(req, res) {
    var order = new Order(
        {
            "orderId":req.body.orderId,
            "supplierId":req.body.supplierId,
            "recieverId":req.body.recieverId,
            "createdAt":req.body.createdAt,
            "supRating":req.body.supRating,
            "recRating":req.body.recRating,
            "productId":req.body.productId 
        }
    );

    order.save(function(err, newOrder) {
        if (!err) {
            res.send(newOrder);
        } else {
            res.sendStatus(400);
        }
    });
};
 
// Find all products
var findAllOrders = function(req, res) {
    Order.find(function(err, orders) {
        if (!err) {
            res.send(orders);
        } else {
            res.sendStatus(404);
        }
    });
};

// Find one order by id
var findOneOrder = function(req, res) {
    var restInx = req.params.orderId;
    Order.findById(restInx, function(err, order) {
        if (!err) {
            res.send(order);
        } else {
            res.sendStatus(404);
        }
    });
};

//Update orders data by id
var updateOrderById = function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if (err) {
            res.sendStatus(404);
        }
        order.supplierId = req.body.supplierId,
        order.recieverId = req.body.recieverId,
        order.createdAt = req.body.createdAt,
        order.supRating = req.body.supRating,
        order.recRating = req.body.recRating,
        order.productId = req.body.productId 

        order.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(order);
        });
    });

};

//Delete order by id
var deleteOrderById = function(req, res) {
    var restId = req.params.id;
    Order.findByIdAndRemove(restId, function(err, order) {
        if (!err) {
            res.send("delete order");
        } else {
            res.sendStatus(404);
        }
    });
};


module.exports.createOrder = createOrder;
module.exports.findAllOrders = findAllOrders;
module.exports.findOneOrder = findOneOrder;
module.exports.updateOrderById = updateOrderById;
module.exports.deleteOrderById = deleteOrderById;

/* Restaurant's operations end here */
/************************************/


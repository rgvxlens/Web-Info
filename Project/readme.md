# Kitchen2Kitchen

Assignment 2: Mockup Application Server (Week 6)

* [Kitchen2Kitchen on Heroku](https://kitchen2kitchen.herokuapp.com/) 
* [Kitchen2Kitchen on Github](https://github.com/masonhsieh/Web-Info/tree/master/Project)


## Instructions on how to test
### User-based Operations
* **Creating a new user (can be tested with Insomnia (or any other REST client)**

  ```router.post('/users', controller.createUser);```
 

* **Getting a list of all the users**

   ```router.get('/users', controller.findAllUsers);```
  
  Example:

  [https://kitchen2kitchen.herokuapp.com/users/](https://kitchen2kitchen.herokuapp.com/users/)
   

* **Finding a particular user by their ID**

   ```router.get('/users/id/:id', controller.findOneUser);```
  
  Example:

  [https://kitchen2kitchen.herokuapp.com/users/id/5cb1e3546eea5150a12cec38](https://kitchen2kitchen.herokuapp.com/users/id/5cb1e3546eea5150a12cec38)
     

* **Finding a particular user by their name**

   ```router.get('/users/name/:name', controller.findUserByName);```
  
  Example:

  [https://kitchen2kitchen.herokuapp.com/users/name/te23423](https://kitchen2kitchen.herokuapp.com/users/name/te23423)
     

* **Updating a particular user's details by their name (can be tested with Insomnia (or any other REST client)**

   ```router.put('/users/name/:name', controller.updateUserByName);```


* **Updating a particular user's details by their ID (can be tested with Insomnia (or any other REST client)**

   ```router.put('/users/id/:id', controller.updateUserById);```
  

* **Deleting a particular user details by their ID (can be tested with Insomnia (or any other REST client)**

   ```router.delete('/users/id/:id', controller.deleteUserById);```


### Product-based Operations
* **Creating a new product in the DB (can be tested with Insomnia (or any other REST client)**

  ```router.post('/products', controller.createProduct);```


* **Finding a list of all the product in the DB**

   ```router.get('/products', controller.findAllProducts);```
   
  Example:

  [https://kitchen2kitchen.herokuapp.com/products/](https://kitchen2kitchen.herokuapp.com/products/)


* **Finding a particular product in the DB by their ID**

   ```router.get('/product/id/:id', controller.findOneRestaurant);```
   
  Example:

  [https://kitchen2kitchen.herokuapp.com/products/id/5cb14cba74a9292fe0cfe536](https://kitchen2kitchen.herokuapp.com/products/id/5cb14cba74a9292fe0cfe536)
   

* **Update a product's details by ID of the product (can be tested with Insomnia (or any other REST client)**

  ```router.put('/products/id/:id', controller.updateProductById);```


* **Deleting a product by their ID in the DB (can be tested with Insomnia (or any other REST client)**

  ```router.delete('/products/id/:id', controller.deleteProductById);```


### Order-based Operations
* **Creating a new order in the DB (can be tested with Insomnia (or any other REST client)**

  ```router.post('/orders', controller.createOrder);```
  
  
* **Finding all the orders in the DB**

  ```router.get('/orders', controller.findAllOrders);```
  
  Example:
  
  [http://kitchen2kitchen.herokuapp.com/orders](http://kitchen2kitchen.herokuapp.com/orders)


* **Finding a particular order in the DB**

  ```router.get('/orders/id', controller.findOneOrder);```  


* **Updating an order's data in the DB by its ID**

  ```router.put('/orders/id/:id', controller.updateOrderById);```


* **Deleting an order by its ID**

  ```router.delete('/orders/id/:id', controller.deleteOrderById);```

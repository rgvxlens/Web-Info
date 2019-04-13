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

  [https://https://kitchen2kitchen.herokuapp.com/users/](https://https://kitchen2kitchen.herokuapp.com/users/)
   

* **Finding a particular user by their ID**

   ```router.get('/users/id/:id', controller.findOneUser);```
  
  Example:

  [https://https://kitchen2kitchen.herokuapp.com/users/id/5ca6eed01c9d440000770310](https://https://kitchen2kitchen.herokuapp.com/users/id/5ca6eed01c9d440000770310)
     

* **Finding a particular user by their name**

   ```router.get('/users/name/:name', controller.findUserByName);```
  
  Example:

  [https://https://kitchen2kitchen.herokuapp.com/users/name/patrick](https://https://kitchen2kitchen.herokuapp.com/users/name/patrick)
     

* **Updating a particular user's details by their name (can be tested with Insomnia (or any other REST client)**

   ```router.put('/users/name/:name', controller.updateUserByName);```


* **Updating a particular user's details by their id (can be tested with Insomnia (or any other REST client)**

   ```router.put('/users/id/:id', controller.updateUserById);```
  

* **Deleting a particular user details by their id (can be tested with Insomnia (or any other REST client)**

   ```router.delete('/users/id/:id', controller.deleteUserById);```


### Restaurant-based Operations
* **Creating a new restaurant in the DB (can be tested with Insomnia (or any other REST client)**

  ```router.post('/restaurants', controller.createRestaurant);```


* **Finding a list of all the restaurants in the DB**

   ```router.get('/restaurants', controller.findAllRestaurants);```
   
  Example:

  [https://kitchen2kitchen.herokuapp.com/restaurants/](https://kitchen2kitchen.herokuapp.com/restaurants/)


* **Finding a particular restaurant in the DB by their id**

   ```router.get('/restaurants/id/:id', controller.findOneRestaurant);```
   
  Example:

  [https://kitchen2kitchen.herokuapp.com/restaurants/id/5cb173d81c9d44000031397e](https://kitchen2kitchen.herokuapp.com/restaurants/id/5cb173d81c9d44000031397e)
   

* **Finding a particular restaurant in the DB by its name**

   ```router.get('/restaurants/name/:name', controller.findRestaurantByName);```
   
   Example:
   
   [https://kitchen2kitchen.herokuapp.com/restaurants/name/Hungry%20Jacks](https://kitchen2kitchen.herokuapp.com/restaurants/name/Hungry%20Jacks)


* **Update a user's details by name of the restaurant (can be tested with Insomnia (or any other REST client)**

  ```router.put('/restaurants/nae/:name', controller.updateRestaurantByName);```


* **Update a user's details by id of the restaurant (can be tested with Insomnia (or any other REST client)**

  ```router.put('/restaurants/id/:id', controller.updateRestaurantById);```


* **Deleting a restaurant by their id in the DB (can be tested with Insomnia (or any other REST client)**

  ```router.delete('/restaurants/id/:id', controller.deleteRestaurantById);```


### Order-based Operations
* **Creating a new order in the DB (can be tested with Insomnia (or any other REST client)**

  ```router.post('/orders', controller.createOrder);```
  
  
* **Finding all the orders in the DB**

  ```router.get('/orders', controller.findAllOrders);```
  
  Example:
  
  [http://kitchen2kitchen.herokuapp.com/orders](http://kitchen2kitchen.herokuapp.com/orders)


* **Finding a particular order in the DB**

  ```router.get('/orders/id', controller.findOneOrder);```  


* **Updating an order's data in the DB by its id**

  ```router.put('/orders/id/:id', controller.updateOrderById);```


* **Deleting an order by its id**

  ```router.delete('/orders/id/:id', controller.deleteOrderById);```

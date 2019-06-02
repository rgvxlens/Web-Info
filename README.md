# Kitchen2Kitchen
## :carrot: No one knows food like we do! :apple:
<br>
<p align="center">
  <img width="67" height="67" src="https://raw.githubusercontent.com/rgvx/icons/master/restaurant%20%283%29.png">
</p>
<p align="center">Deliverable 4: Frontend + Backend delivery
<br>

* [Kitchen2Kitchen on Heroku](https://kitchen2kitchen.herokuapp.com/#/home)
* [Kitchen2Kitchen on Github](https://github.com/masonhsieh/Web-Info/tree/master/Project)
```
Please allow your browser to access your LOCATION for the map to load properly!
```
</p>
<br>

## Features

* An **interactive map** which lets you locate nearby available food resources. This map can be panned across to view different locations around the map. If an item is available at a particular location, a :pushpin: will appear on the map to show its availability. The [map]([https://kitchen2kitchen.herokuapp.com/#/main](https://kitchen2kitchen.herokuapp.com/#/main)) is displayed to the user when they login to the website with their credentials.

* A **search** functionality allowing the user to **filter** through a list of categories and look for **products** according to their needs. A variety of filters have been incorporated right now and more can be added accordingly.

* The website also features an interactive **login** and **sign-up** function which allows the user to create an account using their own credentials. This allows the user to keep a track of their posted products as well as the status about the same. The application does provide basic **session** functionality to keep tracking the user information, if user refresh the front page, the information would retain the same. The user can also toggle the status for a product (whether the product has been sold off or depleted).

<br>

## Predefined Users for Testing




|                |Account 1                          |Account 2                         |
|----------------|-------------------------------|-----------------------------|
|`Username`|User_one    |User_two            |
|`Password`         |password            |password            |
|`Products uploaded (product 1)     `    |Bag of 100 apples|Sweet potato|
|`Delivery Status (for product 1) `        |not delivered|not delivered|
|`Rating (for product 1) `        |-|-|
|`Products uploaded (product 2)    `  |Sourdough|Beef mince|
|`Delivery Status (for product 2)`         |reserved - not delivered|delivered|
|`Rating (for product 2)`         |-|4/5|
|`Orders         `|Beef mince|Sourdough|
|`Delivery Status (for the order above)`         |delivered|reserved not delivered|
|`Rating (for the order above)`         |4/5|-|


<br>


## Details about each feature
### Login/Sign-up (user-related features)
#### Routes
* Creating a new user
```
router.post('/users', controller.createUser);
```
* Finding all the users
```
router.get('/users', controller.findAllUsers);
```
* Find a particular user by id
```
router.get('/users/id/:id', controller.findOneUser);
```
* Find a particular user by name
```
router.get('/users/name/:name', controller.findUserByName);
```
* Update a user's data by name
```
router.put('/users/name/:name', controller.updateUserByName);
```
* Update a user's data by id
```
router.put('/users/id/:id', controller.updateUserById);
```
* Delete a user by id
```
router.delete('/users/id/:id', controller.deleteUserById);
```
<br>

#### Controllers
* Creating a new user
```
createUser
```
* Finding all the users
```
findAllUsers
```
* Find a particular user by id
```
findOneUser
```
* Find a particular user by name
```
findUserByName
```
* Update a user's data by name
```
updateUserByName
```
* Update a user's data by id
```
updateUserById
```
* Delete a user by id
```
deleteUserById
```
<br>

#### Models
#### user.js
```
var userSchema = mongoose.Schema(
	{
		"name": { type: String, required: true },
		"firstName": { type: String, required: true },
		"lastName": { type: String, required: true },
		"email": { type: String, required: true },
		"password": { type: String, required: true },
		"phoneNumber": { type: String, required: true },
		"userRating":Number,
		"streetAddress": { type: String, required: true }
	}
);
var users = mongoose.model('users', userSchema);
```
<br>

#### Views
#### User login
```
submit () {
	var userPasswd
	var url = process.env.ROOT_API + 'users/name/' + this.User.name
	var p = this.User.password
	console.log(url)
	function getNameList () {
		return axios.get(url).then(response => {
			userPasswd = response.data.password
		})
	}
	getNameList().then(data => {
		console.log(userPasswd)
		if (userPasswd === p) {
			console.log(data)
			router.push({ name: 'main' })
		}
	})
}
```
#### User sign-up
```
submit () {
	console.log(this.User)
	var url = process.env.ROOT_API + 'users'
	axios.post(url, { User: this.User }).then(response => {
		router.push({ name: 'login' })
	}).catch(error => {
		alert('Please enter the right information')
		console.log('Add new user failed: ' + error)
	})
}
```
<br>
<br>

### Search and Filtering of Products
#### Routes
* Creating a new product
```
router.post('/products', controller.createProduct);
```
* Find all the products
```
router.get('/products', controller.findAllProducts);
```
* Find one product by id
```
router.get('/products/id/:id', controller.findOneProduct);
```
* Find one product by name
```
router.get('/products/name/:name',controller.findProductByName);
```
* Updating a product's data by name
```
router.put('/products/name/:name',controller.updateProductByName);
```
* Updating a product's data by id
```
router.put('/products/id/:id', controller.updateProductById);
```
* Deleting a product by id
```
router.delete('/products/id/:id',controller.deleteProductById);
```
* Finding a product from it's category
```
router.get('/products/category/:category',controller.findProductByCategory);
```
<br>

#### Controllers
* Creating a new product
```
createProduct
```
* Finding all the current products
```
findAllProducts
```
* Finding a product by id
```
findOneProduct
```
* Finding a product by its name
```
findProductByName
```
* Updating a product by its name
```
updateProductByName
```
* Updating a product by its id
```
updateProductById
```
* Finding a product by category
```
findProductByCategory
```
<br>

#### Models
#### product.js
```
const productSchema = new mongoose.Schema(
{
	"userId": String,
	"createdAt": String,
	"name": { type: String, required: true },
	"description":String,
	"expirationDate": { type: String, required: true },
	"address": { type: String, required: true },
	"marker": {
		"lat": Number,
		"lng": Number
	},
	"category": { type: String, required: true },
	"condition": { type: Number, required: true },
	"rating": Number,
	"delivered": Boolean
	}
);
var products = mongoose.model('products', productSchema);
```
<br>

#### Views
* Searching for a product via the filters
```
submit () {
	var url = process.env.ROOT_API + 'products'
	console.log(url)
	axios.post(url, { Product: this.Product })
	.catch(error => {
		alert('Please fill all the information')
		console.log('Add product failed: ' + error)
	})
}
```

* Showing all the products on the map (by default)
``` 
showProducts () {
	this.clearMarkers()
	var url = process.env.ROOT_API + 'products/'
	function getProductFromName () {
		return axios.get(url).then(response => {
			return response.data
		})
	}
	getProductFromName().then(data => {
		for (let i = 0; i < data.length; i++) {
			this.copyProductToMarkerList(data[i])
		}
	})
}
```

* Searching a product by its name
```
function getProductFromName () {
	return axios.get(url).then(response => {
		return response.data
	})
}
getProductFromName().then(data => {
	console.log(data.length)
	for (let i = 0; i < data.length; i++) {
		if ((data[i].category === category || category === '') && data[i].condition >= condition) {
			this.copyProductToMarkerList(data[i])
			}
		}
	})
}
```

* Seeing all the delivered products (in user's profile)
```
submit () {
	var url = process.env.ROOT_API + 'products/'
	axios.post(url, { Product: this.Product })
	document.querySelector('.addProduct-modal').style.display = 'none'
}
```
* Fetching products for the user's profile
```
getProducts () {
	var url = process.env.ROOT_API + 'products/'
	axios.get(url).then(response => (this.tableData = response.data))
	console.log(this.tableData)
}
```
<br>
<br>

### Order-related features
#### Routes
* Creating a new order
```
router.post('/orders', controller.createOrder);
```
* Find all the orders
```
router.get('/orders', controller.findAllOrders);
```
* Find one order by its id
```
router.get('/orders/id/:id', controller.findOneOrder);
```
* Update data for a particular order by its id
```
router.put('/orders/id/:id', controller.updateOrderById);
```
* Delete an order by its id
```
router.delete('/orders/id/:id', controller.deleteOrderById);
```
<br>

#### Controllers
* Creating a new order
 ```
createOrder
 ```
 * Finding all the products
 ```
 findAllOrders
 ```
 * Finding a particular order by its id
 ```
 findOneOrder
 ```
 * Updating an order by its id
 ```
 updateOrderById
 ```
 * Deleting an order by its id
 ```
 deleteOrderById
 ```
 <br>

#### Models
#### order.js
```
const orderSchema = new mongoose.Schema(
	{
		"orderId":String,
		"supplierId":String,
		"recieverId":String,
		"createdAt":String,
		"supRating":String,
		"recRating":String,
		"productId":String,
	}
);
var products = mongoose.model('orders', orderSchema);
```

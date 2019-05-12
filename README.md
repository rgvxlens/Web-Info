# Kitchen2Kitchen
## :carrot: No one knows food like we do! :apple:
<br>
<p align="center">
  <img width="67" height="67" src="https://raw.githubusercontent.com/rgvx/icons/master/restaurant%20%283%29.png">
</p>
<p align="center">Deliverable 4: Frontend + Backend delivery

* [Kitchen2Kitchen on Heroku](https://kitchen2kitchen.herokuapp.com/#/main)
* [Kitchen2Kitchen on Github](https://github.com/masonhsieh/Web-Info/tree/master/Project)
```
Please allow your browser to access your LOCATION for the map to load properly!
```
</p>

## Features

* An **interactive map** which lets you locate nearby available food resources. This map can be panned across to view different locations around the map. If an item is available at a particular location, a :pushpin: will appear on the map to show its availability. The [map]([https://kitchen2kitchen.herokuapp.com/#/main](https://kitchen2kitchen.herokuapp.com/#/main)) is displayed to the user when they login to the website with their credentials.

* A **search** functionality allowing the user to **filter** through a list of categories and look for **products** according to their needs. A variety of filters have been incorporated right now and more can be added accordingly.

* The website also features an interactive **login** and **sign-up** function which allows the user to create an account using their own credentials. This allows the user to keep a track of their posted products as well as the status about the same. The user can also toggle the status for a product (whether the product has been sold off or depleted).

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
* User login
```
return axios.get(url).then(response => {
	userPasswd = response.data.password
```
* User sign-up
```
axios.post(url, { User: this.User }).then(response => {
	router.push({ name: 'login' })
```

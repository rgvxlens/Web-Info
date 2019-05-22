var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "firstName": { type: String, required: true },
        "lastName": { type: String, required: true },
        "email": { type: String, required: true },
        "password": { type: String, required: true },
        "phoneNumber": { type: String, required: true }, 
        "userRating": Number,
        "numOrders": Number,
        "Scores": Number,
        "streetAddress": { type: String, required: true } 
    }
);

var users = mongoose.model('users', userSchema);

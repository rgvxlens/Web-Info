var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        "name":String,
        "email":String,
        "card":String
    }
);

var users = mongoose.model('users', userSchema);

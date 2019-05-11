var mongoose = require('mongoose');

// how to write geojson: https://mongoosejs.com/docs/geojson.html
// I used pointSchema here
const productSchema = new mongoose.Schema(
    {
        "userId": String,
        "createdAt": String,
        "name":  { type: String, required: true },     
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

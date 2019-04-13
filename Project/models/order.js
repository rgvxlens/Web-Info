var mongoose = require('mongoose');

// how to write geojson: https://mongoosejs.com/docs/geojson.html
// I used pointSchema here
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

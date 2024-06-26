const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerPhone: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    ownerPassword: {
        type: String,
        required: true
    },
    isapproved: {
        type: Boolean,
        default: false
    },
    plugs: {
        type: String,
        required: true
    },
    image:{
        default:"https://media.licdn.com/dms/image/D4D12AQH51-0R0IbyUw/article-cover_image-shrink_600_2000/0/1691261498185?e=2147483647&v=beta&t=lnS2UnbsZ6Ag04Zg9R7bXOE9NH92mGGbTYCdmjikG6M",

        type: String,
        required: true
    },

}
    , { timestamps: true });

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;

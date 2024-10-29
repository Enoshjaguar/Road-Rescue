const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    vehicle:{
        type:String,
        required:true
    }
})
const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking
// module.exports = mongoose.model("bookingdata",bookingSchema)
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    reviewText :{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("review",reviewSchema)
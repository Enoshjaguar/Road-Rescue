const mongoose = require('mongoose')

const SparepartSchema = new mongoose.Schema({
    sparepartname:{type:String,required:true},
    sparepartprice:{type:Number,required:true},
    sparepartdescription:{type:String,required:true},
    sparepartimage:{type:String,required:true}
});

const SparePart = mongoose.model('sparepart',SparepartSchema);
module.exports = SparePart